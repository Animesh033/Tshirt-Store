const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const {
    getUserById, 
    getUser, 
    updateUser, 
    userPurchageList
} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

router.param("userId", getUserById);
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.put('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchageList);
// Assignment
// router.get('/users', getAllUsers);
// End of Assignment

module.exports = router;