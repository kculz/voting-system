module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("Admin", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(['admin', 'super-admin']),
            defaultValue: 'admin'
        }
    });

    return Admin;
}