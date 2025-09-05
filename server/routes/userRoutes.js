const express = require("express");
const router = express.Router();
const { Register, Login, Logout, Profile, } = require("../controllers/userController"); // <-- Added GetCart, AddToCart
const { validateJwtToken } = require("../middlewares/jwtAuthMiddleware");

// Route to register a new user
router.post("/register", Register);

// Route to login an existing user
router.post("/login", Login);

router.post("/logout", Logout);

router.get("/profile", validateJwtToken, Profile);


module.exports = router;