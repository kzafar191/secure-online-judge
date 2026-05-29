const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'exist', message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ status: 'error', message: 'Server error during signup' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'doesnotexist', message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 'incorrect', message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        const statusStr = user.role === 'admin' ? 'admin' : 'success';
        res.status(200).json({ 
            status: statusStr, 
            token, 
            email: user.email, 
            name: user.name 
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ status: 'error', message: 'Server error during login' });
    }
};