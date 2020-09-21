var Book = require("../models/book").Book;
var path = require("path");

module.exports = function (app) {
  app.get("/book", function (req, res) {
    Book.find({}, function (err, books) {
      if (err) return res.send(err);

      res.json(books);
    });
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
  });

  app.get("/book/:id", function (req, res) {
    Book.find({ _id: req.params.id }, function (err, book) {
      if (err) return res.send(err);

      res.json(book);
    });
  });

  //   app.get("/book/:slug", function (req, res) {
  //     Book.find({ slug: req.params.slug }, function (err, book) {
  //       if (err) return res.send(err);

  //       res.json(book);
  //     });
  //   });

  app.get("/add/book", function (req, res) {
    res.sendFile(path.join(__dirname, "../views", "form.html"));
  });

  app.post("/book", function (req, res) {
    var book = new Book();
    book.title = req.body.title;
    book.slug = req.body.slug;
    book.author = req.body.author;
    book.page = req.body.page;

    console.log(req.body.title);

    book.save(function (err, book) {
      if (err) return res.send(err);

      res.json({ status: "OK", data: book });
    });
  });

  app.put("/book/:id", function (req, res) {
    Book.findById(req.params.id, function (err, book) {
      if (err) return res.send(err);

      book.title = req.body.title;
      book.slug = req.body.slug;
      book.author = req.body.author;
      book.page = req.body.page;

      book.save(function (err, book) {
        if (err) return res.send(err);

        res.json({ status: "OK", data: book });
      });
    });
  });

  app.delete("/book/:id", function (req, res) {
    Book.findById(req.params.id, function (err, book) {
      if (err) return res.send(err);

      book.remove(function (err) {
        if (err) return res.send(err);

        res.json({ status: "OK" });
      });
    });
  });
};
