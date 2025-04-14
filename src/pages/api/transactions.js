import express from 'express';
import db from '../../db.js'; // Import the database connection

const router = express.Router();

// POST /budgetbuddy/api/transactions - Add a new transaction
router.post('/', async (req, res) => {
  const { amount, description, date, userId } = req.body;

  // Validate the request body
  if (!amount || !description || !date || !userId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO Transactions (amount, description, date, userId)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const result = await db.run(query, [amount, description, date, userId]);
    res.status(201).json({ message: 'Transaction added successfully', id: result.lastID });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to add transaction. Please try again.' });
  }
});

// GET /budgetbuddy/api/transactions - Retrieve all transactions
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM Transactions';

  try {
    const transactions = await new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve transactions. Please try again.' });
  }
});

export default router;
