const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const botToken = "6467130261:AAF7iAaqrPhgDJm7NkZGIhxgGPQ41s4jwOw";
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

app.use(bodyParser.json());

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
