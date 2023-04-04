import { Tree, Node } from './app.js'

//Pretty Print function provided by Odin Assignment
export const prettyPrint = (rootNode, prefix = '', isLeft = true) => {
  if (rootNode === null) {
    return
  }
  if (rootNode.rightChild !== null) {
    prettyPrint(
      rootNode.rightChild,
      `${prefix}${isLeft ? '│   ' : '    '}`,
      false
    )
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${rootNode.data}`)
  if (rootNode.leftChild !== null) {
    prettyPrint(
      rootNode.leftChild,
      `${prefix}${isLeft ? '    ' : '│   '}`,
      true
    )
  }
}

const createRandArr = () => {
  //pick a random size array between 1 and 20
  const size = Math.floor(Math.random() * 20) + 1
  let arr = Array.from(
    { length: size },
    () => Math.floor(Math.random() * 100) + 1
  )
  console.log(`new random number array: ${arr}`)
  return arr
}

let tree = Tree(createRandArr())
prettyPrint(tree.treeRoot)
console.log('tree is balanced: ')
console.log(tree.isBalanced())
console.log(' ')
console.log('levelOrder: ')
console.log(tree.levelOrder())
console.log('preOrder: ')
console.log(tree.preOrder())
console.log('postOrder: ')
console.log(tree.postOrder())
console.log('inOrder: ')
console.log(tree.inOrder())
console.log('inserting new nodes')
tree.insertNode(101)
tree.insertNode(151)
tree.insertNode(189)
tree.insertNode(143)
console.log(' ')
console.log('tree is balanced: ')
console.log(tree.isBalanced())
console.log(' ')
console.log('Rebalancing tree: ')
tree = tree.reBalance()
prettyPrint(tree.treeRoot)
console.log('tree is balanced: ')
console.log(tree.isBalanced())
console.log('levelOrder: ')
console.log(tree.levelOrder())
console.log('preOrder: ')
console.log(tree.preOrder())
console.log('postOrder: ')
console.log(tree.postOrder())
console.log('inOrder: ')
console.log(tree.inOrder())
