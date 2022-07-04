const { body } = require('express-validator');

const registerValidation = [

    body('username').not().isEmpty().withMessage("Username is required."),

    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

    // Confirm Password needs to be min 6 chars AND must match the req.body.password field
    body('confirmPass')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords must match.");
        }
            return true;
        })

];

const loginValidation = [
    // Username should not be empty
    body('username').not().isEmpty().withMessage("Username is required."),
    
    // Password should not be empty and needs to be min 6 chars
    body('password').not().isEmpty().withMessage("Password is required.")
];

module.exports = { registerValidation, loginValidation };