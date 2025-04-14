import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import transactionsRouter from './src/pages/api/transactions.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve frontend from Vite's dist folder
const frontendPath = path.join(__dirname, './dist');
app.use(express.static(frontendPath));

// API route
app.use('/api/transactions', transactionsRouter);

// Handle API route not found
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/') && req.originalUrl !== '/api/transactions') {
        res.status(404).json({ error: 'API route not found' });
    } else {
        next();
    }
});

// Catch-all route to serve the frontend
app.get('', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
