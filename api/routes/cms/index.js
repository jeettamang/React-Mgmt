const { Router } = require("express");
const staffsRoutes = require("./staffs.routes");
const customersRoutes = require("./customers.routes");
const categoriesRoutes = require("./categories.routes");
const brandsRoutes = require("./brands.routes");
const productsRoutes = require("./products.routes");
const reviewsRoutes = require("./reviews.routes");
const orderRoutes = require("./orders.routes");
const productRoutes = require("./products.routes");
const { adminOnly } = require("@/library/middlewares");

const router = Router();

router.use("/staffs", adminOnly, staffsRoutes);

router.use("/customers", customersRoutes);

router.use("/categories", categoriesRoutes);

router.use("/brands", brandsRoutes);

router.use("/products", productRoutes);

router.use("/reviews", reviewsRoutes);

router.use("/orders", orderRoutes);

module.exports = router;
