import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white flex justify-center items-center ">
      <div className="mycontainer flex justify-center items-center px-4 h-14 py-5">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>i
          <span className="text-green-700">Manage/&gt;</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
