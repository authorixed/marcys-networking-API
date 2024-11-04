const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  async getThoughts(req, res) {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  },
  async getThoughtById(req, res) {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  },
  async createThought(req, res) {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
  },
  async updateThought(req, res) {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    res.json(thought);
  },
  async deleteThought(req, res) {
    await Thought.findByIdAndDelete(req.params.thoughtId);
    res.json({ message: 'Thought deleted' });
  },
  async addReaction(req, res) {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true });
    res.json(thought);
  },
  async removeReaction(req, res) {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
    res.json(thought);
  },
};
