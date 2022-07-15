const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// define paths for Express config
// console.log(path.join(__dirname,"../public" ));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

// set up handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath)

// setup static directories to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Gurjeet singh"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Gurjeet singh",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "how i can help you",
        title: "Help page",
        name: "Gurjeet singh",
    });
});

app.get("/weather", (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({ error: "Please provide an address" });

    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address: address,
                location: location,
                weather: forecastData
            })
        });
    });

});

app.get("/products", (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 error",
        name: "gurjeet singh",
        errorMsg: "Help article not Found"
    })
})
app.get("*", (req, res) => {
    res.render("404", {
        title: "404 error",
        name: "gurjeet singh",
        errorMsg: "page not Found"
    })
})


app.listen(3000, () => {
    console.log("listening on port 3000...");
});


// app.com => domin name

// rautes
// app.com/help
// app.com/about
// app.get("/help", (req, res) => {
//     res.send([{
//         name: "gurjeet",
//         age: 24,
//     },{
//         name: "dhillon",
//         age: 23,
//     }]);
// });


// app.get("/about", (req, res) => {
//     res.send("<h1>About the page</h1>");
// });