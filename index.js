const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

const corsOptions = {
    origin: 'https://www.merttaylan.dev/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/getMp4', (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const command = `youtube-dl ${url} --dump-single-json --no-check-certificates --no-warnings --prefer-free-formats --add-header referer:youtube.com --add-header user-agent:googlebot`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error fetching video info', error);
            return res.status(500).json({ error: 'Error fetching video info' });
        }

        try {
            const output = JSON.parse(stdout);
            res.json(output);
        } catch (parseError) {
            console.error('Error parsing video info', parseError);
            res.status(500).json({ error: 'Error parsing video info' });
        }
    });
});

const PORT = process.env.PORT || 10000;

exec('python --version', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error fetching Python version: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Python version stderr: ${stderr}`);
        return;
    }
    console.log(`Python version: ${stdout.trim()}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
