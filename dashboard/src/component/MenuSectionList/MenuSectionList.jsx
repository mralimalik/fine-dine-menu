import React from "react";
import MenuItemList from "../MenuItemList/MenuItemList.jsx";

const MenuSectionList = ({ sectionData, subSections, items }) => {

  // function to render subsections if there is any
  const renderSections = () => {
    return (
      subSections.length > 0 && (
        <div className="px-5">
          {subSections.map((subSection) => (
            <MenuSectionList
              key={subSection._id}
              sectionData={subSection}
              subSections={subSection.subSections}
              items={subSection.items}
            />
          ))}
        </div>
      )
    );
  };

  // function to render subitems in any subsection if there is any
  const renderItems = () => {
    return (
      items.length > 0 && (
        <div className="px-5">
          {items.map((item) => (
            <MenuItemList key={item._id} menuItemData={item} />
          ))}
        </div>
      )
    );
  };
  return (
    <div>
      <div
        className="menu-section-list bg-white rounded-md p-3 mx-8 my-4"
        draggable
      >
        <div className="menu-section-left">
          <p>{sectionData.sectionName}</p>
        </div>
        <div className="menu-section-right">
          <p>{sectionData.isActive ? "Active" : "Inactive"}</p>
        </div>
      </div>

      {/* Render Items in Section */}
      {renderItems()}

      {/* Render Sub-Sections recursively */}
      {renderSections()}
    </div>
  );
};

export default MenuSectionList;
