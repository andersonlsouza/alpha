import express, { Request, Response } from 'express';
import pg from 'pg';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

interface Book {
    title: string;
}

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'redis',
    password: '12345',
    port: 5432,
});

const redis = new Redis();

app.post('/books', async (req: Request, res: Response): Promise<void> => {
    try {
        const { title }: Book = req.body;

        if (!title) {
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
        const cachedBooks = await redis.get('books');

        if (cachedBooks) {
            const books: Book[] = JSON.parse(cachedBooks);
            res.json(books);            
        } else {
            const query = 'SELECT * FROM books';
            const result = await pool.query(query);
            const books: Book[] = result.rows;

            await redis.set('books', JSON.stringify(books), 'EX', 5);
            res.json(books);
        }

    } catch (error) {
        res.status(500).json({ error: 'Error getting book' });
    }
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});