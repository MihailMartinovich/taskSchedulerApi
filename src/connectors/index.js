import {MONGO_URI} from "../config";
import mongooseConnector from './mongoose-connector';

function initializeConnectors() {
  mongooseConnector(MONGO_URI);
}

export {
  initializeConnectors
}

export default initializeConnectors;