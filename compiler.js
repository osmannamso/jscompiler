const {
    TreeNode, ArrayType, LinkedList
} = require('./models');
const { ERRORS } = require('./values');

const APP_TYPES = {
    str: 'String',
    int: 'Number',
    tree: 'TreeNode',
    array: 'Array',
    linkedList: 'LinkedList'
};

let solution;

function compileResult(code, type, params) {
    eval(code);
    let compiled = {
        value: null
    };
    const res = solution.apply({}, params);
    if (APP_TYPES[type] !== res.constructor.name) {
        throw ERRORS.TypeMismatchError;
    }
    switch (res.constructor.name) {
        case 'TreeNode':
            compiled.value = TreeNode.compile(res);
            break;
        case 'Array':
            compiled.value = ArrayType.compile(res);
            break;
        case 'LinkedList':
            compiled.value = LinkedList.compile(res);
            break;
        case 'String':
            compiled.value = res;
            break;
        case 'Number':
            compiled.value = res;
            break;
    }

    return compiled;
}

exports.compileResult = compileResult;
