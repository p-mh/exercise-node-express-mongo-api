const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let db = null;

const initializeDatabase = async () => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      auth: { user: 'username', password: 'password' },
      poolSize: 10,
      useNewUrlParser: true,
    });
    db = client.db('stackerine');
    const products = db.collection('products');
  } catch (e) {
    console.error(e);
  }
};

const listProducts = async (page, orderAttribut, orderWay) => {
  try {
    const listProducts = await db
      .collection('products')
      .find()
      .sort({ [orderAttribut]: Number(orderWay) })
      .skip(2 * page)
      .limit(2)
      .toArray();
    return listProducts;
  } catch (e) {
    console.error(e);
  }
};

const addProduct = async product => {
  try {
    await db.collection('products').insertOne(product);
  } catch (e) {
    console.error(e);
  }
};

const updateProduct = async (productId, productFieldToChange) => {
  console.log(productId, productFieldToChange);
  try {
    const { result } = await db
      .collection('products')
      .updateOne({ _id: ObjectId(productId) }, { $set: productFieldToChange });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

const deleteProduct = async productId => {
  try {
    await db.collection('products').deleteOne({ _id: ObjectId(productId) });
  } catch (e) {
    console.error(e);
  }
};

initializeDatabase();

module.exports = {
  initializeDatabase,
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
