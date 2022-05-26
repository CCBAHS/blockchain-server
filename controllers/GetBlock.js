const { BlockModel } = require("../models/Block");
require("dotenv").config();
const requestIp = require("request-ip");

const { NodeModel } = require("../models/Node");

const getBlock = async (req, res) => {
    // console.log(req.query);
        const node = await NodeModel.findOne({ "ipAddress": requestIp.getClientIp(req) });
        if (node) {

            const block = await BlockModel.findOne({"data":req.query.data});

            if(block){
                return res.status(200).json({success:"Block Found"});
            }else{  
                return res.status(404).json({err:"Block Not Found"});
            }

        }
        else {
            return res.status(401).json({ err: "Invaild Authentication"})
        }

};


module.exports = { getBlock };
