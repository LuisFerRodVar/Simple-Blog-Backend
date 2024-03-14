const mongoose = require('mongoose');

const connection = async() => {
  try{
    await mongoose.connect("mongodb://localhost:27017/portfolio");
    //useNewUrlParser: true
    //useUnifiedTopology: true
    //useCreateIndex: true
    console.log('Connected at database')
  }catch(error){
    console.log(error);
    throw new Error('Database unable connect');
  }
}
module.exports = {
  connection
}
