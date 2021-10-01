// import Schema constructor and model function from Mongoose library
const { Schema, model } = require('mongoose');

// create UserSchema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ // regex for a valid email
    },
    thoughts: [ // array of _id values referencing the Thought model
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ], 
    friends: [ // array of _id values referencing the User model (self reference)
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true // tell schema it can use virtuals
    },
    id: false // prevents virtuals from creating duplicate of _id as id
  }
);

// get total count of user's friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
}); 

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;