import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { MainRouterV1 } from './router';
import {
	generalErrorHandler,
	authErrorHandler,
} from './middleware/errorHandling';

const app: Application = express();

// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// gzip compression
app.use(compression());
// enable cors
app.use(cors({ credentials: true }));
app.options('*', cors());
app.use(morgan('dev'));

app.use('/api', MainRouterV1);

app.use(authErrorHandler, generalErrorHandler);
export default app;
