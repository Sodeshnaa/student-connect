const User = require('../Models/users'); // Ensure you are importing User correctly
const Alumni = require('../Models/alumni'); // Ensure you are importing User correctly

const getUsersForSidebar = async (req, res) => {
    try {
        const currentUserId = req.user?._id; // Assume you have middleware that attaches the authenticated user to req.user
        const userRole = req.user?.role; // Check if 'alumni' or 'user'
        let users = [];

        if (userRole === 'alumni') {
            // Alumni should see both verified alumni and users
            const regularUsers = await User.find(
                { _id: { $ne: currentUserId } },
                '_id fullName profilePhoto'
            );

            const alumni = await Alumni.find(
                { _id: { $ne: currentUserId }, verified: true }, // Exclude self and only show verified
                '_id fullName profilePhoto'
            );

            users = [...regularUsers, ...alumni]; // Combine users and alumni
        } else {
            // Users see both verified alumni and users
            const regularUsers = await User.find(
                { _id: { $ne: currentUserId } },
                '_id fullName profilePhoto'
            );

            const alumni = await Alumni.find(
                { verified: true },
                '_id fullName profilePhoto'
            );

            users = [...regularUsers, ...alumni];
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }
};


module.exports = { getUsersForSidebar };
