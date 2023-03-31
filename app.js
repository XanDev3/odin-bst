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
  let treeRoot = null
  if (uniqueArray) treeRoot = buildTree(uniqueArray)

  //function to build the tree
  function buildTree (array, start = 0, end = array.length - 1) {
    let mid = parseInt((start + end) / 2)
    let root = Node(array[mid])
    if (start > end) return null

    root.leftChild = buildTree(array, start, mid - 1)
    root.rightChild = buildTree(array, mid + 1, end)

    return root
  }

  const insertNode = (value, currentRoot = treeRoot) => {
    //base case of recursion, the current root whether the root of the Tree or a root of the branch is null so insert our value
    if (currentRoot === null) {
      currentRoot = Node(value)
      return currentRoot
    }
    //recursion down tree to find a null slot to insert value
    if (value < currentRoot.data) {
      currentRoot.leftChild = insertNode(value, currentRoot.leftChild)
    } else if (value > currentRoot.data) {
      currentRoot.rightChild = insertNode(value, currentRoot.rightChild)
    }
    return currentRoot
  }

  const deleteNode = (value, currentRoot = treeRoot) => {
    //base case of recursion, the current root whether the root of the Tree or a root of the branch is null so delete our value
    if (currentRoot === null) {
      return currentRoot
    }
    //recursion down tree to find a null slot to insert value
    if (value < currentRoot.data) {
      currentRoot.leftChild = deleteNode(value, currentRoot.leftChild)
    } else if (value > currentRoot.data) {
      currentRoot.rightChild = deleteNode(value, currentRoot.rightChild)
    } else {
      //for single children
      if (currentRoot.leftChild === null) {
        return currentRoot.rightChild
      } else if (currentRoot.rightChild === null) {
        return currentRoot.leftChild
      }
      //for nodes with multiple children, find the next smallest node to replace it (or the node to the left of the right child)
      currentRoot.data = minValue(currentRoot.rightChild)
      //then delete
      currentRoot.rightChild = deleteNode(
        currentRoot.data,
        currentRoot.rightChild
      )
    }
    return currentRoot
  }

  const minValue = root => {
    let minVal = root.data
    while (root.leftChild !== null) {
      minVal = root.leftChild.data
      root = root.leftChild
    }
    return minVal
  }

  const find = (value, currentRoot = treeRoot) => {
    //root is null or value is not found
    if (currentRoot === null) {
      return null
    }
    //value found
    if (currentRoot.data === value) {
      return currentRoot
    }
    //recurse down tree to keep searching
    if (value < currentRoot.data) {
      return find(value, currentRoot.leftChild)
    } else if (value > currentRoot.data) {
      return find(value, currentRoot.rightChild)
    }
    return currentRoot
  }
  //Use a breadth-first travesal to give each node in their levelOrder
  const levelOrder = callback => {
    if (treeRoot === null) return
    //using an array as a FIFO queue to collect all nodes before visiting their children in the next level
    let queue = [treeRoot]
    let result = []
    while (queue.length > 0) {
      let currentNode = queue.shift()
      if (currentNode.leftChild !== null) queue.push(currentNode.leftChild)
      if (currentNode.rightChild !== null) queue.push(currentNode.rightChild)
      if (callback) callback(currentNode)
      else result.push(currentNode.data)
    }
    return result
  }
  const inOrder = (callback, currentRoot = treeRoot, inOrderArr = []) => {
    if (currentRoot === null) return
    //using an array collect all nodes in the perspective order (Left,Data,Right)
    inOrder(callback, currentRoot.leftChild, inOrderArr)
    callback ? callback(currentRoot) : inOrderArr.push(currentRoot.data)
    inOrder(callback, currentRoot.rightChild, inOrderArr)
    return inOrderArr
  }
  const preOrder = (callback, currentRoot = treeRoot, inOrderArr = []) => {
    if (currentRoot === null) return
    //using an array collect all nodes in the perspective order (Data,Left,Right)
    callback ? callback(currentRoot) : inOrderArr.push(currentRoot.data)
    inOrder(callback, currentRoot.leftChild, inOrderArr)
    inOrder(callback, currentRoot.rightChild, inOrderArr)
    return inOrderArr
  }
  const postOrder = (callback , currentRoot = treeRoot, inOrderArr = [])=> {
    if (currentRoot === null) return
    //using an array collect all nodes in the perspective order (Left,Right,Data)
    inOrder(callback, currentRoot.leftChild, inOrderArr)
    inOrder(callback, currentRoot.rightChild, inOrderArr)
    callback ? callback(currentRoot) : inOrderArr.push(currentRoot.data)
    return inOrderArr
  }

  return {
    treeRoot,
    buildTree,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
  }
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
prettyPrint(tree.treeRoot)
/* console.log( */ tree.insertNode(3)
prettyPrint(tree.treeRoot)
console.log('insert 8')
tree.insertNode(8)
prettyPrint(tree.treeRoot)
console.log('delete 6')
tree.deleteNode(6)
prettyPrint(tree.treeRoot)
console.log('finding 9:')
console.log(tree.find(9))
console.log('finding 24:')
console.log(tree.find(24))
console.log(tree.levelOrder())
console.log('inOrder:')
console.log(tree.inOrder())
console.log('preOrder:')
console.log(tree.preOrder())
console.log('postOrder:')
console.log(tree.postOrder())
