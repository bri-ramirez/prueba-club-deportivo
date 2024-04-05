import express from 'express';
import cors from 'cors';
import router from './router.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);



app.listen(PORT, () => {
  console.log('servidor en puerto :', PORT);
});