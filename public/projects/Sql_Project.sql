/* =====================================================
   TASK 1: DATA CLEANING & PREPARATION
   ===================================================== */

CREATE DATABASE SQL_UPS;
USE SQL_UPS;
SHOW  TABLES;

-- 1. Orders Table
CREATE TABLE Orders (
    Order_ID VARCHAR(7) PRIMARY KEY,
    Customer_ID VARCHAR(50),
    Order_Date DATE,
    Route_ID VARCHAR(50),
    Warehouse_ID VARCHAR(50),
    Expected_Delivery_Date DATE,
    Actual_Delivery_Date DATE,
    Delivery_Status VARCHAR(50)
);
-- 2. Routes Table
CREATE TABLE Routes (
    Route_ID VARCHAR(50) PRIMARY KEY,
    Start_Location VARCHAR(100),
    End_Location VARCHAR(100),
    Distance_KM DECIMAL(8,2),
    Average_Travel_Time_Min INT,
    Traffic_Delay_Min INT
);
-- 3. Warehouses Table
CREATE TABLE Warehouses (
    Warehouse_ID VARCHAR(50) PRIMARY KEY,
    Location VARCHAR(50),
    Processing_Time_Min INT,
    Dispatch_Time TIME
);
-- 4. Delivery Agents Table
CREATE TABLE Delivery_Agents (
    Agent_ID VARCHAR(50) PRIMARY KEY,
    Route_ID VARCHAR(50),
    Shift_Hours INT,
    Avg_Speed_KM_HR INT,
    On_Time_Percentage DECIMAL(5,2)
);
-- 5. Shipment Tracking Table
CREATE TABLE Shipment_Tracking (
    Shipment_ID VARCHAR(50) PRIMARY KEY,
    Order_ID VARCHAR(7),
    Checkpoint VARCHAR(50),
    Checkpoint_Time DATETIME,
    Delay_Reason VARCHAR(100)
);

/*  INSERTING DATA DONE THROUGH BULK IN IMPORT DATA WIZARD 
ALTER SCRIPT 
*/

-- Orders → Routes
ALTER TABLE Orders
ADD CONSTRAINT fk_orders_routes
FOREIGN KEY (Route_ID) REFERENCES Routes(Route_ID);

-- Orders → Warehouses
ALTER TABLE Orders
ADD CONSTRAINT fk_orders_warehouse
FOREIGN KEY (Warehouse_ID) REFERENCES Warehouses(Warehouse_ID);

-- Delivery Agents → Routes
ALTER TABLE Delivery_Agents
ADD CONSTRAINT fk_agents_routes
FOREIGN KEY (Route_ID) REFERENCES Routes(Route_ID);

-- Shipment Tracking → Orders
ALTER TABLE Shipment_Tracking
ADD CONSTRAINT fk_tracking_orders
FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID);


-- 1.1 Identify and delete duplicate Order_ID records.

SELECT Order_ID, COUNT(*) AS cnt
FROM Orders
GROUP BY Order_ID
HAVING COUNT(*) > 1;
-- NOTE:
-- Order_ID is defined as PRIMARY KEY in this schema,
-- therefore duplicate records are structurally prevented.
-- No deletion is required.

-- 1.2  Replace null Traffic_Delay_Min with the average delay for that route
-- SET SQL_SAFE_UPDATES = 0;
UPDATE Routes r
JOIN (
    SELECT Route_ID, AVG(Traffic_Delay_Min) AS avg_delay
    FROM Routes
    WHERE Traffic_Delay_Min IS NOT NULL
    GROUP BY Route_ID
) t
ON r.Route_ID = t.Route_ID
SET r.Traffic_Delay_Min = t.avg_delay
WHERE r.Traffic_Delay_Min IS NULL;
-- SET SQL_SAFE_UPDATES = 1;

SELECT Route_ID, Traffic_Delay_Min
FROM Routes
WHERE Traffic_Delay_Min IS NULL;

