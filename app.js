import {prettyPrint} from './driverScript.js';

export const Node = (data, left = null, right = null) => {
  return {
    data: data,
    leftChild: left,
    rightChild: right
  }
}

export const Tree = (array) => {
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
      let currentRoot = queue.shift()
      if (currentRoot.leftChild !== null) queue.push(currentRoot.leftChild)
      if (currentRoot.rightChild !== null) queue.push(currentRoot.rightChild)
      if (callback) callback(currentRoot)
      else result.push(currentRoot.data)
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
  const postOrder = (callback, currentRoot = treeRoot, inOrderArr = []) => {
    if (currentRoot === null) return
    //using an array collect all nodes in the perspective order (Left,Right,Data)
    inOrder(callback, currentRoot.leftChild, inOrderArr)
    inOrder(callback, currentRoot.rightChild, inOrderArr)
    callback ? callback(currentRoot) : inOrderArr.push(currentRoot.data)
    return inOrderArr
  }
  const height = node => {
    if (node === null) return -1
    const leftHeight = height(node.leftChild) + 1
    const rightHeight = height(node.rightChild) + 1
    return Math.max(leftHeight, rightHeight)
  }
  const depth = node => {
    //base case - node not found/was null to begin with or node is the beginning of the tree
    if (node === null || node === treeRoot) return 0
    let currentRoot = treeRoot
    let depthCount = 0
    //loop through all nodes until the end of the tree or node is found
    while (currentRoot !== node) {
      depthCount++
      if (node.data < currentRoot.data) {
        currentRoot = currentRoot.leftChild
      }
      if (node.data > currentRoot.data) {
        currentRoot = currentRoot.rightChild
      }
    }
    return depthCount
  }
  const isBalanced = (currentRoot = treeRoot) => {
    if (currentRoot === null) return true
    if (
      Math.abs(
        height(currentRoot.leftChild) - height(currentRoot.rightChild)
      ) <= 1 &&
      isBalanced(currentRoot.leftChild) === true &&
      isBalanced(currentRoot.rightChild) === true
    )
      return true
    else return false
  }
  const reBalance = () => {
    //used the inOrder method (could have used preOrder/postOrder as well) to extract a sorted list even though creating a new Tree will sort the list either way
    const unBalArr = inOrder()
    return (Tree(unBalArr))
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
    height,
    depth,
    isBalanced,
    reBalance
  }
}

/* let tree = Tree([3, 1, 69, 5, 24, 5, 6, 9, 5])
prettyPrint(tree.treeRoot)
console.log( tree.insertNode(3)
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
console.log('insert 10')
tree.insertNode(10)
console.log('insert 18')
tree.insertNode(18)
console.log('insert 57')
tree.insertNode(57)
prettyPrint(tree.treeRoot)
console.log(`height of ${tree.treeRoot.data}`)
console.log(tree.height(tree.treeRoot))
console.log(`height of ${tree.treeRoot.leftChild.data}`)
console.log(tree.height(tree.treeRoot.leftChild))
console.log(`height of ${tree.treeRoot.rightChild.data}`)
console.log(tree.height(tree.treeRoot.rightChild))
console.log(`depth of ${tree.treeRoot.rightChild.rightChild.data}`)
console.log(tree.depth(tree.treeRoot.rightChild.rightChild))
*/
