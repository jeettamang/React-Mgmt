const {Router}=require("express");
const {Auth}=require("../controllers");
const router=Router();
const {upload}=require("@/library/middlewares")

router.post('/register', upload().single('image'), Auth.RegisterCtrl.register)

router.post("/login", Auth.LoginCtrl.login);

module.exports=router;