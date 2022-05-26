const express = require('express');
const { addBlock } = require('../controllers/AddBlock');
const { addNode } = require('../controllers/AddNode');
const { getBlock } = require('../controllers/GetBlock');

const blockchainRouter = express.Router();

blockchainRouter.route('/addNode').post(addNode);
blockchainRouter.route('/addBlock').post(addBlock);
blockchainRouter.route('/getBlock').get(getBlock);

module.exports = {blockchainRouter};