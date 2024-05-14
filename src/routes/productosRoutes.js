const express = require( 'express' );
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get('/productos', productosController.list);
router.get('/productos/detail/:id', productosController.detail);
router.get('/productos/add', productosController.add);
router.post('/productos/create', productosController.create);
router.get('/productos/edit/:id', productosController.edit);
router.put("/productos/update/:id", productosController.update);
router.get('/productos/delete/:id', productosController.delete);
router.put('/productos/delete/:id', productosController.destroy);

module.exports = router;