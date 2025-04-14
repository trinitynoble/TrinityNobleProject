/* eslint-env jest */
import request from 'supertest';
import express from 'express';
import transactionsRouter from './transactions.js';
import db from '../../db.js';

jest.mock('../../db.js');

const app = express();
app.use(express.json());
app.use('/api/transactions', transactionsRouter);

describe('Transactions API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/transactions', () => {
    it('should add a new transaction and return 201 status', async () => {
      db.run.mockResolvedValue({ lastID: 1 });

      const payload = {
        amount: 123.45,
        description: 'Test Transaction',
        date: '2025-04-13',
        userId: 1,
      };

      const response = await request(app)
        .post('/api/transactions')
        .send(payload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Transaction added successfully',
        id: 1,
      });

      expect(db.run).toHaveBeenCalledWith(
        'INSERT INTO Transactions (amount, description, date, userId) VALUES (?, ?, ?, ?)',
        [123.45, 'Test Transaction', '2025-04-13', 1]
      );
    });

    it('should return 400 if required fields are missing', async () => {
      const payload = {
        amount: 123.45,
        description: 'Test Transaction',
      };

      const response = await request(app)
        .post('/api/transactions')
        .send(payload)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'All fields are required.' });
    });
  });

  describe('GET /api/transactions', () => {
    it('should retrieve all transactions and return 200 status', async () => {
      db.all.mockImplementation((query, params, callback) => {
        callback(null, [
          { Transaction_id: 1, amount: 123.45, description: 'Test Transaction', date: '2025-04-13', userId: 1 },
        ]);
      });

      const response = await request(app).get('/api/transactions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { Transaction_id: 1, amount: 123.45, description: 'Test Transaction', date: '2025-04-13', userId: 1 },
      ]);

      expect(db.all).toHaveBeenCalledWith('SELECT * FROM Transactions', [], expect.any(Function));
    });

    it('should return 500 if there is a database error', async () => {
      db.all.mockImplementation((query, params, callback) => {
        callback(new Error('Database error'), null);
      });

      const response = await request(app).get('/api/transactions');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to retrieve transactions. Please try again.' });
    });
  });
});
