const admin = require('firebase-admin');

const serviceAccount = require('../utils/service-acc.json');
const { Candidate, User } = require('../models');
const { json } = require('sequelize');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'voting-201b3.appspot.com',
});

const getPresCandidates = async(req, res) => {

  try {
    const presCand = await Candidate.findAll({
      where: {
        position: 'President'
      },
      include: [
        {
          model: User
        }
      ]
    });

    if(!presCand){
      return res.json({
        success: false,
        msg: "No Presidential candidates found!"
      });
    }

    return res.json({
      success: true,
      data: presCand,
      msg: "Success"
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message
    });
  }
}

const getVpCandidates = async (req, res) => {
  try {
    const presCand = await Candidate.findAll({
      where: {
        position: 'Vice President',
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (!presCand) {
      return res.json({
        success: false,
        msg: 'No Vice Presidential candidates found!',
      });
    }

    return res.json({
      success: true,
      data: presCand,
      msg: 'Success',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getFMCandidates = async (req, res) => {
  try {
    const presCand = await Candidate.findAll({
      where: {
        position: 'Finance Manager',
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (!presCand) {
      return res.json({
        success: false,
        msg: 'No Financial Managers candidates found!',
      });
    }

    return res.json({
      success: true,
      data: presCand,
      msg: 'Success',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getENCandidates = async (req, res) => {
  try {
    const presCand = await Candidate.findAll({
      where: {
        position: 'Entertainment',
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (!presCand) {
      return res.json({
        success: false,
        msg: 'No Entertainment candidates found!',
      });
    }

    return res.json({
      success: true,
      data: presCand,
      msg: 'Success',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      include: { model: User },
    });

    if (candidates.length <= 0) {
      return res.json({
        success: false,
        msg: 'No candidates listed yet!',
      });
    }

    return res.json({
      success: true,
      msg: 'Success',
      data: candidates,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const add = async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const { id_number, position, bio, objectives, party } = req.body;
    const upload = req.files;
    const file = upload[0]; // Access the first file (assuming only one file)

    const [data] = await bucket.upload(upload[0].path, {
      destination: file.originalname,
      metadata: {
        contentType: file.mimetype,
        cacheControl: 'public, max-age=31536000', // Make the file publicly accessible
      },
    });

    const avator = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${data.metadata.name}?alt=media`;
    const cand = await Candidate.create({
      id_number,
      position,
      bio,
      objectives,
      party,
      avator,
    });

    res.json({
      success: true,
      msg: 'Candidate added successfully!',
      data: cand,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const edit = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

const remove = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};
module.exports.CANDIDATECONTROLLER = {
  add,
  edit,
  remove,
  get,
  getENCandidates,
  getFMCandidates,
  getPresCandidates,
  getVpCandidates
};
