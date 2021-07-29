import "express-async-errors"
import express from 'express';
import routes from './routes';
import 'reflect-metadata'
import './database'
import { ErrorsMiddleware } from "../src/middlewares/ensureErrorsMiddleware";

const cors = require('cors')

const app = express();
app.use(cors());
routes(app);
app.use(ErrorsMiddleware);


app.listen(3333, () => console.log(`Server is running`));