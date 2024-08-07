

/*
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const app = express();

const corsOptions = {
    origin: 'https://www.merttaylan.dev/',
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
        const info = await ytdl.getInfo(url);

        // Filter formats to find the MP4 format with both audio and video
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: format => format.container === 'mp4' && format.hasVideo && format.hasAudio });

        if (!format) {
            return res.status(404).json({ error: 'MP4 format not found' });
        }

        // Log the chosen format for debugging
        console.log('Chosen format:', format);

        // Set headers to allow download
        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

        // Handle the streaming response with additional request headers
        const stream = ytdl(url, {
            format,
            requestOptions: {
                headers: {
                    'Referer': 'https://www.youtube.com',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            }
        });

        stream.pipe(res);

        stream.on('end', () => {
            console.log('Streaming finished');
        });

        stream.on('error', (error) => {
            console.error('Error streaming video:', error);
            if (error.statusCode === 410) {
                res.status(410).json({ error: 'Video link has expired' });
            } else {
                res.status(500).json({ error: 'Error streaming video' });
            }
        });

    } catch (error) {
        console.error('Error fetching video info', error);
        res.status(500).json({ error: 'Error fetching video info' });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("test.js")

});
*/