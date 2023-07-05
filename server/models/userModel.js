const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    avatarURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'], // "enumerations" which means specifically listed: Enums allow a developer to define a set of named constants
      default: 'User',
    },
    address: AddressSchema,
  },
  {
    //* options
    toJSON: {
      virtuals: true, // allows us to access this when using json
    },
    toObject: {
      virtuals: true, // allows us to access this when using json (console.log())
    },
    id: false,
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//? Use virtuals if you need to display calculated values that don't need to be stored in the database. Virtuals can be used to concatenate fields, format dates, or perform any other calculation that can be performed on-the-fly.
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// A pre-save middleware function in Mongoose runs before the save() function is called on a document instance. This middleware function is defined using the pre() method of the schema and takes a string argument indicating the trigger point. The trigger point for pre-save middleware is 'save'.
UserSchema.pre('save', async function (next) {
  try {
    // * check if the password is new
    if (!this.isModified('password')) return next();
    //*  hash the password
    this.password = await bcrypt.hash(this.password, 12);
    // * move on
    next();
  } catch (error) {
    throw new Error(error);
  }
});

UserSchema.methods.checkPassword = async function (
  password,
  usersPassword,
  next
) {
  try {
    return await bcrypt.compare(password, usersPassword);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.statics.findByToken = async function (token) {
  try {
    // verify the token is a jwt, the we are going to take the id from that token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user from that id and send them back
    const user = await this.findById(decoded.id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

//? Use methods if you need to manipulate the data before saving or after retrieving it. Methods can be used to perform complex calculations, validate data, or perform any other custom operation that requires data manipulation.
UserSchema.methods.getPublicFields = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    age: this.age,
    email: this.email,
    role: this.role,
    address: this.address,
    avatar: this.avatarURL,
  };
};

module.exports = model('User', UserSchema);
