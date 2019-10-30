// ライブラリ読み込み
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

app.get("/api/v1/color", function(req, res) {
  res.json({
    color: "green"
  });
});

app.get("/health", function(req, res) {
  res.json({
    health: "ok"
  });
});


app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
