"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = new pg_1.default.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (title === null) {
            throw new Error("The book not exists");
        }
        const query = 'INSERT INTO books (title) VALUES ($1) RETURNING *';
        const values = [title];
        const result = yield pool.query(query, values);
        const bookInserted = result.rows[0];
        res.json(bookInserted);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM books';
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error getting book' });
    }
}));
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
