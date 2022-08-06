import { utils } from 'ethers'

function createTree(data: string[]): string[] {
    let hashes = data.map(e => utils.keccak256(utils.toUtf8Bytes(e)))
    
    let length = hashes.length
    let offset = 0

    while (length > 1) {
        if (length % 2 != 0) {
            hashes.push(hashes[hashes.length - 1])
            length++
        }
        for (let i = 0; i < length; i += 2) {
            const array =  Uint8Array.from([...utils.arrayify(hashes[offset + i]), ...utils.arrayify(hashes[offset + i + 1])])
            hashes.push(utils.keccak256(array))
        }
        offset += length
        length /= 2
    }

    return hashes
}

function verify(leaf: string, root: string, proof: string[]) {
    let hash = utils.keccak256(utils.toUtf8Bytes(leaf))

    for (let i = 0; i < proof.length; i++) {
        hash = utils.keccak256(Uint8Array.from([...utils.arrayify(hash), ...utils.arrayify(proof[i])]))
    }

    return hash === root
}

let tree = createTree(["salut", "toi", "c'est", "moi", "et"])

console.log('tree :', tree)
console.log(verify("salut", tree[tree.length - 1], ["0xa0057ef29cc215d2dbacc6c77ce4b2fdf282d5dd0ae313de4b55a5163957707e",
"0x340135d068356183ba2c1d760a4781fcb4bf2018d0d7a398e5499c16b201ed8c",
"0x589669b0b47fc86d69d388081745420197ef7d306defde6932e1b54206507619"
]))





