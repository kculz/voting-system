module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define('Candidate', {
    id_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    objectives: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    party: {
      type: DataTypes.ENUM(['ZICOSO', 'ZINASU', 'Independent']),
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avator: {
      type: DataTypes.TEXT,
    },
  });

  Candidate.associate = (model) => {
    Candidate.belongsTo(model.User, {
      foreignKey: 'id_number',
    });
  };

  return Candidate;
};
