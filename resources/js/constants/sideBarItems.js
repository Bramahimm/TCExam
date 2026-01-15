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
  { name: "Beranda", icon: Home, route: "admin.dashboard" },
  {
    name: "Pengguna",
    icon: Users,
    route: "admin.users.index",
    subMenus: [
      {
        name: "Kelola Pengguna",
        id: "Management",
        route: "admin.users.index",
        params: { section: "management" },
      },
      {
        name: "Grup Pengguna",
        id: "Groups",
        route: "admin.users.index",
        params: { section: "groups" },
      },
      {
        name: "Pilih Pengguna",
        id: "Selection",
        route: "admin.users.index",
        params: { section: "selection" },
      },
      {
        name: "Pengguna Online",
        id: "Online",
        route: "admin.users.index",
        params: { section: "online" },
      },
      {
        name: "Import",
        id: "Import",
        route: "admin.users.index",
        params: { section: "import" },
      },
      {
        name: "Hasil Individu",
        id: "Individual",
        route: "admin.users.index",
        params: { section: "individual" },
      },
    ],
  },

  {
    name: "Modules",
    icon: Package,
    route: "admin.modules.index",
    subMenus: [
      {
        name: "Modules",
        id: "Class",
        route: "admin.modules.index",
        params: { section: "class" },
      },
      {
        name: "Topic",
        id: "Questions",
        route: "admin.modules.index",
        params: { section: "questions" },
      },
      {
        name: "Questions",
        id: "Subjects",
        route: "admin.modules.index",
        params: { section: "subjects" },
      },
      {
        name: "Results",
        id: "Results",
        route: "admin.modules.index",
        params: { section: "results" },
      },
      {
        name: "Import",
        id: "Import",
        route: "admin.modules.index",
        params: { section: "import" },
      },
    ],
  },
  {
    name: "Tests",
    icon: ClipboardCheck,
    route: "admin.tests.index",
    subMenus: [
      {
        name: "Daftar Ujian",
        id: "Tests",
        route: "admin.tests.index",
        params: { section: "tests" }, 
      },
      {
        name: "Import Jawaban",
        id: "Answer",
        route: "admin.tests.index",
        params: { section: "answers" }, 
      },
      {
        name: "Omr Bulk Importer",
        id: "Bulk",
        route: "admin.tests.index",
        params: { section: "bulk" }, 
      },
      {
        name: "Evaluasi",
        id: "Evaluation",
        route: "admin.tests.index", 
        params: { section: "evaluation" },
      },
      {
        name: "Hasil Akhir Ujian",
        id: "Exam",
        route: "admin.tests.index",
        params: { section: "results" }, 
      },
      {
        name: "Ringkasan Mahasiswa",
        id: "Overview",
        route: "admin.tests.index", 
        params: { section: "overview" },
      },
      {
        name: "Statistics",
        id: "Statistics",
        route: "admin.tests.index", 
        params: { section: "statistics" },
      },
    ],
  },
  { name: "Backup", icon: Database, route: "#" },
  { name: "Public", icon: Globe, route: "#" },
  { name: "Help", icon: HelpCircle, route: "#" },
];
