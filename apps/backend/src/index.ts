import 'dotenv/config';
import { createServer } from './app';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = createServer();
server.listen(port, () => {
  console.log(`AuraHealth backend running on http://localhost:${port}`);
});
