const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  designacao: String,
  categoria: String,
  quantidade: {
    valor: String, 
    unidade: String
  }
});

const listaSchema = new mongoose.Schema({
  _id: String,
  data:String,
  produtos:[produtoSchema]

}, { versionKey: false });

module.exports = mongoose.model('lista', listaSchema);