const Talk = require("../models/talk");

module.exports = {
    create,
    delete: deleteComment
};

async function create(req, res) {
    const talk = await Talk.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    talk.comments.push(req.body);
    try {
        await talk.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/talks/${talk._id}`);
}

async function deleteComment(req, res) {
    const talk = await Talk.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
    if (!talk) return res.redirect('/movies');
    talk.comments.remove(req.params.id);
    await talk.save();
    res.redirect(`/talks/${talk._id}`);
}