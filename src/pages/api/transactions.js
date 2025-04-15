import express from 'express';
import db from '../../db.js'; // Import the database connection

const router = express.Router();

// POST /budgetbuddy/api/transactions - Add a new transaction
router.post('/', async (req, res) => {
  const { amount, description, date, User_id } = req.body;

  if (!amount || !description || !date || !User_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO Transactions (amount, description, date, User_id)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const result = await db.run(query, [amount, description, date, User_id]);
    res.status(201).json({ message: 'Transaction added successfully', id: result.lastID });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to add transaction. Please try again.' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, description, date } = req.body;

  const query = `
    UPDATE Transactions SET amount = ?, description = ?, date = ?
    WHERE Transaction_id = ?
  `;

  try {
    await db.run(query, [amount, description, date, id]);
    res.status(200).json({ message: 'Transaction updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Transactions WHERE Transaction_id = ?';

  try {
    await db.run(query, [id]);
    res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction.' });
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
