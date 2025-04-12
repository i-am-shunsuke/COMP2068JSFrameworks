// Naming convention for models: use singular form of the represented entity
// Import mongoose
const mongoose = require("mongoose");
// Define data schema (JSON)
const dataSchemaObj = {
  day: { type: Date },
  calory: { type: Number, required: true },
};
// Create mongoose schema
const projectsSchema = mongoose.Schema(dataSchemaObj);
// Create and import mongoose model
module.exports = mongoose.model("Project", projectsSchema);