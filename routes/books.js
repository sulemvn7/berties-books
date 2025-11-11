// Create a new router
const express = require("express");
const router = express.Router();

// Search Route
router.get('/search', function(req, res, next){
    res.render("search.ejs");
});

router.get('/search-result', function (req, res, next) {
    res.send("You searched for: " + req.query.keyword);
});

// Book Display Route
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("list.ejs", { availableBooks: result });
    });
});

// Display the Add Book form
router.get('/addbook', function(req, res, next) {
    res.render('addbook.ejs');
});

// POST route to save the new book
router.post('/bookadded', function (req, res, next) {
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) return next(err);
        res.send('✅ This book has been added to the database.<br>Name: ' 
                 + req.body.name + '<br>Price: £' + Number(req.body.price).toFixed(2));
    });
});

// Export the router
module.exports = router;
