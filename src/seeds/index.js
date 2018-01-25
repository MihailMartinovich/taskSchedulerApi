import { MONGO_URI } from "../config";
import mongooseConnector from '../connectors/mongoose-connector';
import initUserSeeds from './user-seeds';

initSeeds();

async function initSeeds() {
  const mongoConnection = await mongooseConnector(MONGO_URI);

  await mongoConnection.connection.db.dropDatabase();

  let users = await initUserSeeds();

  console.log(users);
  mongoConnection.connection.close();
}