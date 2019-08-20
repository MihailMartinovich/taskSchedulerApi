import { MONGO_URI } from '../config';
import mongooseConnector from '../connectors/mongooseConnector';
import initUserSeeds from './userSeeds';

initSeeds();

async function initSeeds() {
  try {
    const mongoConnection = await mongooseConnector(MONGO_URI);

    await mongoConnection.connection.db.dropDatabase();

    let users = await initUserSeeds();

    console.log(users);
    await mongoConnection.connection.close();
  } catch (e) {
    console.log(e);
  }
}