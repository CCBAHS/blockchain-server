const { Block } = require("../blockchain/block");
const { BlockModel } = require("../models/Block");
require("dotenv").config();
const requestIp = require("request-ip");

const fs = require("fs");
const { default: mongoose } = require("mongoose");
const { NodeModel } = require("../models/Node");

const addBlock = async (req, res) => {
    var chainCounter;
    if (!fs.existsSync("counter.txt")) {
        const node = await NodeModel.findOne({ "ipAddress": requestIp.getClientIp(req) });
        if (node) {
            // console.log(node);
            await node.updateOne({ "$inc": { "blocksCreated": 1 } }); 
            chainCounter = 0;

            const genesis = new Block(
                0,
                mongoose.Types.ObjectId(),
                "0",
                requestIp.getClientIp(req)
            );

            genesis.proofOfWork(process.env.DIFFICULTY);

            // console.log(genesis);

            const blockDB = BlockModel({
                index: genesis.index,
                timestamp: genesis.timestamp,
                data: genesis.data,
                prevHash: genesis.prevHash,
                hash: genesis.hash,
                nonce: genesis.nonce,
                addedToChain: true,
                creator: genesis.creator,
            });

            // console.log(blockDB);

            latestBlockGenesis = await blockDB.save();
        }
        else {
            // throw new Error("Invalid Authentication");
            return res.status(401).json({ err: "Invaild Authentication"})
        }
        chainCounter++;

        // console.log(latestBlock);
    } else {
        chainCounter = fs.readFileSync("counter.txt", "utf8");
    }

    fs.writeFileSync("counter.txt", (parseInt(chainCounter) + 1).toString());

    const latestBlock = await BlockModel.find({}).sort({ createdAt: -1 }).limit(1);
    // console.log(latestBlock);
    const latest = latestBlock[0];
    // console.log(latest.hash);
    const {
        body: { data },
    } = req;

    // console.log(data);


    const nodeOne = await NodeModel.findOne({ "ipAddress": requestIp.getClientIp(req) });
    if (nodeOne) {
        // console.log(nodeOne);
        await nodeOne.updateOne({ "$inc": { "blocksCreated": 1 } });
        const blockNew = new Block(
            chainCounter,
            data,
            latest.hash,
            requestIp.getClientIp(req)
        );

        blockNew.proofOfWork(process.env.DIFFICULTY);

        // console.log(blockNew);

        const newBlock = BlockModel({
            index: blockNew.index,
            timestamp: blockNew.timestamp,
            data: blockNew.data,
            prevHash: blockNew.prevHash,
            hash: blockNew.hash,
            nonce: blockNew.nonce,
            addedToChain: true,
            creator: blockNew.creator,
        });

        const chainBlock = await newBlock.save();

        return res.status(200).send(chainBlock._id);
    }
    else {
        return res.status(401).json({ err: "Invaild Authentication" })
    }

};


module.exports = { addBlock };
