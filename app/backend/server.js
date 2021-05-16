const express = require("express");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", 
    "Access-Control-Allow-Headers, Origin,Accept,x-auth-token, X-Requested-With,x-client-key, x-client-token, x-client-secret, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    // res.headers("accept-encoding': 'gzip', accept: '*/*") 

    next();
  });
  // app.use(queryValidator(invalidParamHandler));

connectDB();
app.use(express.json());
app.use("/authentification", require("./routes/authentification"));
app.use("/users", require("./routes/users"));
app.use("/publications", require("./routes/publications"));
app.use("/messages", require("./routes/messages"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
