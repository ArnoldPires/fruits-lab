const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const methodOverride = require('method-override');

dotenv.config();

const Fruit = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const Vegetable = require("./models/vegetables.js"); // Import the vegetables array

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use((req, res, next) => {
  console.log('Run all the routes');
  next();
});

app.use(methodOverride('_method'));

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// Tell express to use the middleware
app.use(express.urlencoded({extended:false}));

/*
Fruits
*/

app.get("/fruits/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {fruits: fruits});
  } catch(error) {
    console.error(error);
  }
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});

app.post('/fruits', async (req, res) => {
  try {
    let readyToEat = false;
    if (req.body.readyToEat === 'on') {
      readyToEat = true;
    }

    const newFruit = new Fruit({
      name: req.body.name,
      color: req.body.color,
      readyToEat: readyToEat,
    });

    await newFruit.save();
    res.redirect('/fruits');
  } catch (error) {
    console.log(error);
  }
});

app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {fruits: fruits});
  } catch(error) {
    console.error(error);
  }
});

// Update Fruit in MongoDB and redirect to fruit's show page
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true
    } else {
      req.body.readyToEat = false
    }
    await Fruit.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/fruits")
  } catch(error) {
    console.log(error)
  }
})

// Delete Fruits
app.delete('/fruits/:id', async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect('/fruits');
  } catch (error) {
    console.error(error);
  }
});

// Edit Fruits
app.get('/fruits/:id/Edit', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render('fruits/Edit', {
      fruit: foundFruit
    });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message});
  }
})

/*
Vegetables
*/

app.get("/vegetables", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", {vegetables: vegetables});
  } catch(error) {
    console.error(error);
  }
});

app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New');
});

app.post('/vegetables', async (req, res) => {
  try {
    let readyToEat = false;
    if (req.body.readyToEat === 'on') {
      readyToEat = true;
    }
    const newVegetable = new Vegetable({
      name: req.body.name,
      color: req.body.color,
      readyToEat: readyToEat,
    });
    await newVegetable.save();
    res.redirect('/vegetables');
  } catch (error) {
    console.log(error);
  }
});

app.put("/vegetables/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Vegetable.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/vegetables");
  } catch(error) {
    console.log(error)
  }
})

// Delete vegetables
app.delete('/vegetables/:id', async (req, res) => {
  try {
    await Vegetable.findByIdAndDelete(req.params.id);
    res.redirect('/vegetables');
  } catch (error) {
    console.error(error);
  }
});

app.get('/vegetables/:id/Edit', async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render('vegetables/Edit', {
      vegetable: foundVegetable
    });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

app.get("/vegetables/:id", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Show", {vegetable: vegetable})
  } catch(error) {
    console.log(error)
  }
});

//add show route
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {fruit: fruit})
  } catch(error) {
    console.log(error)
  }
});

mongoose.connection.once('open', ()=> {
  console.log('connected to mongo');
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening to port 3000");
});