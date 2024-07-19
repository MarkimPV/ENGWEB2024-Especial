var express = require('express');
var router = express.Router();

var Lista = require('../controllers/lista');

router.get('/', function(req, res, next) {
  if (req.query.produto) {
    Lista.findByProduto(req.query.produto)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
    
    return
  }
  if (req.query.data) {
    Lista.findByDataIgualOuMaior(req.query.data)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
    return
  }
  Lista.list()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro));
});

router.get('/categorias', function(req, res, next) {
  Lista.findCategorias()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.get('/produtos', function(req, res, next) {
  Lista.findProdutos()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.get('/:id', function(req, res, next) {
  Lista.findById(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.post('/', function(req, res, next) {
  Lista.insert(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.post('/:idLista/produtos', function(req, res, next) {
  Lista.addProdutoToLista(req.params.idLista,req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.delete('/:id', function(req, res, next) {
  Lista.remove(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

router.delete('/:idLista/produtos/:idProd', function(req, res, next) {
  Lista.removeProdutoFromLista(req.params.idLista,req.params.idProd)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
);

module.exports = router;
