const Item = require("../Models/Item");
const path = require("path");
const User = require("../Models/User");
const fs = require("fs");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'shopimagesho',
  api_key: '557695771595216',
  api_secret: process.env.api_secret
});
/**
 * Display all items
 */

module.exports.Items = async (req, res) => {
  let lastIndex = req.params.id;
  if (lastIndex) {
    console.log("here");
    Item.find({ _id: { $gt: lastIndex } })
      .limit(4)
      .then((d) => {
        res.json(d);
      });
  } else {
    const firstItems = await Item.find().limit(4);
    res.json(firstItems);
  }
};
/**
 * Adding item to the current logged in user
 */
module.exports.addItem = async (req, res) => {
  let { username } = req.user;
  req.body.Owner = username;
  let item = new Item(req.body);
  let image = req.files.image;
  let imageLink = path.join("./tmp/", image.name)
  console.log(imageLink)
  image.mv(imageLink, (err) => {
    if (err) {
      console.log('Erro ', err)
      return
    }
    cloudinary.uploader.upload(imageLink, function (error, result) {
      item.Image = result.url;
      item.save();
      req.user.Items.push(item);
      req.user.save();
      try {
        fs.unlinkSync(imageLink)
      } catch (e) {

      }
      res.json({ success: true })
    });
  });

};

/**
 * displaying connected user items
 */

module.exports.myItems = async (req, res) => {
  let items = await User.findById(req.user._id)
    .populate("Items")
    .select("Items");

  res.json(items);
};

/**
 * Basic item search by product name
 */

module.exports.SearchItem = async (req, res) => {
  const { query } = req.body;
  let items = await Item.find({
    ProductName: { $regex: `^${query}`, $options: "i" },
  });

  res.json(items);
};

/**
 * Removing an item
 */
module.exports.DeleteItem = async (req, res) => {
  let id = req.params.id;
  let item = await Item.findById(id);

  if (item == null) {
    res.send("Item not found");
    return;
  }
  //Logged in user is the item owner ?
  if (item.Owner === req.user.username) {
    fs.unlink(path.join(__dirname, "../", "public", item.Image), (err) => {
      if (err) console.log(err);
    });
    item.remove();
    item.save();
    await User.updateOne({ _id: req.user._id }, { $pull: { Items: id } });

    res.send("Deleted");
  } else {
    res.send("Unauthorized");
  }
};
