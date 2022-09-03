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
                this.hashes.push(this.hash(this.hashes[offset + i], this.hashes[offset + i + 1]))
            }
            offset += length
            length /= 2
        }
    }

    hash(a: string, b: string) {
        return utils.keccak256(a + b.slice(2))
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
    const start = Date.now()
    const arr = [...Array(100000).keys()]
    let tree = new MerkleTree(arr.map(n => n.toString()))
    console.log('durée :', Date.now() - start)

    // console.log('tree.hashes :', tree.hashes)
}

example()






