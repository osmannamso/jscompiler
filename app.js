const { compileResult, APP_TYPES } = require('./compiler');

const { ERRORS } = require('./values');
const {
    TreeNode,
    LinkedList
} = require('./models');
const APP_PORT = 3000;

const express = require('express');
const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))
app.listen(APP_PORT, () => {
    console.log(`App running on ${APP_PORT} port`);
});

app.post('/compile', (req, res) => {
    try {
        res.json(compileResult(req.body.code, req.body.type, req.body.params));
    } catch (e) {
        switch (e) {
            case ERRORS.TypeMismatchError:
                res.status(409).send({
                    error: ERRORS.TypeMismatchError
                });
                break;
            case ERRORS.InfinityError:
                res.status(409).send({
                    error: ERRORS.InfinityError
                });
                break;
            case ERRORS.TypeIsntSupported:
                res.status(409).send({
                    error: ERRORS.TypeIsntSupported
                });
                break;
            default:
                console.log('error', e);
                res.status(500).send(e);
                break;
        }
    }
});

app.post('/check-decompile', (req, res) => {
    try {
        switch (APP_TYPES[req.body.type]) {
            case APP_TYPES.tree:
                res.json(TreeNode.compile(TreeNode.decompile(req.body.param)));
                break;
            case APP_TYPES.linkedList:
                res.json(LinkedList.compile(LinkedList.decompile(req.body.param)));
                break;
            default:
                res.status(500).send(e);
                break;
        }
    } catch (e) {
        console.log('error', e);
        res.status(500).send(e);
    }
});
