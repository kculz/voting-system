const admin = require('firebase-admin');

const serviceAccount = require('../utils/service-acc.json');
const { Candidate, User } = require('../models');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'voting-201b3.appspot.com',
});

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
};
