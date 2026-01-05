const bcrypt = require('bcrypt');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
            .select('-hashedPassword');
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUsersByRole = async (req, res) => {
	try {
		const role = req.params.role;
		const users = await User.find({ role })
            .select('-hashedPassword');
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const addUser = async (req, res) => {
	try {
		const { username, role } = req.body;
        const defaultPassword = process.env.DEFAULT_PASSWORD;

		if (!username || !role) {
			return res.status(400).json({ message: 'username, and role are required' });
		}

		const existing = await User.findOne({ username });
		if (existing) {
			return res.status(409).json({ message: 'Username already exists' });
		}

        // Hash default password
		const hashedPassword = await bcrypt.hash(defaultPassword, 10);
		const user = new User({ username, hashedPassword, role });
		await user.save();

        const sanitizeUser = user.select('-hashedPassword');

		res.status(201).json(sanitizeUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const deleted = await User.findByIdAndDelete(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({
            message: 'User deleted',
            id: req.params.id 
        });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Admin resets user password if forgotten by user
const resetUserPassword = async(req, res) => {
    try {
        const { username } = req.body;
        const defaultPassword = process.env.DEFAULT_PASSWORD;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'User not provided'
            });
        }

        // hash default password
        const hashedDefaultPassword = await bcrypt.hash(defaultPassword, 10);

        const user = await User.findOneAndUpdate(
            { username },
            { hashedPassword: hashedDefaultPassword },
            { new: true }
        ).select('-hashedPassword');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
	getAllUsers,
	getUsersByRole,
	addUser,
	deleteUser,
	resetUserPassword
};
