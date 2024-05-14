const path = require( 'path' );
// -------------------------------------------
const db = require('../database/models');
// ----------------------------------------
const Productos = db.Producto;
const Categoria = db.Categoria;
// ----------------------------------------------

const productosController = {
    'list': (req, res) => {
        db.Producto.findAll({
            include: ['categoria']
        })
        .then(productos => {
            res.render('productosList', {productos})
        })
    },

    'detail': (req, res) => {
        db.Producto.findByPk(req.params.id,
        {
            include: ['categoria']
        })
        .then(producto => {
            res.render('productosDetail', {producto})
        })
    },

    add:  (req, res) => {
        let promCategoria =  Categoria.findAll();
        Promise.all([promCategoria])
        .then(([categoria])=>{
            return res.render(path.resolve(__dirname, '..', 'views', 'productosAdd'), { categoria });
        })
        .catch(err => console.log(err));
    },

    create: function (req, res){
        Productos.create(
            {
            title: req.body.title,
            price: req.body.price,
            discount: req.body.discount,
            detail: req.body.detail,
            categoria_id: req.body.categoria_id
            }
        )
        .then(() => {
        return res.redirect('/productos')
    })
    .catch(err => console.log(err));
    },

    edit: function(req,res) {
        let id = req.params.id;
        let promProducto = Productos.findByPk(id,{include: ['categoria']});
        let promCategoria = Categoria.findAll();
        Promise
        .all([promProducto, promCategoria])
        .then(([producto, categoria]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'productosEdit'), {producto, categoria})})
        .catch(error => res.send(error))
    }, 

    update: function (req,res) {
        let productoId = req.params.id;
        Productos.update(
            {
                title: req.body.title,
                price: req.body.price,
                discount: req.body.discount,
                detail: req.body.detail,
                categoria_id: req.body.categoria_id
            },
            {
                where: {id: productoId}
            })
        .then(()=> {
            return res.redirect('/productos')})            
        .catch(error => res.send(error))
    }, 

    delete:  function(req,res){
        let productoId = req.params.id;
        Productos.findByPk(productoId)
        .then( producto => {
            return res.render(path.resolve(__dirname, '..', 'views',  'productosDelete'), {producto})
        })
            .catch(error => res.send(error))
        }, 

    destroy: function(req,res){
        let productoId= req.params.id;
        Productos.destroy({where:{id: productoId}})
        .then(()=>{return res.redirect('/productos')})
        .catch( error => res.send(error))
    }
}


module.exports = productosController;