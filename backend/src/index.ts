import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import { pool, createDatabase } from './config/database';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

async function initializeDatabase() {
    try {
        await createDatabase();

        const schemaPath = path.join(__dirname, 'database', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        const statements = schema
            .split(';')
            .filter(statement => statement.trim());

        for (const statement of statements) {
            if (statement.trim()) {
                try {
                    await pool.query(statement);
                } catch (err: any) {
                    // Ignore "table exists" errors
                    if (err.code !== 'ER_TABLE_EXISTS_ERROR') {
                        throw err;
                    }
                }
            }
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
}

// Initialize database before starting server
initializeDatabase().then(() => {
    app.use(cors());
    app.use(express.json());
    app.use('/api/users', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Server initialization failed:', error);
    process.exit(1);
});