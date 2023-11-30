const Talk = require("../models/talk");

module.exports = {
  create
};

async function create(req, res) {
  const talk = await Talk.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  talk.comments.push(req.body);
  try {
    // Save any changes made to the movie doc
    await talk.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/talks/${talk._id}`);
}