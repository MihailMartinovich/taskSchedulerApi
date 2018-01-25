import faker from 'faker';
import _ from 'lodash';
import {User} from '../modules/User';

const PASSWORD = '1111';

function initUserSeeds() {
  const promises = [];

  _.times(10, (i) =>{
    const userPromise = User.create({
      email:`${faker.lorem.word(2,10)}.${faker.lorem.word(2,5)}.com`,
      userName: `${faker.lorem.word(2,10)}` + i,
      password: PASSWORD
    });

    promises.push(userPromise);
  });

  return Promise.all(promises);
}

export default initUserSeeds;