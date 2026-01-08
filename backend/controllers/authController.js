const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// generating jwt for auth
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        {id: userId},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '45m'}
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: '7d'}
    );

    return {accessToken, refreshToken};
}


// User Login
const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        console.log(`${username}: ${password}`);

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Invalid username or password'
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Invalid username or password'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid email or password' 
            });
        }

        // Check if using default password
        const isDefaultPassword = await bcrypt.compare(process.env.DEFAULT_PASSWORD, user.hashedPassword);
        
        // Generate tokens
        const tokens = generateTokens(user._id);

        res.json({
            success: true,
            requiresPasswordUpdate: isDefaultPassword,
            message: isDefaultPassword ? 'Password update required' : 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            },
            tokens
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error during Login ${error}`
        });
    }



}

// Password update endpoint
const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newPassword } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - valid token required'
            });
        }

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                error: 'New password is required'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify password is still the default
        const isDefaultPassword = await bcrypt.compare(
            process.env.DEFAULT_PASSWORD, 
            user.hashedPassword
        );

        if (!isDefaultPassword) {
            return res.status(403).json({
                success: false,
                error: 'Password has already been changed. Use forgot password to reset.'
            });
        }

        // Update password
        user.hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: `Server error during password update: ${error.message}` 
        });
    }
};


module.exports = {login, updatePassword};