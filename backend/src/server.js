import {express,session, path, bodyParser} from "./deps.js";
import { connectToDatabase } from "../database/databaseConnection.js";
import routes from "../routes/routes.js";
const app = express()
const port = 3001

//set views to be fetched from frontend/views and use .ejs files
app.use(session({
  secret: 'super_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true for https
}));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use("/", routes);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToDatabase();