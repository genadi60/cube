// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const connectionStr = 'mongodb://localhost:27017';
// const client = new MongoClient(connectionStr, {useUnifiedTopology: true});

const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER || '';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || '';
const connectionStr1 = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ih30w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const connectionStr = 'mongodb://localhost:27017/test';
mongoose.connect(connectionStr);

const dbQueries = async (collection) => {
  try {
    //await collection.insertOne({ 'name': 'Pesho' });
    const data = await collection.find().toArray();
    console.log('Async result: ', data);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// client.connect(function(err) {
//   if (err) {
//     console.error('Something happen with DB.');
//     throw err;
//   }
//   const db = client.db('test');
//   const people = db.collection('people');

//   dbQueries(people)
// });
