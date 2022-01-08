//import express
const express = require("express");
//import next
const next = require("next");
//import  middleware
const { createProxyMiddleware } = require("http-proxy-middleware");
// checking dev or prod
const dev = process.env.NODE_ENV !== "production";
//running next dev
const app = next({ dev });
//request handler
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // apply proxy in dev mode
    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        }),
      );
    }
    //load middleware functions at a path for all HTTP request methods
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
