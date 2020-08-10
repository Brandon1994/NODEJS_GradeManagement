import express from 'express';
import { promises as fs } from 'fs';
import grades from './routes/grades.js'

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use('/grades', grades);

app.listen(3000, async () => {
  try {
    await readFile('grades.json');
    console.log('Api Started');
  } catch (err) {
    console.log('Erro ao ler o arquivo');
  }
});
