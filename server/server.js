const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const { request, response } = require("express");
app.use(express.json());
app.use(cors());

let userDataBase = [];

app.get("/get-data", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: userDataBase,
  });
});

app.post("/create-data", (request, response) => {
  userDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ line 21 ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
  // console.log("userDataBase>>>>>>>>", userDataBase)
});

app.put("/update-data:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 33 ~ app.put ~ request.body", request.body);
  const id = request.body.id;
  let userItem = userDataBase.findIndex((user) => user.id === id);
  // userDataBase[userItem] = request.body
  userDataBase.splice(userItem, 1, request.body); 
  // userDataBase.push(result);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
  console.log("userItem>>>>>>>>", userItem)
});


app.delete("/delete-data:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 48 ~ app.delete ~ request.body", request);
  const id1 = request.params.id.slice(1);
  let userItem = userDataBase.findIndex((user) => user.id === Number(id1));
  userDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });
  // console.log ("........", response)

});

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Start server on  http://localhost:${PORT} !`);
});
