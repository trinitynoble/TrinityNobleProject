-- Drop the existing table
DROP TABLE IF EXISTS Users;

-- Create the new table with the updated password length
CREATE TABLE IF NOT EXISTS Users (
    User_id INTEGER PRIMARY KEY AUTOINCREMENT,
    User_FirstName TEXT NOT NULL,
    User_LastName TEXT NOT NULL,
    User_Email TEXT NOT NULL UNIQUE,
    User_password TEXT NOT NULL
);

-- Create the other tables
CREATE TABLE IF NOT EXISTS Expenses (
    Expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Expense_Amount REAL NOT NULL,
    Expense_Description TEXT NOT NULL,
    Expense_Date TEXT NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE IF NOT EXISTS Income (
    Income_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Income_Amount REAL NOT NULL,
    Income_Description TEXT NOT NULL,
    Income_Date TEXT NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE IF NOT EXISTS Budget (
    Budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Budget_Amount REAL NOT NULL,
    Budget_Description TEXT NOT NULL,
    Budget_Date TEXT NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE IF NOT EXISTS Goals (
    Goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Goal_Amount REAL NOT NULL,
    Goal_Description TEXT NOT NULL,
    Goal_Date TEXT NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE IF NOT EXISTS Savings (
    Saving_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Saving_Amount REAL NOT NULL,
    Saving_Description TEXT NOT NULL,
    Saving_Date TEXT NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

CREATE TABLE IF NOT EXISTS Transactions (
    Transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    User_id INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

INSERT INTO Users (User_FirstName, User_LastName, User_Email, User_password)
    VALUES
        ("Test", "Test", "Test@gmail.com", "Test");
    
INSERT INTO Expenses (Expense_Amount, Expense_Description, Expense_Date, User_id)
VALUES (100, 'Test Description', '2025-04-13', 1);

INSERT INTO Users (User_FirstName, User_LastName, User_Email, User_password)
VALUES ('Testing', 'Testing', 'testing@gmail.com', 'test');
SELECT * FROM Expenses;