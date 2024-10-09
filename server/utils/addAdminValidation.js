const validator = require("validator");
const errors = {};

module.exports = {
     addAdminValidation: (data) => {
        if(!validator.isEmail(data.email)){
            errors.email = 'Please provide valid email!';
        }

        if(!validator.isStrongPassword(data.password)){
            errors.password = 'Password must include [ capital letters, special chars (e.g @, *, _) & numbers (e.g 0-9)';
        }

        if(validator.isEmpty(data.role)){
            errors.role = 'Admin role is not defined!';
        }

        return errors;
    }
}