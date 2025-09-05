const express = require("express");
const router = express.Router();
const { Register, Login, Logout, Profile, SaveBook, ListSavedBooks, RemoveSavedBook } = require("../controllers/userController");
const { validateJwtToken } = require("../middlewares/jwtAuthMiddleware");

// Route to register a new user
router.post("/register", Register);

// Route to login an existing user
router.post("/login", Login);

router.post("/logout", Logout);

router.get("/profile", validateJwtToken, Profile);

// Saved books endpoints
router.get('/saved', validateJwtToken, ListSavedBooks);
router.post('/saved', validateJwtToken, SaveBook);
router.delete('/saved/:googleId', validateJwtToken, RemoveSavedBook);


module.exports = router;