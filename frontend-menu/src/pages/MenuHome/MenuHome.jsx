import React, { useEffect } from "react";
import MenuItemBox from "../../component/MenuItemBox/MenuItemBox";
import "./MenuHome.css";
import { VenueContext } from "../../context/VenueContext.jsx";
import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext.jsx";
import { useParams } from "react-router-dom";
import MenuSectionBox from "../../component/MenuSectionBox/MenuSectionBox.jsx";
const MenuHome = () => {
  const { venueData, menus, setSelectedMenu, selectedMenu } = useContext(VenueContext);
  const { getMenuesItemsandSections, setMenuItemsData, menuItemsData } = useContext(MenuContext);
  const { menuId } = useParams();

  const menu = ["Starter", "Salad", "Starter", "Salad", "Starter", "Salad", "Starter", "Salad"];
  useEffect(() => {
    console.log(menuId);

    getMenuesItemsandSections(menuId);
  }, [menuId]);

  return (
    <div>
      <div className="bg-red-500  p-3 text-xl text-white font-semibold flex justify-center  ">
        <h4>{venueData ? venueData.venueName : ""} Menu</h4>
      </div>

      <div className="mt-10 px-3">
        <h3 className="font-semibold text-2xl flex justify-center">
          {selectedMenu ? selectedMenu.menuName : ""}
        </h3>
        <div className="w-full my-5">
          <input type="text" placeholder="Search" className="w-full py-3 px-4 border rounded-full " />
        </div>

        <div className="scrollable-menu flex gap-5 w-ful overflow-x-auto">
          {menuItemsData.map((parentMenu, index) => {
            if (parentMenu.type === "SECTION") {
              return (
                <div key={index} className="flex flex-col w-fit">
                  <div className="h-20 w-28">
                    <img
                      src="https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1334x444/EkQEL4rnl/64b5aa6d-8894-4d19-8a1a-a55ae5eaae6f.jpg"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-mono text-center">{parentMenu.sectionName}</h3>
                </div>
              );
            }
            return null;
          })}
        </div>

        {menuItemsData.map((parentMenu, parentIndex) => {
          if (parentMenu.type === "SECTION") {
            return <MenuSectionBox key={parentIndex} section={parentMenu} />;
          } else {
            return <MenuItemBox key={parentIndex} item={parentMenu} />;
          }
        })}
      </div>
    </div>
  );
};

export default MenuHome;
