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

app.post('/getMp3', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        // const output = await youtubedl(url, {
        //     dumpSingleJson: true,
        //     noCheckCertificates: true,
        //     noWarnings: true,
        //     preferFreeFormats: true,
        //     addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        // });
        // res.json(output);
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
          })

          const result = {
            "title": output.title,
            "url": output.requested_formats[1].url,
        };
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching video info', error);
        res.status(500).json({ error: 'Error fetching video info' });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("index.js")
});
