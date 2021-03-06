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
    const res = solution.apply({}, params.map((p) => {
        switch (APP_TYPES[p.type]) {
            case APP_TYPES.tree:
                return TreeNode.decompile(p.value);
            case APP_TYPES.linkedList:
                return LinkedList.decompile(p.value);
            case APP_TYPES.int:
                return +p.value;
            case APP_TYPES.str:
                return p.value;
            case APP_TYPES.array:
                return JSON.parse(p.value);
            default:
                throw ERRORS.TypeIsntSupported;
        }
    }));
    if (APP_TYPES[type] !== res.constructor.name) {
        throw ERRORS.TypeMismatchError;
    }
    switch (res.constructor.name) {
        case APP_TYPES.tree:
            compiled.value = TreeNode.compile(res);
            break;
        case APP_TYPES.array:
            compiled.value = ArrayType.compile(res);
            break;
        case APP_TYPES.linkedList:
            compiled.value = LinkedList.compile(res);
            break;
        case APP_TYPES.str:
            compiled.value = res;
            break;
        case APP_TYPES.int:
            compiled.value = res;
            break;
    }

    return compiled;
}

exports.compileResult = compileResult;
exports.APP_TYPES = APP_TYPES;
