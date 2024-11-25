import mongoose from "mongoose";
const menuSectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuSection",
      default: null
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["SECTION"],
      required: true,
    },
  },
  { timestamps: true }
);

export const MenuSection = mongoose.model("MenuSection", menuSectionSchema);