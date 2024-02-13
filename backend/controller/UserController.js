const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../utiles/jwtToken");

exports.alluser = async (req, res) => {
  try {
    const data = await UserSchema.find();
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
exports.userCreate = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const { pic, username, email } = req.body;
    const data = await UserSchema.create({
      pic,
      username,
      email,
      password: hashPassword,
    });
    generateToken(data, 201, res);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const data = await UserSchema.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
exports.userDelete = async (req, res) => {
  try {
    const data = await UserSchema.findByIdAndDelete(req.body.id);
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// login related function ----------------------------------------------------------

exports.login = async (req, res) => {
  try {
    const data = await UserSchema.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!data) {
      res.status(401).json("No user found");
    }

    const isPassword = await bcrypt.compare(req.body.password, data.password);
    if (!isPassword) {
      res.status(401).json("No user found");
    }

    generateToken(data, 200, res);
  } catch (error) {
    console.log(error);
  }
};
exports.profile = async (req, res) => {
  try {
    const data = await UserSchema.findById(req.userAllData.id);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
exports.cart = async (req, res) => {
  try {
    const data = await UserSchema.findById(req.userAllData.id);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.addCart = async (req, res) => {
  const cart = {
    productId: req.body.productId,
    pic: req.body.pic,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  let indicator = false;

  try {
    const data = await UserSchema.findById(req.userAllData.id);

    data.cart.forEach((item) => {
      if (item.productId === req.body.productId) {
        item.quantity = req.body.quantity;
        indicator = true;
      }
    });
    if (!indicator) {
      data.cart.push(cart);
    }

    data.save();
    res.status(200).json("item added");
  } catch (error) {
    console.log(error);
  }
};
exports.UserMsg = async (req, res) => {
  const Usermsg = {
    comment: req.body.comment,
  };
  try {
    const data = await UserSchema.findById(req.userAllData.id);
    // console.log(req.userAllData.id)
    data.msg.push(Usermsg);
    data.save();
    res.status(200).json("msg added");
  } catch (error) {
    console.log(error);
  }
};
exports.removeCart = async (req, res) => {
  try {
    const data = await UserSchema.findById(req.userAllData.id);

    data.cart.filter(
      (i) => i._id == req.params.id && data.cart.pull({ _id: req.params.id })
    );
    // data.cart.push(cart)

    data.save();
    res.status(200).json("item added");
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    console.log("logout run");
    res.cookie("token", null, {
      expire: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      messege: "logout",
    });
  } catch (error) {
    console.log(error);
  }
};
