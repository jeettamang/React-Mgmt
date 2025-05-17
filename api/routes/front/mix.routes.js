const { Router } = require("express");
const { Front } = require("@/controllers");
const { customerOnly, auth } = require("@/library/middlewares");

const router = Router();

router.get("/categories", Front.MixCtrl.categories);

router.get("/categories/:id", Front.MixCtrl.categoryById);

router.get("/categories/:id/products", Front.ProductsCtrl.ByCategoryId);

router.get("/brands", Front.MixCtrl.brands);

router.get("/brands/:id", Front.MixCtrl.brandById);

router.get("/brands/:id/products", Front.ProductsCtrl.ByBrandId);

router.post("/checkout", auth, customerOnly, Front.MixCtrl.checkout);

router.get("/image/:filename", (req, res, next) => {
  res.sendFile(`./uploads/${req.params.filename}`, {
    root: "./",
  });
});

module.exports = router;

// const {Router} = require('express')
// const {Front} = require('@/controllers')
// const {auth, customerOnly}=require("@/library/middlewares");

// const router = Router()

// // router.get("/categories", Front.MixCtrl.categories)

// router.get("/categories/:id", Front.MixCtrl.categoryById)

// router.get("/categories/:id/products", Front.ProductsCtrl.byCategoryId)

// router.get("/brands", Front.MixCtrl.brands)

// router.get("/brands/:id", Front.MixCtrl.brandById)

// router.get("/brands/:idproducts", Front.ProductsCtrl.byBrandId)

// router.get("/checkout", auth, customerOnly,Front.MixCtrl.checkout);

// router.get("/image/:filename", (req, res, next)=>{
//     res.sendFile(`./uploads/${req.params.filename}`,{
//         root: "./"
//     })
// })

// module.exports=router
