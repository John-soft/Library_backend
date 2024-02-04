const { Schema, model } = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bookDetails = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    pdf: {
      type: String,
    },
  },
  {
    collection: "bookDetails",
    timestamps: true,
  }
);

//Export the model
module.exports = model("Book", bookDetails);
