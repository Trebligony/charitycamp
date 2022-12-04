const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedProjects` array in User.js
const projectSchema = new Schema({
  // saved project id from GlobalGiving
  pId: {
    type: String,
    required: true,
  },
  pTitle: {
    type: String,
    required: true,
  },
  pOrganizer: {
    type: String,
    required: true,
  },
  pDescription: {
    type: String,
    required: true,
  },
  pGoal: {
    type: String,
    required: true,
  },
  pImage: {
    type: String,
  },
  pLink: {
    type: String,
  }
});

module.exports = projectSchema;
