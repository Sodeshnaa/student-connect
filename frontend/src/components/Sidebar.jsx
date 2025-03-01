import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { House, MessageSquareMore, Globe, Users, SquareChevronRight, Settings, LogOut, Menu } from "lucide-react";
import { assets } from "../assets/assets"; // Assuming assets is properly imported
import { handleSuccess } from "../utils/utils";

const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // Sidebar Collapse State

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged Out Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`fixed top-0 left-0 ${collapsed ? "w-20" : "w-74"} min-h-screen bg-white border-r font-outfit transition-all duration-300`}>
      
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between p-5">
        <img
          src={assets.Logo}
          alt="Logo"
          className={`h-16 cursor-pointer ${collapsed ? "hidden" : "block"}`}
          onClick={() => navigate('/')}
        />
        <Menu className="cursor-pointer text-[#2B64BB]" onClick={toggleSidebar} />
      </div>

      {/* Sidebar Menu Items */}
      <ul className="text-[#2B64BB] mt-5">
        {[
          { id: "dashboard", icon: <House />, text: "Dashboard" },
          { id: "messages", icon: <MessageSquareMore />, text: "Messages" },
          { id: "events", icon: <Globe />, text: "Events" },
          { id: "network", icon: <Users />, text: "Network" },
          { id: "open-source", icon: <SquareChevronRight />, text: "Open Source" },
          { id: "settings", icon: <Settings />, text: "Settings" },
        ].map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 py-3.5 px-3 cursor-pointer ${
              activeSection === item.id ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon}
            {!collapsed && <p>{item.text}</p>}
          </li>
        ))}

        {/* Logout Button */}
        <button
          className="flex items-center gap-3 py-3.5 px-3 text-red-500 cursor-pointer mt-10"
          onClick={handleLogout}
        >
          <LogOut />
          {!collapsed && <p>Logout</p>}
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
