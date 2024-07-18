const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/message', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });
        const reply = response.data.choices[0].text;
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
