"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  DiamondPlus,
  FilePlus,
  LayoutDashboard,
  Rows4,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react";
import logo from "../../assets/logo_hk.jpg";
import logo2 from "../../assets/logo-r-bg.png";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    // name: "MAIN MENU",
    menuItems: [
      {
        icon: <LayoutDashboard />,
        label: "Dashboard",
        route: "/",
        allowedRoles: ["admin", "employee1", "employee2"],
        // children: [
        //   { label: "eCommerce", route: "/" },
        // ],
      },
      {
        icon: <Users />,
        label: "All Employees",
        route: "/allEmployees",
        allowedRoles: ["admin"],
      },
      {
        icon: <ShoppingCart />,
        label: "All Orders",
        route: "/allOrders",
        allowedRoles: ["admin"],
      },
      {
        icon: <UserPlus />,
        label: "Emp ID & Pass Generate",
        route: "/idPassGenerate",
        allowedRoles: ["admin"],
        // children: [
        //   { label: "Form Elements", route: "/forms/form-elements" },
        //   { label: "Form Layout", route: "/forms/form-layout" },
        // ],
      },
      {
        icon: <FilePlus />,
        label: "Create Order Form",
        route: "/createOrderForm",
        allowedRoles: ["admin"],
        // children: [
        //   { label: "Tables", route: "/tables" },
        // ],
      },
     
      {
        icon: <DiamondPlus />,
        label: "Order Punch",
        route: "/orderPunch",
        allowedRoles: ["employee1"],
        // children: [
        //   { label: "Tables", route: "/tables" },
        // ],
      },
      {
        icon: <Rows4 /> ,
        label: "View Orders",
        route: "/ordersView",
        allowedRoles: ["employee1", "employee2"],
        // children: [
        //   { label: "Tables", route: "/tables" },
        // ],
      },
      {
        icon: <Rows4 /> ,
        label: "PO Form",
        route: "/purchase",
        allowedRoles: ["employee1", "employee2", "admin"],
        // children: [
        //   { label: "Tables", route: "/tables" },
        // ],
      },
    ],
  },
];


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuth(); // Retrieve user data to get the role

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="ml-8 flex items-center justify-between gap-2">
          <Link href="/">
            <Image
              width={200}
              height={50}
              src={logo}
              alt="Logo"
              priority
              className="object-contain dark:hidden"
              style={{ width: "auto", height: "80px" }}
            />
            <Image
              width={200}
              height={50}
              src={logo2}
              alt="Logo"
              priority
              className="hidden object-contain dark:block"
              style={{ width: "auto", height: "80px" }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* Sidebar Menu */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ul className="mb-6 mt-3 flex flex-col gap-2">
                  {group.menuItems
                    .filter((menuItem) => menuItem.allowedRoles.includes(user?.role))
                    .map((menuItem, menuIndex) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

