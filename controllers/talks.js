module.exports = {
    index,
    new: newTalk,
    show,
    create,
    imageUpload: addTalk,
    update: updateTalk,
    delete: deleteTalk
}

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const {clConfig} = require("../config/cloudinary.js");
cloudinary.config(clConfig);

const Talk = require('../models/talk.js')

async function index(req, res, next) {
    try {
        const talks = await Talk.find({})
        res.render('talks/index', { title: "What everyone's talking about.", relative: '', talks: talks})
    } catch(err) {
        console.log(err)
        next(err)
    }
}

async function newTalk(req, res, next) {
    try {
        res.render('talks/new', { title: 'Add a talk.', relative: '', error: ''})
    } catch(err) {
        console.log(err)
        next(err)
    }
}

async function show(req, res, next) {
    try {
        res.render('talks/show', { title: '', relative: true, talk: await Talk.findById(req.params.id)})
    } catch(err) {
        console.log(err)
        next(err)
    }
}

async function create(req, res, next) {
    try {
        const newTalk = await Talk.create(req.body)
        res.redirect('/talks')
    } catch(err) {
        console.log(err)
        next(err)
    }
}

async function addTalk(req, res, next) {
    try {
        const result = await streamUpload(req)
        const talk = await Talk.findById(req.params.id)
        const newImage = { url: result.url,  description: req.body.description, alt: req.body.alt}
        talk.images.push(newImage)
        await talk.save()
        res.redirect(`/talks/${req.params.id}`)
    } catch(err) {
        console.log(err)
        next(err)
    }
}

function streamUpload(req) {
    return new Promise(function (resolve, reject){
        let stream = cloudinary.uploader.upload_stream( function(error, result){
            if(result){
                console.log(result)
                resolve(result)
            }else{
                reject(error)
            }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}

async function updateTalk(req, res, next) {
    try {
        const updatedTalk = await Talk.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect(`/talks/${req.params.id}`)
    } catch(err) {
        console.log(err)
        next(err)
    }
}

async function deleteTalk(req, res, next) {
    try {
        await Talk.findByIdAndDelete(req.params.id);
        res.redirect('/talks');
    } catch(err) {
        console.log(err)
        next(err)
    }
}