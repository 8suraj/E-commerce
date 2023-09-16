import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(morgan('dev')); //set it

if (process.env.NODE_ENV === 'prod') {
	app.use(
		express.static(
			path.join(__dirname, '..', '..', 'frontend', 'dist')
		)
	);
} else {
	app.get('/', (req, res) => {
		res.json({ status: 'API is running ' });
	});
}
app.get('*', (req, res) =>
	res.status(404).json({ errors: { body: ['Not found'] } })
);

export default app;
