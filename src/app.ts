import express from 'express';
const cors = require("cors");

import { determineTransaction } from './utils'
import inputData from './data/input-data.json';

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(
  cors({
    origin: '*'
  })
);

app.get('/', (req, res) => {
  return res.send('Hi Joh!');
});

// For Web Client Request
app.post('/write', async (req, res) => {
  return res.json(determineTransaction(req.body));
});

// For Testing Backend Request
app.get('/test-write', async (req, res) => {
  const testWrite = determineTransaction(inputData, true)
  console.log(testWrite)
  return res.send(testWrite);
});


app.listen(3000, () => {
  console.log('Application running PORT 3000');
});