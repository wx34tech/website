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

//接入NTP服务器
const dgram = require('dgram');

function getNetworkTime(ntpServer = "ntp.tuna.tsinghua.edu.cn", port = 123) {
    return new Promise((resolve, reject) => {
        const client = dgram.createSocket('udp4');
        const message = Buffer.alloc(48);

        // 设置 NTP 报文的第一个字节，表示 NTP 版本号（3 或 4）和客户端模式（3）
        message[0] = 0x1B;

        client.send(message, 0, message.length, port, ntpServer, (err) => {
            if (err) {
                reject("发送 NTP 请求失败: " + err);
                client.close();
            }
        });

        client.on('message', (msg) => {
            const timestamp = msg.readUInt32BE(40); // 从字节 40 读取 NTP 时间戳（秒）
            const ntpEpoch = 2208988800; // NTP 时间起点 (1970-01-01 UTC 对应的 NTP 时间)
            const unixTime = timestamp - ntpEpoch; // 转换为 Unix 时间戳
            const date = new Date(unixTime * 1000);

            resolve(date);
            client.close();
        });

        client.on('error', (err) => {
            reject("NTP 请求失败: " + err);
            client.close();
        });
    });
}

// 调用示例
getNetworkTime().then(time => {
    console.log("当前网络时间:", time);
}).catch(err => {
    console.error(err);
});

