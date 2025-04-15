import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { User_FirstName, User_LastName, User_Email, User_password } = req.body;

  if (!User_FirstName || !User_LastName || !User_Email || !User_password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await db.get('SELECT * FROM Users WHERE User_Email = ?', [User_Email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(User_password, 10);

    const result = await db.run(
      'INSERT INTO Users (User_FirstName, User_LastName, User_Email, User_password) VALUES (?, ?, ?, ?)',
      [User_FirstName, User_LastName, User_Email, hashedPassword]
    );

    res.status(201).json({ message: 'Sign up successful!', userId: result.lastID });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { User_Email, User_password } = req.body;
  if (!User_Email || !User_password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  db.get('SELECT * FROM Users WHERE User_Email = ?', [User_Email], async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const match = await bcrypt.compare(User_password, user.User_password);
    if (match) {
      // Successful login
      return res.status(200).json({ message: 'Sign in successful!', userId: user.User_id });
    } else {
      // Invalid password
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
  });
});

export default router;
