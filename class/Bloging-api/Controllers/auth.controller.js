const User = require("../modules/User.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const secret = "mySecret";

const registerUser = async (req, res) => {
  try {
    // const data = req.body
    // const user = new User(data)
    //spreed or rest in js
    const { password, ...data } = req.body; //rest operator
    const hashedpassword = await argon2.hash(password);
    const user = new User({
      ...data, //spread operator
      password: hashedpassword,
    });
    await user.save();
    const { password: userPassword, ...rest } = user.toObject(); //toObject object ma laijani {_ userName ko sato ma rakhnu pani payo. if value is not needed}
    res.status(201).json(rest);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

// for login auth
const loginUser = async (req, res) => {
  try {
    const { password, name } = req.body;
    const user = await User.findOne({
      //   email: email,
      name: name,
    });
    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const { password: userPassword, ...rest } = user.toObject(); //toObject object ma laijani

    const token = jwt.sign(rest, secret, {
      expiresIn: "1h",
    });

    // res.status(200).json(rest);
    res.status(200).json({ user: rest, token });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

//new route (encrypetion also used here)
const me = async (req, res) => {
  //   const token = req.headers.authorization
  //     ? req.headers.authorization.split(" ")[1]
  //     : null;
  //   try {
  //     const user = jwt.verify(token, secret);
  //     res.status(200).json(user);
  //   } catch (e) {
  //     res.status(400).json({
  //       message: e.message,
  //     });
  //   }

  res.status(200).json({
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  me,
};
