const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required!"],
    },
    category: { type: String, required: [true, "Please select category"] },
    title: { type: String, required: [true, "Please add title"] },
    goal: { type: Number, require: [true, "Please set your goal!"] },
    currency: { type: String, default: "UGX" },
    address: { type: String, required: [true, "Select Address"] },
    district: { type: String, required: [true, "Select District"] },
    startDate: { type: Date },
    endDate: { type: Date },
    shortDescription: { type: String },
    description: { type: String, required: [true, "Please add description"] },
    endMethod: { type: String, default: "goal_achieve" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Campaign", Schema);
