const { check, body, validationResult } = require('express-validator');
const createError = require('http-errors');

exports.validateUser = [
  body('firstName')
    .notEmpty()
    .withMessage({
      message: 'First name is required',
      errorCode: 1,
    })
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 charachters long')
    .isAlpha()
    .withMessage('First name should only contain letters'),

  body('lastName')
    .notEmpty()
    .withMessage('Lastname is required')
    .isLength({ min: 2 })
    .withMessage('Lastname must be at least 2 charachters long'),

  //   body("age").isNumeric().withMessage("Age must be a number"),
  // body('age')
  //   .notEmpty()
  //   .isInt({ min: 18 })
  //   .withMessage('Age must be a number and at least 18 years old'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 charachters long'),

  // body('role').notEmpty().isIn(['User', 'Admin']),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.param,
        error: error.msg,
      }));

      return res.status(422).json({ errors: errorMessages });
    }

    return next();
  },
];

exports.sanitizeUser = [
  check('firstName').trim().escape(),
  check('lastName').trim(),
  // check('age').trim(),
  check('email').trim().normalizeEmail(),
  check('password').trim(),
  // check('role').trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.param,
        error: error.msg,
      }));

      return next(createError(422, { errors: errorMessages }));
    }

    return next();
  },
];
