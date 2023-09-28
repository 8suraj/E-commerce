import http from 'http';
import { APP_PORT } from './utils/secrets';
import app from './app';
import logger from './utils/logger';

const server = http.createServer(app);

server.listen(APP_PORT, () => {
	console.log(
		` Server running on http://localhost:${APP_PORT}`
	);
	logger.info(`server running on port : ${APP_PORT}`);
});
