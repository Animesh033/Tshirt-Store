const Category = require("../models/category");
const formidable = require("formidable");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "No category found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = function (req, res) {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  // }

  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(404).json({
        error: "Not able to save category in DB",
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "No categories found in DB",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const form = formidable({});

  //   form.parse(req, (err, fields, files) => {
  //     if (err) {
  //       next(err);
  //       return;
  //     }
  //     res.json({ fields, files });
  //   });

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(404).json({
        err: "Problem with image",
      });
    }

    //Updation code
    let category = req.category;
    category = Object.assign(category, fields);

    //save to the db
    category.save((err, category) => {
      if (err) {
        return res.status(404).json({
          err: "Updation of category failed",
        });
      }
      res.json(category);
    });
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: `Successfully deleted the {$category.name}`,
    });
  });
};
