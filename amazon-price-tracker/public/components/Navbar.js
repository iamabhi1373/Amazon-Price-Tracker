import Link from 'next/link';
import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
       
      </div>
      <div className="nav-links">
        <ul className="flex justify-between">
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#blog">Blogs</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
        </ul>
      </div>
      <div className="hamburger">
       
      </div>
    </nav>
  );
};

export default NavBar;
