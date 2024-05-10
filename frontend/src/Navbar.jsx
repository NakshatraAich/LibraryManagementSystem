import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const [Active, setActive] = useState("Overview");

  return (
    <div className='flex flex-col gap-16 bg-primary py-4 h-full justify-start rounded-lg shrink-0'>
      <div className="pl-4 pr-16 flex flex-row gap-4 items-center justify-center">
        <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/90/f0f0f0/bursts.png" alt="bursts"/>
        <h1 className="text-secondary text-normal font-semibold">Library <br/> Management</h1>
      </div>
      <div className="gap-3">
        <div className="px-6  flex flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => isActive? 'text-sm py-3 text-secondary font-semibold' : 'text-sm py-3 text-secondary/70 font-medium'} onClick={() => setActive("Overview")}>
            <div className="flex flex-row gap-3 items-center justify-between w-full">
              <div className="">Overview</div>
              {Active === "Overview" && <div className="h-4 w-[2px] rounded-full bg-secondary"></div>}
            </div>
          </NavLink>
        </div>
        <div className="px-6 flex flex-col gap-2">
          <NavLink to="/Library" className={({ isActive }) => isActive? 'text-sm py-3 text-secondary font-semibold' : 'text-sm py-3 text-secondary/70 font-medium'} onClick={() => setActive("Library")}>
            <div className="flex flex-row gap-3 items-center justify-between w-full">
              <div className="">Library</div>
              {Active === "Library" && <div className="h-4 w-[2px] rounded-full bg-secondary"></div>}
            </div>
          </NavLink>
        </div>
        <div className="px-6 flex flex-col gap-2">
          <NavLink to="/Camera" className={({ isActive }) => isActive? 'text-sm py-3 text-secondary font-semibold' : 'text-sm py-3 text-secondary/70 font-medium'} onClick={() => setActive("Scanner")}>
            <div className="flex flex-row gap-3 items-center justify-between w-full">
              <div className="">Scanner</div>
              {Active === "Scanner" && <div className="h-4 w-[2px] rounded-full bg-secondary"></div>}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar