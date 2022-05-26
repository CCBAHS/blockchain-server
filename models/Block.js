const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: [true, "Please provide the block index"],
        unique: true,
    },
    timestamp: {
        type: Number,
        required: [true, "Please provide valid timestamp"]
    },
    data: {
        type: String,
        required: [true, "Please provide the data"],
        index: true,
        unique: true,
    },
    prevHash: {
        type: String,
        required: [true, "Please provide previous hash"],
    },
    hash: {
        type: String,
        required: [true, "Please provide hash"],
    },
    nonce: {
        type: Number,
        required: [true, "Please provide nonce"],
    },
    addedToChain: {
        type: Boolean,
        required: [true, "Please provide the state of the block"],
    },
    creator: {
        type: String,
        required: [true, "Please provide block creator"],
    }
}, {
    timestamps: true
});

const BlockModel = mongoose.model('Block', BlockSchema)

module.exports = { BlockModel };