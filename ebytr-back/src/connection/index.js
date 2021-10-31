const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Ebytr`;
const DB_NAME = 'Ebytr';

module.exports = () => (
  MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
); 