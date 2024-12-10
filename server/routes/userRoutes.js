const express = require("express");
const router = express.Router();
const { Register, Login ,Logout, Profile} = require("../controllers/userController");
const { validateJwtToken } = require("../middlewares/jwtAuthMiddleware");

// Route to register a new user
router.post("/register", Register);

// Route to login an existing user
router.post("/login", Login);

router.post("/logout", Logout);

router.get("/profile", validateJwtToken, Profile);

router.get("/cart", validateJwtToken, GetCart);

router.post("/cart", validateJwtToken, AddToCart);


module.exports = router;