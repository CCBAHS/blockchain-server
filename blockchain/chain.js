const { Block } = require('./block');
const fs = require('fs');
class Blockchain {
    constructor() {
        if (!fs.existsSync('counter.txt')) {
            this.chainCounter = 0;
        }
        else {
            this.chainCounter = fs.readFileSync('counter.txt', 'utf8');
        }
        this.blockchain = []
        this.difficulty = 4;
    }

    startGenesisBlock() {
        return new Block(0, Date.now(), "Initial Block in the Chain", "0");
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.prevHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
        newBlock.addedToChain = true;
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.prevHash !== precedingBlock.hash) return false;
        }
        return true;
    }
};

module.exports = { Blockchain };