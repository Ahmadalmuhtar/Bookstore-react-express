import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';
import multer from 'multer';
import path from 'path';

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
  price: { type: DataTypes.INTEGER }
}, { timestamps: true });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database and table synced');
  })
  .catch((err) => {
    console.error('Error syncing Database', err);
  });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// Routes

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/books/create', upload.single('cover'), async (req, res) => {
  const { title, desc, price } = req.body;
  const cover = req.file ? req.file.path : null; // Check if a file is uploaded

  try {
    const newBook = await Book.create({ title, desc, cover, price });
    res.json(newBook);
  } catch (error) {
    console.error('Error creating a new Book', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/books/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const bookToDelete = await Book.findByPk(id);
    if (!bookToDelete) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await bookToDelete.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/books/:id', upload.single('cover'), async (req, res) => {
  const id = req.params.id;
  const { title, desc, price } = req.body;
  const cover = req.file ? req.file.path : null;

  try {
    const bookToBeUpdated = await Book.findByPk(id);

    if (!bookToBeUpdated) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookToBeUpdated.update({
      title: title || bookToBeUpdated.title,
      desc: desc || bookToBeUpdated.desc,
      cover: cover || bookToBeUpdated.cover,
      price: price || bookToBeUpdated.price,
    });

    res.status(200).json({ message: 'Book was updated successfully' });
  } catch (error) {
    console.error('Error updating this book', error);
    res.status(500).json({ error: 'Internal server Error' });
  }
});

app.listen(8080, () => {
  console.log('Connected to the backend on port 8080');
});