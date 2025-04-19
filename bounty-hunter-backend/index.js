import cors from "cors";
import supertokens from "supertokens-node";
// import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware } from "supertokens-node/framework/express";
// import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "./lib/authConfig.js";

supertokens.init(SuperTokensConfig);

const express = require('express');
const app = express();

app.use(
  cors({
      origin: getWebsiteDomain(),
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      methods: ["GET", "PUT", "POST", "DELETE"],
      credentials: true,
  })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

const bodyParser = require('body-parser');

const bounty = require('./routes/bounty');
const hunter = require('./routes/hunter');

// Middleware to parse JSON body
app.use(bodyParser.json());

app.use('/api/bounty', bounty);
app.use('/api/hunter', hunter);

// In case of session related errors, this error handler
// returns 401 to the client.
// app.use(errorHandler());

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
