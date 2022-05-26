const requestIp = require('request-ip');
const { NodeModel } = require('../models/Node');

const addNode = async (req, res) => {
        const clientIp = requestIp.getClientIp(req);
        // console.log(clientIp);

        const prevNode = await NodeModel.findOne({ ipAddress: clientIp });

        if (prevNode) {
                // console.log(prevNode);
                return res.status(200).send("Node Added");
        }

        else {
                const node = NodeModel({ ipAddress: clientIp });

                const newNode = await node.save();

                return res.status(200).send("Node Added");
        }
};

module.exports = { addNode };