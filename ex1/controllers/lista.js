const Lista = require('../models/lista');

module.exports.list = async () => {
    return await Lista.find().exec();
}

module.exports.findById = id => {
    return Lista.findOne({ _id: id }).exec();
}

module.exports.findByProduto = produto => {
    return Lista.find({ 'produtos.designacao': produto }).exec();
}

module.exports.findCategorias = categoria => {
    return Lista.distinct('produtos.categoria').sort().exec();
}

module.exports.findProdutos = categoria => {
    return Lista.distinct('produtos').sort({ 'designacao': 1 }).exec();
}

module.exports.findByDataIgualOuMaior = data => {
    return Lista.find({ data: { $gte: data } }).exec();
}

module.exports.insert = (lista) => {
    if (Lista.find({ _id: lista._id }).exec().length != 1) {
        var newLista = new Lista(lista);
        return newLista.save();
    }
    
    return Promise.reject(new Error('Já existente!'));
}

module.exports.addProdutoToLista = (idLista, novoProduto) => {
    return Lista.findById(idLista).exec()
        .then(lista => {
            if (!lista) {
                return Promise.reject(new Error('Lista não encontrada!'));
            }
            
            lista.produtos.push(novoProduto);

            return lista.save();
        })
        .then(updatedLista => {
            return updatedLista;
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

module.exports.removeProdutoFromLista = (idLista, produtoId) => {
    return Lista.findById(idLista).exec()
        .then(lista => {
            if (!lista) {
                return Promise.reject(new Error('Lista não encontrada!'));
            }
            lista.produtos = lista.produtos.filter(produto => produto._id.toString() !== produtoId.toString());
            return lista.save();
        })
        .then(updatedLista => {
            return updatedLista;
        })
        .catch(err => {
            return Promise.reject(err);
        });
};



module.exports.remove = (id) => {
    return Lista.find({ _id: id }).deleteOne().exec();
}

module.exports.update = (id, lista) => {
    return Lista.findByIdAndUpdate(id, lista, { new: true }).exec();
}