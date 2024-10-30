const validator = require('validator');
const { User, Admin } = require('../models');
const bcrypt = require('bcryptjs');
const { validateStudent } = require('../utils/addUserValidation');

const addUser = async (req, res) => {
  try {
    const { id_number, fullname, level, course, password } = req.body;

    // validation
    const data = { id_number, fullname, level, course, password };

    const errors = validateStudent(data);

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        msg: errors,
        error: 'Validation Error!',
      });
    }

    // check if user already exist
    const user = await User.findByPk(id_number);

    if (user) {
      console.log('User already exists!');
      return res.json({
        success: false,
        msg: 'User already exists',
        data: user,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id_number,
      fullname,
      level,
      course,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.json({
        success: false,
        msg: 'Failed to create new User!',
      });
    }

    return res.json({
      success: true,
      msg: 'New user created.',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const get = async (req, res) => {

  try {
    const students = await User.findAll();

    if(students.length <= 0){
      return res.json({
        success: true,
        msg: "No Students yet!",
        data: 0
      });
    }

    return res.json({
      success: true,
      msg: "Success",
      data: students
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: "Interenal server error!"
    });
  }
}

const getAdmins = async (req, res) => {

  try {
    const admins = await Admin.findAll();

    if(!admins) {
      return res.json({
        success: false,
        msg: "No admin users found!"
      });
    }

    return res.json({
      success: true,
      msg: "Success",
      data: admins
    })
  } catch (err) {
    return res.json({
      success: false,
      msg: err.message,
      error: "Internal server error!"
    })
  }
}

const changePassword = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const editProfile = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

module.exports.USERCONTROLLER = {
  changePassword,
  editProfile,
  addUser,
  get,
  getAdmins
};
