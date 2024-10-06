module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id_number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM(['NC', 'ND', 'HND']),
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: 'password',
    },
    votedForPres: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    votedForVP: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    votedForFM: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    votedForEN: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(['user', 'lecturer ']),
      defaultValue: 'user',
    },
  });

  User.associate = (model) => {
    User.hasOne(model.Candidate, {
      foreignKey: 'id_number',
    });
  };

  return User;
};
