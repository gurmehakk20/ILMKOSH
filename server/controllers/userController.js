const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const dotenv = require('dotenv');
dotenv.config();

const autoLoginAfterRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token, message: 'Registration and login successful!' });
  } catch (err) {
    console.error('Auto login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const Register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await User.registerUser(name, email, password); // Keep the existing registration code

    // Auto login after registration
    await autoLoginAfterRegister(req, res);
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});
// Handle user logout
const Logout = asyncHandler(async (req, res) => {
  try {
    // Invalidate the token or clear the cookie (if using cookies for token storage)
    res.status(200).json({ success: true, message: 'Logout successful!' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const Profile = asyncHandler(async(req, res)=>{
  const userId = req.user.userId;
  try{
    const profile = await User.findOne({_id: userId});
    if(!profile){
      res.status(400).json({
        message:"Error Finding User"
      })
    }
    res.status(200).json({ profile:profile})
  }catch(e){
    console.error("Error is", e)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
})

// Handle user login
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token, message: 'Login successful!' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = { Register, Login,Logout, Profile };
// Saved books handlers
const asyncHandler2 = asyncHandler; // alias for clarity

const SaveBook = asyncHandler2(async (req, res) => {
  const userId = req.user.userId;
  const { googleId, title, authors, thumbnail, previewLink, infoLink } = req.body;
  if (!googleId) return res.status(400).json({ success: false, message: 'googleId required' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const exists = (user.savedBooks || []).some((b) => b.googleId === googleId);
  if (!exists) {
    user.savedBooks = user.savedBooks || [];
    user.savedBooks.push({ googleId, title, authors, thumbnail, previewLink, infoLink });
    await user.save();
  }
  res.json({ success: true, savedBooks: user.savedBooks });
});

const ListSavedBooks = asyncHandler2(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, savedBooks: user.savedBooks || [] });
});

const RemoveSavedBook = asyncHandler2(async (req, res) => {
  const userId = req.user.userId;
  const { googleId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.savedBooks = (user.savedBooks || []).filter((b) => b.googleId !== googleId);
  await user.save();
  res.json({ success: true, savedBooks: user.savedBooks });
});

module.exports.SaveBook = SaveBook;
module.exports.ListSavedBooks = ListSavedBooks;
module.exports.RemoveSavedBook = RemoveSavedBook;
