const User = require('../Models/users');
const Alumni = require('../Models/alumni');

const getNetworkUsers = async (req, res) => {
  try {
    const students = await User.find();
    const alumni = await Alumni.find();

    res.status(200).json({
      alumni,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getNetworkUsers };
