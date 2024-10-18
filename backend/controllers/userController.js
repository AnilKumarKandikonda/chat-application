const userModel = require('../models/userModel');
const validator = require('validator');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract user information from the request body
        // Check if a user with the same email already exists
        let user = await userModel.findOne({ email });
        if (user) return res.status(400).json('User with given email already exists...');

        // Validate the email address
        if (!validator.isEmail(email)) return res.status(400).json("Email is not valid");

        // Create a new user instance and hash the password
        user = new userModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        console.log(user.password);
        user.password = await bcrypt.hash(user.password, salt);

        // Save the user in the database
        await user.save();
        res.status(200).json({ _id: user._id, name, email });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error); // Handle any errors and respond with a 500 status code
    }
}

module.exports = { registerUser};