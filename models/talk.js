const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    url: {type: String, required: true},
    description: { type: String},
    alt: {type: String, default:""} 
})

const talkSchema = new Schema({
    title: String,
    location: String,
    description: String,
    images: [imageSchema]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Talk', talkSchema);