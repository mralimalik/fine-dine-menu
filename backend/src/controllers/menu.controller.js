import { Menu } from "../models/menu.model.js";
import mongoose from "mongoose";
import { MenuSection } from "../models/menu.section.js";
import { MenuItem } from "../models/menu.item.js";
import { Venue } from "../models/venue.model.js";
// // to get all menues of particular venue
// const getAllMenues = async (req, res) => {
//   // Access venueId from URL params correctly
//   const { venueId } = req.params;

//   // Check if venueId is provided
//   if (!venueId) {
//     return res.status(400).json({ message: "venueId is required" });
//   }

//   try {
//     //convert string id to mongo obj
//     let objectId = new mongoose.Types.ObjectId(venueId);
//     const menus = await Menu.find({ venueId: objectId });
//     return res.status(200).json({ data: menus });
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };
const getAllMenues = async (req, res) => {
  const { venueId } = req.params;

  if (!venueId) {
    return res.status(400).json({ message: "venueId is required" });
  }

  try {
    // Convert string venueId to a MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(venueId);

    // Find all menus for the given venueId
    const menus = await Menu.find({ venueId: objectId });

    // Fetch the number of sections and items for each menu
    const menusWithCounts = await Promise.all(
      menus.map(async (menu) => {
        const sectionCount = await MenuSection.countDocuments({ menuId: menu._id });
        const itemCount = await MenuItem.countDocuments({ menuId: menu._id });

        // Convert menu to a plain object and add section and item counts
        return {
          ...menu.toObject(),
          sections: sectionCount,
          items: itemCount,
        };
      })
    );

    return res.status(200).json({ data: menusWithCounts });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// to update sepecific menue
const updateMenu = async (req, res) => {
  //get required data from body and menuId from params
  const { menuName, isActive } = req.body;
  const { menuId } = req.params;

  if (!menuId) {
    return res.status(400).json({ message: "menuId is required" });
  }

  if (!menuName && !isActive) {
    return res.status(400).json({ message: "menuName or isActive is required" });
  }

  try {
    const updateData = {};
    if (menuName) updateData.menuName = menuName;
    if (isActive) updateData.isActive = isActive;
    // find the menu id and replace with new data
    const updatedMenu = await Menu.findOneAndUpdate({ _id: menuId }, { $set: updateData }, { new: true });

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

const createMenuWitoutItems = async (req, res) => {
  try {
    //get user id from auth jwt and required name and country
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User id is missing" });
    }
    const { venueId } = req.params;

    if (!venueId) {
      return res.status(400).json({ message: "venueId is required" });
    }
    // Check if venue exists in the Venue collection by the venueId field
    const venue = await Venue.findOne({ venueId }); // Query by the short venueId
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const newMenu = new Menu({ menuName: "Menu", venueId: venue._id, userId });
    const savedMenu = await newMenu.save();

    // Convert savedMenu to a plain object and add sections and items
    const response = savedMenu.toObject(); // Converts the Mongoose document to a plain object
    response.sections = 0;
    response.items = 0;
    res.status(200).json({ data: response });
  } catch (e) {
    console.log("Error creating menu", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

const createMenuWithItemsSections = async (req, res) => {
  try {
    //get user id from auth jwt and required name and country
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User id is missing" });
    }
    const { venueId } = req.params;

    if (!venueId) {
      return res.status(400).json({ message: "venueId is required" });
    }

    const venue = await Venue.findOne({ venueId });
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const newMenu = new Menu({ menuName: "Menu", venueId: venue._id, userId });
    await newMenu.save();

    const sections = [
      {
        sectionName: "Starters",
        type: "SECTION",
        isActive: true,
        parentId: null,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
      {
        sectionName: "Salads",
        type: "SECTION",
        isActive: true,
        parentId: null,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
      {
        sectionName: "Desserts",
        type: "SECTION",
        isActive: true,
        parentId: null,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
    ];

    // Save the sections
    const savedSections = await MenuSection.insertMany(sections);

    const section1Items = [
      {
        isActive: false,
        itemName: "Butternut Squash Soup",
        type: "ITEM",
        price: 20,
        parentId: savedSections[0]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
      {
        isActive: false,
        itemName: "Gazpacho",
        type: "ITEM",
        price: 20,
        parentId: savedSections[0]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
    ];
    const section2Items = [
      {
        isActive: false,
        itemName: "Chef's Special Salad ",
        type: "ITEM",
        price: 20,
        parentId: savedSections[1]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
      {
        isActive: false,
        itemName: "Crunchy Spinach Salad",
        type: "ITEM",
        price: 20,
        parentId: savedSections[1]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
    ];
    const section3Items = [
      {
        isActive: false,
        itemName: "Lemon Cheesecake",
        type: "ITEM",
        price: 20,
        parentId: savedSections[2]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
      {
        isActive: false,
        itemName: "Cinnamon Cheesecake",
        type: "ITEM",
        price: 20,
        parentId: savedSections[2]._id,
        menuId: newMenu._id,
        userId: userId,
        venueId: venue._id,
      },
    ];
    // Save the menu items
    await MenuItem.insertMany([...section1Items, ...section2Items, ...section3Items]);

    // Step 4: Respond with the created menu, sections, and items
    const response = newMenu.toObject();
    response.sections = savedSections.length;
    response.items = section1Items.length + section2Items.length + section3Items.length;

    res.status(200).json({ data: response });
  } catch (e) {
    console.log("Error creating menu", e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};
export { getAllMenues, updateMenu, getMenuItemsWithSections, createMenuWitoutItems,createMenuWithItemsSections };
