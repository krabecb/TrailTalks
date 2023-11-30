const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    description: { type: String},
    alt: {type: String, default:""} 
})

const commentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const talkSchema = new Schema({
    title: String,
    location: String,
    description: String,
    images: [imageSchema],
    comments: [commentSchema]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Talk', talkSchema);