const express = require('express');
const router = express.Router();
const functions = require('../functions/functions');

const News = require('../models/News');

// @route   GET /news
// @desc    Get All News
router.get('/', (req, res) => {

    News.find({ status: { $ne: "deleted" } })
        .sort({ date_created: -1 })
        .limit(15)
        .then(items => res.json(items));
});

// @route   GET /news/status/:status
// @desc    Get News by status (draft, deleted, publish)
router.get('/status/:status', (req, res) => {

    News.find({ status: { $eq: req.params.status } })
        .sort({ date_created: -1 })
        .limit(15)
        .then(items => res.json(items));
});

// @route   GET /news/topic-name/date/title
// @desc    Get News Detail
router.get('/:topic/:date/:title', (req, res) => { 

    News.findOne({
        topic_url: req.params.topic,
        date_created: { $gte: new Date(req.params.date) },
        title_url: req.params.title,
        status: { $ne: "deleted" }
    })
        .then(item => res.json(item));
});

// @route   GET /news/topic
// @desc    Get News based on Topic
router.get('/:topic', (req, res) => {
    
    News.find({ 
        topic_url: req.params.topic,
        status: { $ne: "deleted" }
    })
        .sort({ date_created: -1 })
        .limit(15)
        .then(items => res.json(items));
});

// @route   GET /news/tag/tag-name
// @desc    Get News based on Tag
router.get('/tag/:tagName', (req, res) => {

    News.find({
        tags_url: req.params.tagName,
        status: { $ne: "deleted" }
    })
        .sort({ date_created: -1 })
        .limit(10)
        .then(items => res.json(items));
});

// @route   POST /news/create-news
// @desc    Create new News
router.post('/create-news', (req, res) => {

    // convert the topic, title, and tags to url format
    var topicUrl = functions.lowerCase(req.body.topic);
    topicUrl = functions.replaceSpace(topicUrl);

    var titleUrl = functions.lowerCase(req.body.title);
    titleUrl = functions.removePunctuation(titleUrl);
    titleUrl = functions.replaceSpace(titleUrl);

    var tagsUrl = req.body.tags.map((x) => x);
    for(i = 0 ; i < tagsUrl.length ; i++){
        tagsUrl[i] = functions.lowerCase(tagsUrl[i]);
        tagsUrl[i] = functions.replaceSpace(tagsUrl[i]);
    }

    const newNews = new News({
        topic: req.body.topic,
        tags: req.body.tags,
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        status: req.body.status,
        author: req.body.author,
        topic_url: topicUrl,
        title_url: titleUrl,
        tags_url: tagsUrl
    });
    newNews
        .save()
        .then(news => res.json(news))
        .catch(err => console.log(err));
});

// @route   DELETE /news/delete-news
// @desc    Hard Delete a News
router.delete('/delete-news/:id', (req, res) => {

    News.findById(req.params.id)
        .then(news => news.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE /news/delete-news
// @desc    Soft Delete a News
router.put('/delete-news/:id', (req, res) => {

    News.updateOne(
        { _id: req.params.id },
        { status: "deleted" }
    )
        .then(news => res.json(news))
});

// @route   PUT /news/update-news
// @desc    Update a News
router.put('/update-news/:id', (req, res) => {

    News.updateOne(
        { _id: req.params.id },
        {
            topic: req.body.topic,
            tags: req.body.tags,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            status: req.body.status
        }
    )
        .then(news => res.json(news))
});


module.exports = router;