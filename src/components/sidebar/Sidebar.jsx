import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaShoppingBag,
    FaThList,
    FaQq,
    FaSteamSquare
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import  Logo  from "../../assets/navbar/image.png";
import { AiFillProduct } from 'react-icons/ai';
import { MdCategory, MdContactPage } from 'react-icons/md';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { GiResize } from 'react-icons/gi';
import { IoColorPalette, IoNewspaper } from 'react-icons/io5';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/product",
            name: "Products",
            icon: <AiFillProduct />
        },
        {
            path: "/category",
            name: "Category",
            icon: <MdCategory />
        },
        {
            path: "/discount",
            name: "Discounts",
            icon: <RiDiscountPercentFill />
        },
        {
            path: "/size",
            name: "Size",
            icon: <GiResize />
        },
        {
            path: "/colors",
            name: "Colors",
            icon: <IoColorPalette />
        },
        {
            path: "/faq",
            name: "Faq",
            icon: <FaQq />
        },
        {
            path: "/contact",
            name: "Contact",
            icon: <MdContactPage />
        },
        {
            path: "/team",
            name: "Team",
            icon: <FaSteamSquare />
        },
        {
            path: "/news",
            name: "News",
            icon: <IoNewspaper />
        },

    ]
    return (
        <div className=" admin">
            <div  className={`${!isOpen ?'sidebar':"sidebar__open"}`}>
                <div className="top_section">
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%"}}>
                        <img style={{width:"80px" }} src={Logo} alt="" />
                    </div>
                </div>
                <hr className="sidebar__hr" />
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div style={{display:"flex", alignItems:"center"}} className="icon">{item.icon}</div>
                            <div style={{ display: !isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main style={{ marginLeft: !isOpen ? "300px" : "50px", padding:"5px" }} className=''>{children}</main>
        </div>
    );
};

export default Sidebar;