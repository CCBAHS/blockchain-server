const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, data, prevHash, creator){
        this.index = index,
        this.data = data,
        this.prevHash = prevHash,
        this.timestamp = Date.now(),
        this.nonce = 0,
        this.creator = creator,
        this.addedToChain = false,
        this.hash = this.computeHash()
    }
    computeHash(){
        return SHA256(
            this.index +
            this.prevHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce +
            this.creator
        ).toString();
    }
    
    proofOfWork(difficulty){
        while (!this.hash.startsWith("0".repeat(difficulty))) {
            this.nonce++;
            this.hash = this.computeHash();
            // console.log(this.hash);
        }
    }
}




module.exports = { Block };