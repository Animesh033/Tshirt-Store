const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require('../controllers/auth');

router.post('/signup', [
    check("name").isLength({min:5}).withMessage("Name must be atleast 5 characters!"),
    check("email").isEmail().withMessage("Email is required!"),
    check("password").isLength({min:3}).withMessage("Password must be atleast 3 characters!"),
], signup);
router.get('/signout', signout);

router.post('/signin', [
    check("email").isEmail().withMessage("Email is required!"),
    check("password").isLength({min:3}).withMessage("Password must be atleast 3 characters!"),
], signin);
router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
    // res.json(req.auth);
    res.send("A protected route");
});
module.exports = router;