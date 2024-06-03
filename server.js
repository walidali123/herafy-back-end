import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// built-in mw
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
