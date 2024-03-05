const { Seeder } = require('mongo-seeding');
const config = {
    database: {
      host: '127.0.0.1',
      port: 27017,
      name: 'cupcake-db',
    },
    dropDatabase: true,
};
  
const seeder = new Seeder(config);
const path = require('path');

const collections = seeder.readCollectionsFromPath(
    path.resolve('./src/seed/data')
);

async function start() {
    try {
        console.log("Begin seeding!")
        await seeder.import(collections);
      } catch (err) {
        console.error('There was an error seeding', err)
    }
}
start().then(() => {
    console.log("Finished seeding!")
})
