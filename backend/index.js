import express from 'express'
import cors from 'cors'
import { Sequelize, DataTypes } from 'sequelize';


const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('crud_II', 'postgres', 'ASKsome123!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.STRING, allowNull: false },
  cover: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database and table synced');
  })
  .catch((err) => {
    console.error('Error syncing Database', err);
  });

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/books/create', async (req, res) => {
  const { title, desc, cover } = req.body;
  try {
    const newBook = await Book.create({ title, desc, cover })
    res.json(newBook)
  } catch (error) {
    console.error('Error creating a new Book', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(8080, () => {
  console.log('Connected to the backend on port 8080');
});
