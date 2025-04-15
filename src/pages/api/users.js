import express from 'express';
import db from '../../db.js'; // Adjust the path if needed

const router = express.Router();

// POST /budgetbuddy/api/users - Register a new user
router.post('/', async (req, res) => {
  const { User_FirstName, User_LastName, User_Email, User_password } = req.body;

  if (!User_FirstName || !User_LastName || !User_Email || !User_password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO Users (user_firstName, user_lastName, user_email, user_password)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const result = await db.run(query, [User_FirstName, User_LastName, User_Email, User_password]);
    res.status(201).json({ message: 'Signed up successfully!', id: result.lastID });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to sign up. Please try again.' });
  }
});

export default router;
