const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
app.use(cors())

const app = express();

const url = "https://www.theguardian.com/international";

// app.METHOD(PATH, HANDLER)

app.get("/", function (req, res) {
  res.json("Welcome to my web Scraper");
});

app.get("/results", (req, res) => {
  axios(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    res.json(articles);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
