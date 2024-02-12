import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import Search from "antd/es/input/Search";

const SidePanel = ({ handleFilter, createNew }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleMouseMove = (event) => {
      const sidePanelCard = document.querySelector(".side-panel-card");
      if (
        sidePanelCard &&
        !sidePanelCard.contains(event.target) &&
        !isDropdownOpen
      ) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {!isExpanded ? (
        <div
          className="side-panel-overlay"
          onMouseEnter={() => setIsExpanded(true)}
        >
          <div className="side-panel-overlay-item">
            <IoAdd />
          </div>
          <div className="side-panel-overlay-item">
            <SearchOutlined />
          </div>
        </div>
      ) : (
        <div
          className="side-panel-card"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => {
            if (!isInputFocused) setIsExpanded(false);
          }}
        >
          <Button
            type="primary"
            style={{
              margin: 16,
              width: "85%",
              backgroundColor: "rgb(82, 196, 26)",
            }}
            onClick={createNew}
          >
            Add
          </Button>
          <Search
            defaultValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            enterButton
            placeholder="Search"
            allowClear
            onSearch={handleFilter}
            style={{ width: "85%", margin: 16 }}
          />
        </div>
      )}
    </>
  );
};

export default SidePanel;
