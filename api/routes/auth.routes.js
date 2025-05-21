const { Router } = require("express");
const { Auth } = require("../controllers"); // Ensure this matches your actual controller path
const { upload } = require("@/library/middlewares"); // Adjust path if necessary

const router = Router();


router.post("/register", upload().single("image"), Auth.RegisterCtrl.register);

router.post("/email-verify", Auth.RegisterCtrl.verifyEmail);

router.post("/resend-verification", Auth.RegisterCtrl.resendVerification);

router.post("/login", Auth.LoginCtrl.login);

module.exports = router;
