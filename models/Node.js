const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    ipAddress:{
        type: String,
        required: [true, "Please provide a valid IP address"],
        unique: true,
        index: true,
    },
    blocksCreated:{
        type: Number,
        required: [true, "Please provide total blocks added to the chain"],
        default: 0,
    }
},{
    timestamps: true
});

const NodeModel = mongoose.model('Node', NodeSchema);

module.exports = {NodeModel};