const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,  '../public'))

const app = express();

//Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine  and vires location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aadarsha"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Aadarsha",
    title: "About Me "
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is help message from app.js file.",
    title: "Help",
    name: "Aadarsha"
  });
});



app.get("/weather", (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "You must provide adderess to search the  weather"
    });
    
  } else {
    //Prints latitude and longitude from given location (name)
    geoCode(req.query.address, (error, data) => {
        if(error) {
            return res.send({
                error : error
            })
        }   else {
            const {latitude, longitude, location} = data;

            // Prints weather from given latitude and longitude
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error : error
                    })
                    
                }   else {
                    res.send({
                        location : location,
                        forecast : forecastData,
                        address: req.query.address
                    })
                }

            })
        }
    })
  }

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide the search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    title: "Error Message",
    name: "Aadarsha"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "404 Page Not Found",
    title: "Error Message",
    name: "Aadarsha"
  });
});

// app.get('/', (req, res) => {
//     res.send('<h1>Home Page</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         "name" : 'Adarsha',
//         "age" : 20
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About Page</h1>')
// })

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

//app.com
