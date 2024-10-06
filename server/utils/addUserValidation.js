const validator = require('validator');

module.exports = {
  validateStudent : (data) => {
    const errors = {};

    // ID Number validation
    if (!validator.isLength(data.id_number, { min: 10 })) {
      errors.id_number = 'ID Number must be at least 10 characters';
    } else if (
      !validator.isAlphanumeric(data.id_number, 'en-US', { ignore: '-' })
    ) {
      errors.id_number = 'ID Number must be alphanumeric';
    }

    // Fullname validation
    if (!validator.isLength(data.fullname, { min: 5 })) {
      errors.fullname = 'Fullname must be at least 5 characters';
    }

    // Level validation
    if (data.level && !['NC', 'ND', 'HND'].includes(data.level)) {
      errors.level = 'Invalid level';
    }

    // Course validation
    if (!validator.isLength(data.course, { min: 2 })) {
      errors.course = 'Course must be at least 2 characters';
    }

    // Password validation
    if (!data.password == '') {
      if (!validator.isStrongPassword(data.password)) {
        errors.password =
          'Password must include [ capital letters, special chars (e.g @, *, _) & numbers (e.g 0-9)';
      }
    }

    return errors;
  },
};
 