# Binary Search Tree (bst)

Also called an ordered or sorted binary tree, is where you take a group of data and turn them into a tree full of nodes where each left node is "lower" (dimensionally) than each right node. This tree starts at the "root node" and any node without children is called a "leaf node"

# [Build a Balanced BST](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

In this project we are to build a Balanced BST (since an unbalanced tree can lead to degeneration, so that lookup performance is deteriorated to that of linear search) from a sorted array, making sure to remove any possible duplicates in the array or tree.

Checking our BBST

Write a simple driver script that does the following:
    1. Create a binary search tree from an array of random numbers. You can create a function that returns an array of random numbers every time you call it, if you wish.
    2. Confirm that the tree is balanced by calling `isBalanced`
    3. Print out all elements in level, pre, post, and in order
    4. Unbalance the tree by adding several numbers > 100
    5. Confirm that the tree is unbalanced by calling `isBalanced`
    6. Balance the tree by calling `rebalance`
    7. Confirm that the tree is balanced by calling `isBalanced`
    8. Print out all elements in level, pre, post, and in order
