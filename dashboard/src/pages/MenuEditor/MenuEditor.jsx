import React from "react";
import "./MenuEditor.css";
import MenuItemList from "../../component/MenuItemList/MenuItemList.jsx";
import MenuSectionList from "../../component/MenuSectionList/MenuSectionList.jsx";
const MenuEditor = () => {
  const menuData = [
    {
      _id: "673ed7c7dc5d9703d79504be",
      sectionName: "Section A",
      type: "SECTION",
      isActive: true,
      parentId: null,
      menuId: "673df1830daf511ce651cd77",
      items: [
        {
          isActive: false,
          _id: "673ed846dc5d9703d79504c3",
          itemName: "Item 3",
          type: "ITEM",
          price: 20,
          parentId: "673ed7c7dc5d9703d79504be",
          menuId: "673df1830daf511ce651cd77",
        },
      ],
      subSections: [
        {
          _id: "673ed800dc5d9703d79504c1",
          sectionName: "Sub Section A",
          type: "SECTION",
          isActive: true,
          parentId: "673ed7c7dc5d9703d79504be",
          menuId: "673df1830daf511ce651cd77",
          items: [
            {
                isActive: false,
                _id: "673ed846dc5d9703d79504c3",
                itemName: "Item 3",
                type: "ITEM",
                price: 20,
                parentId: "673ed800dc5d9703d79504c1",
                menuId: "673df1830daf511ce651cd77",
              },
          ],
          subSections: [
            {
              _id: "673ee126dc5d9703d79504d9",
              sectionName: "Sub Sub Section A",
              type: "SECTION",
              isActive: true,
              parentId: "673ed800dc5d9703d79504c1",
              menuId: "673df1830daf511ce651cd77",
              items: [],
              subSections: [
                {
                  _id: "673ee4a0dc5d9703d79504db",
                  sectionName: "Sub Sub Sub Section A",
                  type: "SECTION",
                  isActive: true,
                  parentId: "673ee126dc5d9703d79504d9",
                  menuId: "673df1830daf511ce651cd77",
                  items: [],
                  subSections: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      isActive: false,
      _id: "673ed78edc5d9703d79504ba",
      itemName: "Item 1",
      type: "ITEM",
      price: 20,
      parentId: null,
      menuId: "673df1830daf511ce651cd77",
    },
    {
      isActive: false,
      _id: "673ed7a0dc5d9703d79504bc",
      itemName: "Item 2",
      type: "ITEM",
      price: 20,
      parentId: null,
      menuId: "673df1830daf511ce651cd77",
    },
  ];

  return (
    <div className="menu-editor-main">
      <p className="menu-editor-heading">Your Menu Data</p>

      {menuData.map((section, index) => {
          if (section.type === "SECTION") {
            return (
              <MenuSectionList
              key={section._id}
              sectionData={section}
              items={section.items}
              subSections={section.subSections}
              />
            );
          }
          return (
            <MenuItemList key ={section._id} menuItemData={section} />
          );
        })}
    </div>
  );
};

export default MenuEditor;
