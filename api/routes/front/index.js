const {Router} = require('express')
const productsRoutes = require('./products.routes')
const mixtRoutes=require("./mix.routes");

const router = Router()

router.use(productsRoutes)

router.use(mixtRoutes);

module.exports = router