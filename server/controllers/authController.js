const { addAdminValidation } = require('../utils/addAdminValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const validator = require('validator');
const { User } = require('../models');
const generateJwtToken = require('../utils/generateJwtToken');

// Set token age for expiration
const age = 1000 * 60 * 60 * 24 * 3; // 3 days

const login = async (req, res) => {
  try {
    const { id_number, password } = req.body;

    if (validator.isEmpty(id_number) && validator.isEmpty(password)) {
      return res.json({
        success: false,
        msg: 'ID number || Password is required!',
      });
    }
    const user = await User.findByPk(id_number);

    if (!user) {
      return res.json({
        success: false,
        msg: 'Invalid Credentails!',
      });
    }

    // Compare password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.json({
        success: false,
        msg: 'Invalid Credentails!',
      });
    }

    // Sign token
    const token = generateJwtToken({ userId: user.id_number, role: user.role }, age);

    return res
      .cookie('token', token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .json({
        success: true,
        token: token,
        role: user.role,
      });
  } catch (error) {
    // Error Response
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email)
    // Validation
    if (validator.isEmpty(email) && validator.isEmpty(password)) {
      return res.json({
        success: false,
        msg: 'Email || Password is required!',
      });
    }

    const user = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        msg: 'Invalid Credentails!',
      });
    }

    // Compare password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.json({
        success: false,
        msg: 'Invalid Credentails!',
      });
    }

    // Sign token
    const token = generateJwtToken({ user: user.id, role: user.role }, age);

    return res
      .cookie('token', token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .json({
        success: true,
        token: token,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    // Error Response
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // validation
    const data = { email, password, role };

    const errors = addAdminValidation(data);

    if (Object.keys(errors).length > 0) {
      //  Validation Error Response
      return res.status(422).json({
        success: false,
        msg: errors,
        error: 'Validation Error!',
      });
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: encryptedPassword,
      role
    });

    // Success Response
    return res.json({
      success: true,
      msg: 'New admin added successfully.',
    });
  } catch (error) {
    // Error Response
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token').status(200).json({
      success: true,
      msg: 'Logout successful.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: `Internal server error`,
      error: error,
    });
  }
};

module.exports.AUTHCONTROLLER = {
  login,
  logout,
  registerAdmin,
  adminLogin,
};
