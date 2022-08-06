import { utils } from 'ethers'

class MerkleTree {
    
    hashes: string[] = []
    
    constructor(data: string[]) {
        this.init(data)
    }
    
    init(data: string[]) {
        this.hashes = data.map(e => utils.keccak256(utils.toUtf8Bytes(e)))
    
        let length = this.hashes.length
        let offset = 0
    
        while (length > 1) {
            if (length % 2 != 0) {
                this.hashes.push(this.hashes[this.hashes.length - 1])
                length++
            }
            for (let i = 0; i < length; i += 2) {
                const array =  Uint8Array.from([...utils.arrayify(this.hashes[offset + i]), ...utils.arrayify(this.hashes[offset + i + 1])])
                this.hashes.push(utils.keccak256(array))
            }
            offset += length
            length /= 2
        }
    }

    verify(leaf: string, proof: string[]) {
        let hash = utils.keccak256(utils.toUtf8Bytes(leaf))
    
        for (let i = 0; i < proof.length; i++) {
            hash = utils.keccak256(Uint8Array.from([...utils.arrayify(hash), ...utils.arrayify(proof[i])]))
        }
    
        return hash === this.getRoot()
    }

    getRoot() {
        return this.hashes[this.hashes.length - 1]
    }
}


function example() {
    let tree = new MerkleTree(["salut", "toi", "c'est", "moi", "et"])

    console.log('tree.hashes :', tree.hashes)
    console.log(tree.verify("salut",
    ["0xa0057ef29cc215d2dbacc6c77ce4b2fdf282d5dd0ae313de4b55a5163957707e",
    "0x340135d068356183ba2c1d760a4781fcb4bf2018d0d7a398e5499c16b201ed8c",
    "0x589669b0b47fc86d69d388081745420197ef7d306defde6932e1b54206507619"
    ]))
}

example()






