const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error('Error in getUsers:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error in getUserById:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error('Error in createUser:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error in updateUser:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      // Check if the user exists in the database
      const user = await User.findById(req.params.userId);
      
      // If no user is found, return a 404 status with an error message
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // If user exists, delete all associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Deletes user's thoughts

      // Delete the user
      await User.findByIdAndDelete(req.params.userId);
      
      // Return a success message
      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      // Log any error and send a 500 status with an error message
      console.error('Error in deleteUser:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error in addFriend:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error in removeFriend:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  },
};
