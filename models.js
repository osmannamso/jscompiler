const { ERRORS } = require('./values');

class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    static compile = (treeNode) => {
        if (!treeNode) {
            return '()';
        }
        let res = treeNode.val;
        if (treeNode.left || treeNode.right) {
            res += TreeNode.compile(treeNode.left);
            res += TreeNode.compile(treeNode.right);
        }

        return `(${res})`;
    }
}

class LinkedList {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }

    static compile = (node) => {
        if (LinkedList.isValid(node)) {
            let current = node;
            let res = [];
            while (current) {
                res.push(current.val);
                current = current.next;
            }

            return `[${res.join(',')}]`;
        } else {
            throw ERRORS.InfinityError;
        }
    }

    static isValid = (node) => {
        const set = new Set();
        let current = node;
        while (current) {
            current = current.next;
            if (set.has(current)) {
                return false;
            }
            set.add(current);
        }

        return true;
    }
}

class ArrayType {
    static compile = (arr) => {
        return `[${arr.join(',')}]`;
    }
}

exports.TreeNode = TreeNode;
exports.ArrayType = ArrayType;
exports.LinkedList = LinkedList;
