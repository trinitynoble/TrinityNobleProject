import express from 'express';
import db from '../../db.js'; // Adjust the path if needed
import bcrypt from 'bcrypt'; // Import bcrypt

const router = express.Router();

const saltRounds = 10; // Define the number of salt rounds

// POST /budgetbuddy/api/users - Register a new user
router.post('/', async (req, res) => {
  const { User_FirstName, User_LastName, User_Email, User_password } = req.body;

  if (!User_FirstName || !User_LastName || !User_Email || !User_password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(User_password, saltRounds);

    const query = `
      INSERT INTO Users (user_firstName, user_lastName, user_email, user_password)
      VALUES (?, ?, ?, ?)
    `;

    const result = await db.run(query, [User_FirstName, User_LastName, User_Email, hashedPassword]);
    res.status(201).json({ message: 'Signed up successfully!', id: result.lastID });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Failed to sign up. Please try again.' });
  }
});
router.post('/login', async (req, res) => {
    const { User_Email, User_password } = req.body;
  
    if (!User_Email || !User_password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
  
    const query = `SELECT * FROM Users WHERE User_Email = ?`;
  
    try {
      const user = await new Promise((resolve, reject) => {
        db.get(query, [User_Email], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (!user) {
        return res.status(401).json({ error: 'User not found.' });
      }
  
      if (user.User_password !== User_password) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }
  
      res.status(200).json({ message: 'Login successful!', userId: user.User_id });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ error: 'Server error during login.' });
    }
  });

export default router;
