const express =  require('express');
const path = require("path");
const app = express();
const methodOverride  = require("method-override");

const indexRouter = require( "./routes/index" );
const productosRouter = require('./routes/productosRoutes');
const nosotrosRouter = require('./routes/nosotros');
const contactoRouter = require('./routes/contacto');

app.set('views', path.resolve(__dirname, './views'));
app.set( "view engine", "ejs" );

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
});

app.use( "/" , indexRouter );
app.use(productosRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/contacto', contactoRouter);