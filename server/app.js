
import express from "express";
import cors from "cors";
import 'dotenv/config';
import helmet from 'helmet';
import mongoose from "./config/db.js";
import videoRoute from './Routes/videoRoute.js'
import dotenv from 'dotenv';

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:'https://famous-clafoutis-71414f.netlify.app'
}));


// app.use(cors({
//   origin:'gentle-cendol-ffa460.netlify.app'
// }));

app.use(express.json());
app.use(helmet());

mongoose.connection.on('open', () => {
  console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Database Connection Failed', err);
});



app.use('/api', videoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
