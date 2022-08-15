import { utils } from 'ethers'

class MerkleTree {
    
    levels: string[][] = []
    index: number = 0
    layers: number = 0
    
    constructor(layers: number) {
        this.init(layers)
        this.layers = layers
    }
    
    init(layers: number) {
        // fill tree with zeros
        for (let i = 0; i <= layers; i++) {
            this.levels[i] = new Array(2**(layers - i)).fill(this.zeros(i))   
        }
    }

    getRoot() {
        return this.levels[0][0]
    }

    hash(a: string, b: string) {
        return utils.keccak256(a + b.slice(2))
    }

    zeros(i: number) {
        if (i === 0) return "0x2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c"
        else if (i === 1) return "0x256a6135777eee2fd26f54b8b7037a25439d5235caee224154186d2b8a52e31d"
        else if (i === 2) return "0x1151949895e82ab19924de92c40a3d6f7bcb60d92b00504b8199613683f0c200"
        else if (i === 3) return "0x20121ee811489ff8d61f09fb89e313f14959a0f28bb428a20dba6b0b068b3bdb"
        else if (i === 4) return "0x0a89ca6ffa14cc462cfedb842c30ed221a50a3d6bf022a6a57dc82ab24c157c9"
        else if (i === 5) return "0x24ca05c2b5cd42e890d6be94c68d0689f4f21c9cec9c0f13fe41d566dfb54959"
        else if (i === 6) return "0x1ccb97c932565a92c60156bdba2d08f3bf1377464e025cee765679e604a7315c"
        else if (i === 7) return "0x19156fbd7d1a8bf5cba8909367de1b624534ebab4f0f79e003bccdd1b182bdb4"
    }

    addLeaf(leaf: string) {
        this.levels[0][this.index] = leaf
        let idx = this.index

        for (let i = 0; i < this.layers; i++) {
            const thisLevel = this.levels[i]
            if (idx % 2 === 0) {
                this.levels[i + 1][idx/2] = this.hash(thisLevel[idx], thisLevel[idx + 1])
            } else {
                this.levels[i + 1][(idx - 1)/2] = this.hash(thisLevel[idx - 1], thisLevel[idx])
                idx--
            }
            idx /= 2
        }

        this.index++
    }

    //verify
    //forking: addLeaf(leaf: string, lastHonnestIndex: number)
}


function example() {
    let tree = new MerkleTree(3)    
    console.log('tree.levels :', tree.levels)

    tree.addLeaf("0x0a89ca6ffa14cc462cfedb842c30ed221a50a3d6bf022a6a57dc82ab24c157c9")
    tree.addLeaf("0x24ca05c2b5cd42e890d6be94c68d0689f4f21c9cec9c0f13fe41d566dfb54959")
    tree.addLeaf("0x1ccb97c932565a92c60156bdba2d08f3bf1377464e025cee765679e604a7315c")
    tree.addLeaf("0x19156fbd7d1a8bf5cba8909367de1b624534ebab4f0f79e003bccdd1b182bdb4")
    console.log('tree.levels :', tree.levels)
}

example()






