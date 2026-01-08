import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar({ isVisible, onToggle }) {
  const { url } = usePage();
  const [expandedItems, setExpandedItems] = useState({});
  useEffect(() => {
    const activeParents = {};
    menuItems.forEach((item) => {
      if (item.subMenus && url.startsWith(item.route)) {
        activeParents[item.name] = true;
      }
    });
    setExpandedItems(activeParents);
  }, [url]);

  const menuItems = [
    {
      name: "Index",
      icon: "home",
      route: "/admin",
    },
    {
      name: "Users",
      icon: "people",
      route: "/admin/users",
      isParent: true,
      subMenus: [
        { name: "User Management", id: "Management" },
        { name: "Groups", id: "Groups" },
        { name: "Select", id: "Selection" },
        { name: "Online", id: "Online" },
        { name: "Import", id: "Import" },
        { name: "Results", id: "Results" },
      ],
    },
    {
      name: "Modules",
      icon: "inventory_2",
      route: "/admin/modules",

      subMenus: [
        { name: "Class", id: "Class" },
        { name: "Groups", id: "Groups" },
        { name: "Subjects", id: "Subjects" },
        { name: "Questions", id: "Questions" },
        { name: "Import Users", id: "Import" },
        { name: "Results", id: "Results" },
      ],
    },
    { name: "Tests", icon: "assignment", route: "/admin/tests" },
    { name: "Backup", icon: "storage", route: "/admin/backup" },
    { name: "Public", icon: "language", route: "/admin/public" },
    { name: "Help", icon: "help_outline", route: "/admin/help" },
  ];

  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!isVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
                fixed lg:static inset-y-0 left-0 z-30
                w-64 bg-green-700 text-white transition-transform duration-300 transform
                ${
                  isVisible
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
            `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold border-b border-green-400 pb-2">
            CBT EXAM
          </h1>
          <p className="text-xs opacity-80 mt-1 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = url.startsWith(item.route);
            const isExpanded = expandedItems[item.name] || false;
            const hasSubMenus = item.subMenus && item.subMenus.length > 0;

            return (
              <React.Fragment key={item.name}>
                {hasSubMenus ? (
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`
                      flex items-center justify-between w-full gap-3 px-4 py-3 rounded-md transition-all
                      ${
                        isActive
                          ? "bg-white/20 font-bold shadow-inner border-l-4 border-white"
                          : "hover:bg-white/10"
                      }
                    `}>
                    <div className="flex items-center gap-3">
                      <span className="material-icons">{item.icon}</span>
                      <span className="text-lg">{item.name}</span>
                    </div>
                    <span
                      className={`material-icons transition-transform  ${
                        isExpanded ? "rotate-180" : ""
                      }`}>
                      expand_more
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.route}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                      ${
                        isActive
                          ? "bg-white/20 font-bold shadow-inner border-l-4 border-white"
                          : "hover:bg-white/10"
                      }
                    `}>
                    <span className="material-icons">{item.icon}</span>
                    <span className="text-lg">{item.name}</span>
                  </Link>
                )}

                {hasSubMenus && (
                  <div
                    className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${
        isExpanded
          ? "max-h-[500px] opacity-100 ml-6 mt-1 translate-y-0 delay-150"
          : "max-h-0 opacity-0 ml-0 mt-0 -translate-y-1"
      }
    `}>
                    <div className="space-y-1">
                      {item.subMenus.map((submenu) => {
                        const subRoute = `${
                          item.route
                        }/${submenu.id.toLowerCase()}`;
                        const isSubActive = url.startsWith(subRoute);

                        return (
                          <Link
                            key={submenu.id}
                            href={subRoute}
                            className={`
              flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm
              ${isSubActive ? "bg-white/10 font-medium" : "hover:bg-white/10"}
            `}>
                            <span className="text-base">{submenu.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <div className="pt-10">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-600 transition-colors w-full text-left">
              <span className="material-icons">logout</span>
              <span className="text-lg">Exit</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
