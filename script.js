class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  root = null;

  sortAndRemoveDuplicates(array) {
    return [...new Set([...array.sort((a, b) => a - b)])];
  }

  buildTree(array) {

    //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let arraySorted = this.sortAndRemoveDuplicates(array);
    let build = (array) => {
      if (array.length === 0) return null;

      let midIndex = Math.floor(array.length / 2);
      let leftArray = array.slice(0, midIndex);
      let rightArray = array.slice(midIndex + 1);

      let node = new Node(array[midIndex]);
      node.left = build(leftArray);
      node.right = build(rightArray);

      this.root = node;
      return node;
    };

    return build(arraySorted);
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }


    return node;
  }

  delete(value, root = this.root) {
    // Base case
    if (root === null) {
      return root;
    }

    // Traverse down the tree
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    }

    // Value matches -> delete node and update pointers
    else {
      // option 1: root(child) has only one child
      if (root.left === null) {
        // return the child's right so new parent can point to it
        return root.right;
      } else if (root.right === null) {
        // return child's left so new parent can point to it
        return root.left;
      }
      // option 2: Node has two children
      else {
        // Replace node with next smallest value
        const minData = function findNextSmallestRightData(root) {
          let min = root.data;
          let newRoot = root;

          // Search for a left node with no left children.
          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }

          return min;
        };

        root.data = minData(root.right);

        // Delete the copied node from minData()
        root.right = this.delete(root.data, root.right);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root.data === value) return root;

    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
  }

  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Parameter is not a function");

    if (this.root === null) return;

    let queue = [this.root];

    while (queue.length) {
      let current = queue.shift();
      callback(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  levelOrderRecursive(root = [this.root]) {
    if (root.length === 0) return;
    let currentNodes = [];
    for (let i = 0; i < root.length; i++) {
      if (root[i].left) {
        currentNodes.push(root[i].left);
      }
      if (root[i].right) {
        currentNodes.push(root[i].right);
      }
      this.levelOrderRecursive(currentNodes);
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) return;

    if (typeof callback !== "function")
      throw new Error("Parameter is not a function");

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (root === null) return;

    if (typeof callback !== "function")
      throw new Error("Parameter is not a function");

    callback(root);

    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (root === null) return;

    if (typeof callback !== "function")
      throw new Error("Parameter is not a function");

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);

    callback(root);
  }

  height(node = this.root) {
    if (node === null) return 0;
    if (node.left === null && node.righ === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }


  depth(node) {
    return this.height() = this.height(node);
  }

  isBalanced(){
    if(this.root === null){
      return null
    }

    const balance = this.height(this.root.left) - this.height(this.root.right)

    console.log(Math.abs(balance <= 1));

    return Math.abs(balance) <= 1;
  }

  rebalance(){
    let array = []

    function pushValues(node){
      array.push(node.data)
    }
    this.inOrder(pushValues)
    console.log(array);
    this.root = this.buildTree(array)
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}


function createTestArray(size){
  let array = []
  for(let i = 0; i <=size; i++){
    array.push(Math.floor(Math.random() * 100))
  }
  return array
}

function driver(){

  let testArray = createTestArray(20)
  let tree = new Tree()
  tree.buildTree(testArray)
  console.log(tree.isBalanced());

  tree.insert(101);
  tree.insert(102);
  tree.insert(103);

  console.log(tree.isBalanced());

  tree.rebalance()

  console.log(tree.isBalanced());

}


driver()