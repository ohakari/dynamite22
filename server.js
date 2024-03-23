const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const botToken = "6467130261:AAF7iAaqrPhgDJm7NkZGIhxgGPQ41s4jwOw";
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5000'); // Change "*" if needed
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    next();
});

app.get("/", (req, res) => {
  res.redirect("https://discord.com/app");
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log(data);

  // Обработайте данные и сформируйте ответ
  const response = {
    success: true,
    message: 'Данные успешно получены'
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
