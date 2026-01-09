import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ClipboardCheck, LogOut, ChevronDown } from "lucide-react";
import { SideBarItems } from "@/constants/sideBarItems";
import { sideBarPalettes} from "@/Components/customStyles/sideBarStyles"

export default function Sidebar({
  isVisible,
  onToggle,
  theme = "luxuryNature",
}) {
  const { url } = usePage();
  const [expandedItems, setExpandedItems] = useState({});
  const currentPalette = sideBarPalettes[theme] || sideBarPalettes.luxuryNature;

  useEffect(() => {
    const activeParents = {};
    SideBarItems.forEach((item) => {
      if (item.subMenus && url.startsWith(item.route)) {
        activeParents[item.name] = true;
      }
    });
    setExpandedItems(activeParents);
  }, [url]);

  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {/* Overlay mobile */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/60 z-[40] lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-[50]
          w-64 transition-transform duration-300 ease-in-out flex flex-col
          ${isVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: currentPalette.sidebar,
        }}>
        {/* Header Section */}
        <div className="p-6 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: currentPalette.activeItem }}>
              <ClipboardCheck
                className="w-6 h-6"
                style={{ color: currentPalette.sidebarText }}
              />
            </div>
            <div>
              <h1
                className="text-xl font-bold leading-none"
                style={{ color: currentPalette.sidebarText }}>
                CBT-FKUnila
              </h1>
              <p
                className="text-[10px] mt-1 uppercase tracking-[0.2em]"
                style={{ color: currentPalette.sidebarText, opacity: 0.7 }}>
                Halaman Admin
              </p>
            </div>
          </div>
          <div
            className="h-[1px] w-full mt-4"
            style={{
              background: `linear-gradient(to right, ${currentPalette.activeText}50, transparent)`,
            }}
          />
        </div>

        {/* Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {SideBarItems.map((item) => {
            const isActive = url.startsWith(item.route);
            const isExpanded = expandedItems[item.name] || false;
            const hasSubMenus = item.subMenus && item.subMenus.length > 0;
            const Icon = item.icon;

            return (
              <React.Fragment key={item.name}>
                {hasSubMenus ? (
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`
                      flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl transition-all
                      ${
                        isActive
                          ? "font-semibold"
                          : "opacity-80 hover:opacity-100"
                      }
                    `}
                    style={{
                      backgroundColor: isActive
                        ? currentPalette.activeItem
                        : "transparent",
                      color: isActive
                        ? currentPalette.activeText
                        : currentPalette.sidebarText,
                    }}>
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-5 h-5"
                        style={{
                          color: isActive
                            ? currentPalette.activeText
                            : currentPalette.sidebarText,
                        }}
                      />
                      <span
                        className="text-sm md:text-base"
                        style={{
                          color: isActive
                            ? currentPalette.activeText
                            : currentPalette.sidebarText,
                        }}>
                        {item.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      style={{
                        color: isActive
                          ? currentPalette.activeText
                          : currentPalette.sidebarText,
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.route}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive ? "font-semibold shadow-inner" : ""}
                    `}
                    style={{
                      backgroundColor: isActive
                        ? currentPalette.activeItem
                        : "transparent",
                      color: isActive
                        ? currentPalette.activeText
                        : currentPalette.sidebarText,
                    }}>
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color: isActive
                          ? currentPalette.activeText
                          : currentPalette.sidebarText,
                      }}
                    />
                    <span
                      className="text-sm md:text-base"
                      style={{
                        color: isActive
                          ? currentPalette.activeText
                          : currentPalette.sidebarText,
                      }}>
                      {item.name}
                    </span>
                  </Link>
                )}

                {/* Submenu Animation */}
                {hasSubMenus && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}>
                    <div
                      className="ml-9 mt-1 mb-2 space-y-1 pl-4"
                      style={{
                        borderLeft: `2px solid ${
                          currentPalette.activeBorder ||
                          currentPalette.sidebarText
                        }50`,
                      }}>
                      {item.subMenus.map((submenu) => {
                        const subRoute = `${
                          item.route
                        }/${submenu.id.toLowerCase()}`;
                        const isSubActive = url.startsWith(subRoute);
                        return (
                          <Link
                            key={submenu.id}
                            href={subRoute}
                            className="block py-2 text-sm transition-colors"
                            style={{
                              color: isSubActive
                                ? currentPalette.activeText
                                : currentPalette.sidebarText + "99", // 60% opacity
                            }}>
                            {submenu.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Action Footer */}
          <div
            className="pt-4 pb-8 mt-4"
            style={{
              borderTop: `1px solid ${
                currentPalette.activeItem || currentPalette.sidebarText
              }50`,
            }}>
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition-all w-full text-left group"
              style={{
                color: currentPalette.sidebarText + "99", // 60% opacity
              }}>
              <LogOut
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                style={{ color: "inherit" }}
              />
              <span className="text-sm md:text-base">Exit System</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
