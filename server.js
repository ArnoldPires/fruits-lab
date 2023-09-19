const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

// Middleware
app.use((req, res, next) => {
  console.log('Run all the routes');
  next();
});

const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const vegetables = require("./models/vegetables.js"); // Import the vegetables array

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// Tell express to use the middleware
app.use(express.urlencoded({extended:false}));


/*
Fruits
*/
app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/Index", { fruits: fruits });
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});

app.post('/fruits', (req, res) => {
  if (req.body.readyToEat === 'on') { // If checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(req.body);
  res.redirect('/fruits');
});

app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  }); // renders the info using the appropriate template
});

/*
Vegetables
*/
app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

app.get("/vegetables/new/", (req, res) => {
    res.render("vegetables/New");
});

app.post("/vegetables/new/", (req, res) => {
  const newVegetable = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: req.body.readyToEat === "on",
  }
  vegetables.push(newVegetable);
  res.redirect("/vegetables/");
})

app.post('/vegetables', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true; 
  } else {
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  console.log(req.body);
  res.redirect('/vegetables');
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.indexOfVegetablesArray],
  });
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});