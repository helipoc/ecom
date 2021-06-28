const User = require("../Models/User");
const Item = require("../Models/Item");

/**
 * Adding an item to your cart
 */

module.exports.AddToCart = (req, res) => {
  const { itemId } = req.body;
  req.user.Cart.push(itemId);
  req.user.save();
  res.send("Done");
};

/**
 * Remoce item from card
 */

module.exports.RemoveFromCart = async ({ user, body: { itemId } }, res) => {
  user.Cart.pull(itemId);
  user.save();
  res.send("done");
};

/**
 * buying an item
 */

module.exports.Buy = async (req, res) => {
  let user = await User.findById(req.user._id);
  user.populate("Cart", (err, { Cart }) => {
    let total = Cart.reduce((a, c) => a + c.Price, 0);
    if (user.Balance >= total) {
      user.Balance -= total;
      user.Cart = [];
      user.save();
      res.json({ success: true });
      return;
    }
    res.json({ success: false, msg: "Not enough Balance" });
  });
};

/**
* User cart items
*/
module.exports.MyCart = (req,res)=>{

req.user.populate("Cart",(err,{Cart}) => {

res.send(Cart)

})

}
