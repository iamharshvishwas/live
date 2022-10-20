let express = require("express");
let app = express();
let dotenv = require("dotenv");
dotenv.config();
let morgan = require("morgan");
let fs = require("fs");
let port = process.env.PORT || 1710;
let cors = require("cors");
let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let mongoUrl =
  "mongodb+srv://admin:harsh007@cluster0.ykqm7qr.mongodb.net/amazon?retryWrites=true&w=majority";
let bodyParser = require("body-parser");
let db;

app.use(morgan("tiny", { stream: fs.createWriteStream("./app.logs") }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is From Express World");
});

//for Categories

app.get("/categories", (req, res) => {
  db.collection("categories")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

//for Fashion

app.get("/fashion", (req, res) => {
  db.collection("fashion")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

//for Mobile
app.get("/mobile", (req, res) => {
  db.collection("mobile")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

//for gaming
app.get("/gaming", (req, res) => {
  db.collection("gaming")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

//for books
app.get("/books", (req, res) => {
  db.collection("books")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

//for health
app.get("/health", (req, res) => {
  db.collection("health")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  // res.send("This is Home Page");
});

// list of products
app.get("/products", (req, res) => {
  let query = {};
  // let stateId = Number(req.query.stateId);
  // let mealId = Number(req.query.mealId);
  let bestseller_id = Number(req.query.bestseller_id);
  if (bestseller_id) {
    query = { bestseller_id: bestseller_id };
    // } else if (bestseller_id) {
    //   query = { "mealTypes.mealtype_id": bestseller_id };
  }
  db.collection("products")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/filter/:cost", (req, res) => {
  let query = {};
  let cost = Number(req.params.cost);
  let lPrice = Number(req.query.lPrice);
  let hPrice = Number(req.query.hPrice);
  let sortPrice = req.query.sortPrice;
  let sratings = req.query.sratings;
  let sort = { Price: 1 };
  if (req.query.sort) {
    sort = {
      Price: req.query.sort,
    };
  } else if (sratings) {
    sort = { ratings: sratings };
  }

  if (cost && lPrice && hPrice) {
    query = {
      cost: cost,
      // subcategory_id: subcategoryId,
      $and: [{ Price: { $gt: lPrice, $lt: hPrice } }],
    };
  }

  db.collection("products")
    .find(query)
    .sort(sort)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//products details
app.get("/details/:id", (req, res) => {
  // let id = mongo.ObjectId(req.params.id);
  let id = Number(req.params.id);
  db.collection("products")
    .find({ product_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/placeOrder", (req, res) => {
  console.log(req.body);
  db.collection("orders").insert(req.body, (err, result) => {
    if (err) throw err;
    res.send("Order Placed");
  });
});
// //brands details
// app.get("/Brand/:id", (req, res) => {
//   let id = Number(req.params.id);
//   db.collection("Brand")
//     .find({ product_id: id })
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

// orders

app.get("/orders", (req, res) => {
  let query = {};
  let email = req.query.email;

  if (email) {
    query = { email: email };
  }
  db.collection("orders")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// //Post requesst
app.post("/Item", (req, res) => {
  if (Array.isArray(req.body.product_id)) {
    db.collection("products")
      .find({ product_id: { $in: req.body.product_id } })
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  } else {
    res.send("Inavlid Input");
  }
});

app.put("/updateOrder/:id", (req, res) => {
  let oid = Number(req.params.id);
  db.collection("orders").updateOne(
    { orderId: oid },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("Order Updated");
    }
  );
});

app.delete("/deleteOrder/:id", (req, res) => {
  let _id = mongo.ObjectId(req.params.id);
  db.collection("orders").deleteOne({ _id }, (err, result) => {
    if (err) throw err;
    res.send("Order Deleted");
  });
});

// Post requesst
// app.post("/items", (req, res) => {
//   if (Array.isArray(req.body.productId)) {
//     db.collection("products")
//       .find({ product_id: { $in: req.body.productId } })
//       .toArray((err, result) => {
//         if (err) throw err;
//         res.send(result);
//       });
//   } else {
//     res.send("invalid input");
//   }
// });

// subcategory filter wrt category

// app.get("/filter/:category", (req, res) => {
//   let query = {};
//   let category = Number(req.params.category);
//   // let subcategoryId = Number(req.query.subcategoryId);
//   let lprice = Number(req.query.lprice);
//   let hprice = Number(req.query.hprice);
//   let sortprice = req.query.sortprice;
//   let sratings = req.query.sratings;
//   let sort = {};
//   if (sortprice) {
//     sort = {
//       new_price: sortprice,
//     };
//   } else if (sratings) {
//     sort = { ratings: sratings };
//   }

//   if (category && lprice && hprice) {
//     query = {
//       category: category,
//       // subcategory_id: subcategoryId,
//       $and: [{ new_price: { $gt: lprice, $lt: hprice } }],
//     };
//     // } else if (subcategoryId) {
//     //   query = {
//     //     category_id: categoryId,
//     //     subcategory_id: subcategoryId,
//     //   };
//     // } else if (lprice && hprice) {
//     //   query = {
//     //     category: category,

//     //     $and: [{ new_price: { $gt: lprice, $lt: hprice } }],
//     //   };
//   }

//   db.collection("products")
//     .find(query)
//     .sort(sort)
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

// // for products

// app.get("/products", (req, res) => {
//   db.collection("products")
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
//   // res.send("This is Home Page");
// });

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(`Erroe while connecting`);
  db = client.db("products");
  app.listen(port, () => {
    console.log(`Listing to port ${port}`);
  });
});
