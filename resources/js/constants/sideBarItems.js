import {
  Home,
  Users,
  Package,
  ClipboardCheck,
  Database,
  Globe,
  HelpCircle,

} from "lucide-react";
export const SideBarItems = [
    { name: "Index", icon: Home, route: "/admin" },
    {
      name: "Users",
      icon: Users,
      route: "/admin/users",
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
      icon: Package,
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
    { name: "Tests", icon: ClipboardCheck, route: "/admin/tests" },
    { name: "Backup", icon: Database, route: "/admin/backup" },
    { name: "Public", icon: Globe, route: "/admin/public" },
    { name: "Help", icon: HelpCircle, route: "/admin/help" },
  ];