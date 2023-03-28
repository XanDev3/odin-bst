const Node = (data, left = null, right = null) => {
  return {
    data: data,
    leftChild: left,
    rightChild: right
  }
}

const Tree = array => {
  //first sort array and remove duplicates by making it into a Set
  const uniqueArray = [...new Set(array.sort((a, b) => a - b))]
  return { root: buildTree(uniqueArray) }
}

const buildTree = (array, start = 0, end = array.length - 1) => {
  let mid = parseInt((start + end) / 2)
  let root = Node(array[mid])
  if (start > end) return null

  root.leftChild = buildTree(array, start, mid - 1)
  root.rightChild = buildTree(array, mid + 1, end)

  return root
}

//Pretty Print function provided by Odin Assignment
const prettyPrint = (rootNode, prefix = '', isLeft = true) => {
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

let tree = Tree([3, 1, 69, 5, 24, 5, 6, 9, 5])
prettyPrint(tree.root)
//console.log(tree)
