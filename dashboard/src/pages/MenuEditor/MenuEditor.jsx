import {useState} from "react";
import "./MenuEditor.css";
import MenuItemList from "../../component/MenuItemList/MenuItemList.jsx";
import MenuSectionList from "../../component/MenuSectionList/MenuSectionList.jsx";
import axios from "axios";
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
const MenuEditor = () => {

  const [menuData, setMenuSectionsData] = useState([]);
  const {menuId} = useParams();
  const getMenuesItemsandSections = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("Token");

    try {
      console.log(menuId);
      
      const response = await axios.get(
        `http://localhost:3000/menu/menuitems/${menuId}`,
       
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Handle the response after successfully creating a venue
      if (response.data) {
         console.log("Data of items and secitons",response.data); 
         setMenuSectionsData(response.data)
      }
    } catch (err) {
      console.log("Error creating menu with no item:", err);
    }
  };

  useEffect(() => {
    getMenuesItemsandSections();

  }, [])
  

  return (
    <div className="menu-editor-main m-3">
      <p className="menu-editor-heading text-xl font-medium">Menu Editor</p>
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
        return <MenuItemList key={section._id} menuItemData={section} />;
      })}
    </div>
  );
};

export default MenuEditor;
