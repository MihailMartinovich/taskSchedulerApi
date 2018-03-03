import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default (mongoUri) => {
  if(!mongoUri) {
    throw Error('Mongo Uri isn\'t defined');
  }

  return new Promise((res, rej) => {
    mongoose.connect(mongoUri)
      .then((mongodb) => {
        res(mongodb);
        console.log(`Mongo connected to ${mongoUri}`);
      })
      .catch((error) => {
        rej(error);
      });
  })
}