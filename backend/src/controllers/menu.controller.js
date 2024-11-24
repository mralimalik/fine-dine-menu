import { Menu } from "../models/menu.model.js";
import mongoose from "mongoose";
import { MenuSection } from "../models/menu.section.js";
import { MenuItem } from "../models/menu.item.js";
// to get all menues of particular venue
const getAllMenues = async (req, res) => {
  // Access venueId from URL params correctly
  const { venueId } = req.params;

  // Check if venueId is provided
  if (!venueId) {
    return res.status(400).json({ message: "venueId is required" });
  }

  try {
    let objectId = new mongoose.Types.ObjectId(venueId);
    const menus = await Menu.find({ venueId: objectId });
    return res.status(200).json({ data: menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// to update sepecific menue
const updateMenu = async (req, res) => {
  const { menuName, isActive } = req.body;
  const { menuId } = req.params;

  if (!menuId) {
    return res.status(400).json({ message: "menuId is required" });
  }

  if (!menuName && !isActive) {
    return res
      .status(400)
      .json({ message: "menuName or isActive is required" });
  }

  try {
    const updateData = {};
    if (menuName) updateData.menuName = menuName;
    if (isActive) updateData.isActive = isActive;

    const updatedMenu = await Menu.findOneAndUpdate(
      { _id: menuId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(200).json({ data: updatedMenu });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// get all menu items with sections and children
const getMenuItemsWithSections = async (req, res) => {
  const { menuId } = req.body;

  if (!menuId) {
    return res.status(400).json({ error: "menuId is required" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(menuId);

    // Fetch MenuSections where parentId is null (Top-level sections)
    const sections = await MenuSection.find({
      menuId: objectId,
      parentId: null,
    });

    // Fetch MenuItems where parentId is null (Top-level items)
    const items = await MenuItem.find({
      menuId: objectId,
      parentId: null,
    });

    // Fetch sub-sections and items for each top-level section
    const sectionsWithChildren = await Promise.all(
      sections.map(async (section) => {
        const sectionItems = await MenuItem.find({
          menuId: objectId,
          parentId: section._id,
        });

        const subSections = await fetchSubSections(section._id, objectId); // Recursively get sub-sections

        return {
          ...section.toObject(),
          items: sectionItems,
          subSections: subSections, // Add nested sub-sections
        };
      })
    );

    // Combine top-level sections, items, and nested sections
    const combined = [
      ...sectionsWithChildren,
      ...items, // Include top-level items
    ];

    res.status(200).json(combined); // Return the combined data
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch sub-sections and sub-items recursively
const fetchSubSections = async (parentSectionId, menuId) => {
  // Fetch sub-sections under a section
  const subSections = await MenuSection.find({
    menuId: menuId,
    parentId: parentSectionId,
  });

  // For each sub-section, fetch the items under that sub-section
  const subSectionsWithItems = await Promise.all(
    subSections.map(async (subSection) => {
      const subItems = await MenuItem.find({
        menuId: menuId,
        parentId: subSection._id,
      });

      // Recursively fetch sub-sections for this sub-section
      const nestedSubSections = await fetchSubSections(subSection._id, menuId);

      return {
        ...subSection.toObject(),
        items: subItems,
        subSections: nestedSubSections, // Nested sub-sections
      };
    })
  );

  return subSectionsWithItems;
};

export { getAllMenues, updateMenu, getMenuItemsWithSections };
