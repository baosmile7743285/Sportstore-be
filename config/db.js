const MongoClient = require("mongodb").MongoClient;
// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const PROD_URI =
  "mongodb+srv://baosmile:baosmile1@cluster0-xxukf.mongodb.net/sportStore?retryWrites=true&w=majority";
// const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"
var db = { production: {} };

const connect = (url) => {
  return MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then((client) => client.db());
};
// function connect(url) {
//   return MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(client => client.db())
// }
exports.initdb = async function () {
  let database = await connect(PROD_URI);
  db.production = database;
};
exports.db = db;
