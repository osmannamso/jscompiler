const { compileResult } = require('./compiler');

const { ERRORS } = require('./values');
const APP_PORT = 3000;

const express = require('express');
const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.listen(APP_PORT, () => {
    console.log(`App running on ${APP_PORT} port`);
});

app.post('/compile', (req, res, next) => {
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
            default:
                console.log('error', e);
                res.status(500).send(e);
                break;
        }
    }
});
