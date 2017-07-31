const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    res.send(randomAnswer());
});

app.listen(3000, function() {
    console.log('Example test app listening on port 3000!')
});

function randomAnswer() {
    const res = {
        status: ''
    };

    const rand = Math.floor(Math.random() * 3) + 1;

    if (rand === 1)
        res.status = 'success';
    else if (rand === 2) {
        res.status = 'error';
        res.reason = 'This user is not enabled';
    } else if (rand === 3) {
        res.status = 'progress';
        res.timeout = (Math.floor(Math.random() * 5) + 1) * 1000;
    }

    return res;
}
