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

    static decompile = (text) => {
        let value = '';
        let foundBrackets = 0;
        let i = 0;
        while (foundBrackets < 2) {
            if (text[i] === '(' || text[i] === ')') {
                foundBrackets += 1;
            } else {
                value += text[i];
            }
            i += 1;
        }
        let leftText = '';
        let rightText;
        if (text[i - 1] !== ')') {
            leftText = '(';
            let count = 1;
            while (count > 0 && text[i]) {
                leftText += text[i];
                if (text[i] === '(') {
                    count += 1;
                } else if (text[i] === ')') {
                    count -= 1;
                }
                i += 1;
            }
            if (text[i] === '(') {
                rightText = text.slice(i, text.length - 1);
            }
        }

        const res = value.length ? new TreeNode(+value) : null;
        if (leftText) {
            res.left = TreeNode.decompile(leftText);
            if (rightText) {
                res.right = TreeNode.decompile(rightText);
            }
        }
        return res;
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

    static decompile = (arr) => {
        arr = JSON.parse(arr);
        if (!arr.length) {
            return null;
        }
        arr.reverse();
        const head = new LinkedList(arr.pop());
        let current = head;
        while (arr.length) {
            current.next = new LinkedList(arr.pop());
            current = current.next;
        }

        return head;
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
