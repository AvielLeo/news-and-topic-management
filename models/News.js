const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    topic_url: {
        type: String,
        required: true
    },
    title_url: {
        type: String,
        required: true
    },
    tags_url: {
        type: Array,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('news', NewsSchema);