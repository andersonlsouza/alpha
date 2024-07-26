import express, { Request, Response } from 'express';
import pg from 'pg';

const app = express();
app.use(express.json());

interface Book {
    title: string;
}

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

app.post('/books', async (req: Request, res: Response): Promise<void> => {
    try {
        const { title }: Book = req.body;

        if (title === null) {
            throw new Error("The book not exists");
        }

        const query = 'INSERT INTO books (title) VALUES ($1) RETURNING *';
        const values = [title];
        const result = await pool.query(query, values);
        
        const bookInserted: Book = result.rows[0];
        res.json(bookInserted);
    } catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
});

app.get('/books', async (req: Request, res: Response): Promise<void> => {
    try {
        const query = 'SELECT * FROM books';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error getting book' });
    }
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});