// import Schema constructor and model function from Mongoose library
const { Schema, model, Types } = require('mongoose');

// import date formatting utility
const dateFormat = require('../utils/dateFormat');

// create ReactionSchema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    _id: false, // tell schema not to create '_id', since we already have 'reactionId'
    toJSON: {
      getters: true // tell schema it can use getters 
    }
  }
);

// create ThoughtSchema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    reactions: [ReactionSchema] // use ReactionSchema to validate data for a reply
  },
  {
    toJSON: {
      virtuals: true, // tell schema it can use virtuals
      getters: true // tell schema it can use getters
    },
    id: false // prevents virtuals from creating duplicate of _id as id
  }
);

// get total count of thought's reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;