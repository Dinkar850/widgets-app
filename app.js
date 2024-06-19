import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import exp from "constants";
import { constants } from "buffer";
import https from "https";
import { url } from "inspector";
import joi from "joi";
import { WEATHER_API_KEY, MAILCHIMP_API_AUTH, LIST_ID } from "./apikeys.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//get

app.get("/signup", (req, res) => {
  const fileURL = path.join(__dirname, "signup.html");
  res.sendFile(fileURL);
});

app.get("/home", (req, res) => {
  const fileURL = path.join(__dirname, "index.html");
  res.sendFile(fileURL);
});

app.get("/weather", (req, res) => {
  const fileURL = path.join(__dirname, "weather.html");
  res.sendFile(fileURL);
});

app.get("/calculator", (req, res) => {
  const fileURL = path.join(__dirname, "calculator.html");
  res.sendFile(fileURL);
});

app.get("/bmi", (req, res) => {
  const fileURL = path.join(__dirname, "bmi.html");
  res.sendFile(fileURL);
});

//post

app.post("/signup", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  //posting using https:
  const url = `https://us22.api.mailchimp.com/3.0/lists/${LIST_ID}`;
  const options = {
    method: "POST",
    auth: MAILCHIMP_API_AUTH,
  };
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      const pass = JSON.parse(data);
    
      // //validating on server-side
      if (pass.error_count === 0) {
        console.log("Success!");
        console.log(`Data sent: ${jsonData}`);
        res.redirect("/home");
      } else if (pass.errors[0].error_code === "ERROR_CONTACT_EXISTS") {
        console.log("Success!");
        console.log("Account already exists");
        res.redirect("/home");
      } else if (!pass.errors[0].field) {
        console.log(pass.errors[0].error);
        res.send("Denied");
      } else {
        console.log(pass.errors[0].field + ": " + pass.errors[0].field_message);
        res.send("Denied");
      } 


    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/weather", (req, res) => {
  const city = req.body.cityName;
  const apiKey = WEATHER_API_KEY;
  const unit = `metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      if(weatherData.cod == 404) {
        res.send(`<h3 style='text-align:center'>404: City Not Found</h3><hr>`);
      }
      else{
        console.log(weatherData);
        const tmp = weatherData.main.temp;
        const img = weatherData.weather[0].icon;
        const desc = weatherData.weather[0].description;
        const imgURL = `https://openweathermap.org/img/wn/${img}@2x.png`;
        res.write(`<h1>The temperature of ${city} is ${tmp}</h1>`);
        res.write(`<h2>The current condition is ${desc} </h2>`);
        res.write(`<img src = ${imgURL}>`);
        res.send();
      } 
    });
  });
});

app.post("/calculator", (req, res) => {
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var operator = req.body.operator;
  console.log(operator);
  var ans = calculate(num1, num2, operator);
  res.send(`The result is ${ans}.`);
});

app.post("/bmi", (req, res) => {
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);
  var ans = bmi(height, weight);
  res.send(`Your BMI is ${ans}`);
});



app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("listening on port 3000");
});

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function bmi(height, weight) {
  return Math.round(weight / height ** 2);
}

//server-side validation using JOI, not needed as of now, saving for later

// const schema = joi.object({
//   firstName: joi.string().required(),
//   lastName: joi.string().required(),
//   email: joi.string().email().required(),
// });


// const validate = (req, res, next) => {
//   const { error } = schema.validate(req.body);

//   if (error) {
//     console.log(error.details[0].message);
//     return res.status(400).send("Access denied");
//   }
//   next();
// };
