const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

// 限流：每个IP每分钟60次
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { code: 429, message: "请求过于频繁" }
});

app.post('/api/v1/chat', limiter, async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: req.body.message }],
        temperature: req.body.temperature || 0.7,
        max_tokens: req.body.max_tokens || 300
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      code: 200,
      {
        id: response.data.id,
        content: response.data.choices[0].message.content,
        usage: response.data.usage
      }
    });
  } catch (error) {
    handleError(error, res);
  }
});

function handleError(error, res) {
  const statusCode = error.response?.status || 500;
  const message = error.response?.data?.error?.message || "服务器内部错误";
  res.status(statusCode).json({ code: statusCode, message });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务运行在端口 ${PORT}`);
});
