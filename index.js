const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const youtubedl = require('youtube-dl-exec');
const app = express();


const corsOptions = {
    origin: 'https://www.merttaylan.dev', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/getMp4', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        });

        //only send specific data
        const response = {
            title: output.title,
            url: output.url
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching video info', error);
        res.status(500).json({ error: 'Error fetching video info' });
    }
});

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


const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});