// I faced an error here with nodemon - permission disabled krke aya tha kuch toh uske lie 
// windows powershell ko run as administrator me khol ke "Set-ExecutionPolicy RemoteSigned" ye command chalaya tha  

const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require("./db");
// const { Next } = require('react-bootstrap/esm/PageItem');
mongoDB();
app.use(cors({
  origin: '*'
}));

app.use(cors({
  methods:['GET','POST','PUT','DELETE']
}));


//we did this because of CORS error coming when we were trying to submit a form
app.use((req, res, next)=> {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Auhtorization"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//needed for hitting apis
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/myorderData"));
app.use('/api', require("./Routes/GroceryRoute"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})