-- 1.3  Convert all date columns into YYYY-MM-DD format using SQL functions.
-- All date columns are stored as DATE/DATETIME types.
-- The following query validates the format.
SELECT 
    Order_ID,
    DATE_FORMAT(Order_Date, '%Y-%m-%d') AS Order_Date,
    DATE_FORMAT(Expected_Delivery_Date, '%Y-%m-%d') AS Expected_Delivery_Date,
    DATE_FORMAT(Actual_Delivery_Date, '%Y-%m-%d') AS Actual_Delivery_Date
FROM Orders;


-- 1.4 Ensure that no Actual_Delivery_Date is before Order_Date (flag suchrecords).
SELECT 
    Order_ID,
    Order_Date,
    Actual_Delivery_Date,
    DATEDIFF(Actual_Delivery_Date, Order_Date) AS Day_Difference
FROM Orders
WHERE Actual_Delivery_Date < Order_Date;




/* =====================================================
   TASK 2: DELIVERY DELAY ANALYSIS
   ===================================================== */

-- 2.1 Calculate delivery delay in days for each order
SELECT 
    Order_ID,
    DATEDIFF(Actual_Delivery_Date, Expected_Delivery_Date) AS Delay_Days
FROM Orders
-- WHERE DATEDIFF(Actual_Delivery_Date, Expected_Delivery_Date) != 0
;


-- 2.2 Top 10 delayed routes based on average delay
SELECT 
    Route_ID,
    AVG(DATEDIFF(Actual_Delivery_Date, Expected_Delivery_Date)) AS Avg_Delay_Days
FROM Orders
GROUP BY Route_ID
ORDER BY Avg_Delay_Days DESC
LIMIT 10;

-- 2.3 Rank orders by delay within each warehouse
SELECT 
    Order_ID,
    Warehouse_ID,
    DATEDIFF(Actual_Delivery_Date, Expected_Delivery_Date) AS Delay_Days,
    RANK() OVER (
        PARTITION BY Warehouse_ID
        ORDER BY DATEDIFF(Actual_Delivery_Date, Expected_Delivery_Date) DESC
    ) AS Delay_Rank
FROM Orders;


/* =====================================================
   TASK 3: ROUTE OPTIMIZATION INSIGHTS
   ===================================================== */

-- 3.1 Route-wise delivery and efficiency metrics
SELECT 
    r.Route_ID,
    AVG(DATEDIFF(o.Actual_Delivery_Date, o.Order_Date)) AS Avg_Delivery_Days,
    AVG(r.Traffic_Delay_Min) AS Avg_Traffic_Delay,
    r.Distance_KM / r.Average_Travel_Time_Min AS Efficiency_Ratio
FROM Routes r
JOIN Orders o ON r.Route_ID = o.Route_ID
GROUP BY r.Route_ID;

-- 3.2 Identify 3 routes with worst efficiency ratio
SELECT 
    Route_ID,
    Distance_KM / Average_Travel_Time_Min AS Efficiency_Ratio
FROM Routes
ORDER BY Efficiency_Ratio ASC
LIMIT 3;

-- 3.3 Routes with more than 20% delayed deliveries
SELECT 
    Route_ID,
    COUNT(CASE WHEN Actual_Delivery_Date > Expected_Delivery_Date THEN 1 END) 
        * 100.0 / COUNT(*) AS Delay_Percentage
FROM Orders
GROUP BY Route_ID
HAVING Delay_Percentage > 20;

/* 
--- 3.4 Recommend potential routes for optimization.----
Routes with high average delays, poor efficiency ratios, 
and more than 20% delayed deliveries were identified as optimization candidates. 
Recommendations include route redesign, traffic-aware scheduling, 
improved agent allocation, and dynamic delivery planning.
*/

/* =====================================================
   TASK 4: WAREHOUSE PERFORMANCE ANALYSIS
   ===================================================== */

-- 4.1 Top 3 warehouses with highest processing time
SELECT 
    Warehouse_ID,
    AVG(Processing_Time_Min) AS Avg_Processing_Time
FROM Warehouses
GROUP BY Warehouse_ID
ORDER BY Avg_Processing_Time DESC
LIMIT 3;

-- 4.2 Total vs delayed orders per warehouse
SELECT 
    Warehouse_ID,
    COUNT(*) AS Total_Orders,
    COUNT(CASE WHEN Actual_Delivery_Date > Expected_Delivery_Date THEN 1 END) 
        AS Delayed_Orders
FROM Orders
GROUP BY Warehouse_ID;

-- 4.3 CTEs to Find Bottleneck warehouses (processing time > global average)
WITH AvgProc AS (
    SELECT AVG(Processing_Time_Min) AS Global_Avg
    FROM Warehouses
)
SELECT 
    Warehouse_ID,
    Processing_Time_Min
FROM Warehouses, AvgProc
WHERE Processing_Time_Min > Global_Avg;

-- 4.4 Rank warehouses by on-time delivery percentage
SELECT 
    Warehouse_ID,
    COUNT(CASE WHEN Actual_Delivery_Date <= Expected_Delivery_Date THEN 1 END) 
        * 100.0 / COUNT(*) AS OnTime_Percentage
FROM Orders
GROUP BY Warehouse_ID
ORDER BY OnTime_Percentage DESC;


/* =====================================================
   TASK 5: DELIVERY AGENT PERFORMANCE
   ===================================================== */

-- 5.1 Rank agents per route by on-time percentage
SELECT 
    Agent_ID,
    Route_ID,
    On_Time_Percentage,
    RANK() OVER (
        PARTITION BY Route_ID
        ORDER BY On_Time_Percentage DESC
    ) AS Agent_Rank
FROM Delivery_Agents;

-- 5.2 Agents with on-time delivery below 80%
SELECT *
FROM Delivery_Agents
WHERE On_Time_Percentage < 80;

-- 5.3 Compare average speed of top 5 vs bottom 5 agents
SELECT AVG(Avg_Speed_KM_HR) AS Top5_Avg_Speed
FROM (
    SELECT Avg_Speed_KM_HR
    FROM Delivery_Agents
    ORDER BY On_Time_Percentage DESC
    LIMIT 5
) t;

SELECT AVG(Avg_Speed_KM_HR) AS Bottom5_Avg_Speed
FROM (
    SELECT Avg_Speed_KM_HR
    FROM Delivery_Agents
    ORDER BY On_Time_Percentage ASC
    LIMIT 5
) b;


/* =====================================================
   TASK 6: SHIPMENT TRACKING ANALYTICS
   ===================================================== */

-- 6.1 Last checkpoint time for each order
SELECT 
    Order_ID,
    MAX(Checkpoint_Time) AS Last_Checkpoint_Time
FROM Shipment_Tracking
GROUP BY Order_ID;

-- 6.2 Most common delay reasons
SELECT 
    Delay_Reason,
    COUNT(*) AS Frequency
FROM Shipment_Tracking
WHERE Delay_Reason IS NOT NULL
GROUP BY Delay_Reason
ORDER BY Frequency DESC;

-- 6.3 Orders with more than two delayed checkpoints
SELECT 
    Order_ID,
    COUNT(*) AS Delay_Count
FROM Shipment_Tracking
WHERE Delay_Reason IS NOT NULL
GROUP BY Order_ID
HAVING COUNT(*) > 2;


/* =====================================================
   TASK 7: ADVANCED KPI REPORTING
   ===================================================== */

-- 7.1 Average delivery delay per region
SELECT 
    r.Start_Location,
    AVG(DATEDIFF(o.Actual_Delivery_Date, o.Expected_Delivery_Date)) 
        AS Avg_Delay_Days
FROM Orders o
JOIN Routes r ON o.Route_ID = r.Route_ID
GROUP BY r.Start_Location;

-- 7.2 Overall on-time delivery percentage
SELECT 
    COUNT(CASE WHEN Actual_Delivery_Date <= Expected_Delivery_Date THEN 1 END) 
        * 100.0 / COUNT(*) AS OnTime_Delivery_Percentage
FROM Orders;

-- 7.3 Average traffic delay per route
SELECT 
    Route_ID,
    AVG(Traffic_Delay_Min) AS Avg_Traffic_Delay
FROM Routes
GROUP BY Route_ID;


