CREATE TABLE IF NOT EXISTS Users (
        User_id INTEGER PRIMARY KEY AUTOINCREMENT,
        User_FirstName TEXT NOT NULL,
        User_LastName TEXT NOT NULL,
        User_Email TEXT NOT NULL UNIQUE,
        User_Username TEXT NOT NULL UNIQUE,
        User_password TEXT NOT NULL
    );

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
        date TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES Users(User_id)
    );
ALTER TABLE Transactions RENAME TO Transactions_old;

CREATE TABLE Transactions (
    Transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    User_id INTEGER NOT NULL,
        FOREIGN KEY (User_id) REFERENCES Users(User_id)
    );
    

DROP TABLE Transactions_old;
    UPDATE Users SET User_Email = 'Test@gmail.com' WHERE User_id = 1;
    UPDATE Users SET User_Username = 'T3st' WHERE User_id = 1;

    DELETE FROM Users WHERE User_id = 1;

    ALTER TABLE Users RENAME TO Users_old;

    CREATE TABLE Users (
    User_id INTEGER PRIMARY KEY AUTOINCREMENT,
     User_FirstName TEXT NOT NULL,
     User_LastName TEXT NOT NULL,
    User_Email TEXT NOT NULL UNIQUE,
     User_password TEXT NOT NULL
);
DROP TABLE Users_old;
INSERT INTO Users (User_FirstName, User_LastName, User_Email, User_password)
    VALUES
        ("Test", "Test", "Test@gmail.com", "Test");
    
INSERT INTO Expenses (Expense_Amount, Expense_Description, Expense_Date, User_id)
VALUES (100, 'Test Description', '2025-04-13', 1);

SELECT * FROM Expenses;