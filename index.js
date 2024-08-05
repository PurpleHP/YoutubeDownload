const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const youtubedl = require('youtube-dl-exec');
const app = express();

app.use(cors());
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
        res.json(output);
    } catch (error) {
        console.error('Error fetching video info', error);
        res.status(500).json({ error: 'Error fetching video info' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});