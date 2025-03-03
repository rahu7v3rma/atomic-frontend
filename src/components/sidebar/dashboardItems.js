// import {
//   BookOpen,
//   Briefcase,
//   Calendar,
//   CheckSquare,
//   CreditCard,
//   Grid,
//   Heart,
//   Layout,
//   List,
//   Map,
//   ShoppingBag,
//   Sun,
//   AtSign,
//   PieChart,
//   Sliders,
//   Users,
//   Settings,
// } from "react-feather";
// import { FaAmazon, FaShopify } from "react-icons/fa";
// import { BiLoader } from "react-icons/bi";
import AddIcon from "@mui/icons-material/Add";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StoreIcon from "@mui/icons-material/Store";
// import { SiBrandfolder } from "react-icons/si";

import { ReactComponent as ProductManagement } from "../../vendor/product-management.svg";

// const pagesSection = [
//   {
//     href: "/dashboard",
//     icon: Sliders,
//     title: "Dashboard",
//     children: [
//       {
//         href: "/dashboard/default",
//         title: "Default",
//       },
//       {
//         href: "/dashboard/analytics",
//         title: "Analytics",
//       },
//       {
//         href: "/dashboard/saas",
//         title: "SaaS",
//       },
//     ],
//   },
//   {
//     href: "/pages",
//     icon: Layout,
//     title: "Pages",
//     children: [
//       {
//         href: "/pages/profile",
//         title: "Profile",
//       },
//       {
//         href: "/pages/settings",
//         title: "Settings",
//       },
//       {
//         href: "/pages/pricing",
//         title: "Pricing",
//       },
//       {
//         href: "/pages/chat",
//         title: "Chat",
//       },
//       {
//         href: "/pages/blank",
//         title: "Blank Page",
//       },
//     ],
//   },
//   {
//     href: "/projects",
//     icon: Briefcase,
//     title: "Projects",
//     badge: "8",
//   },
//   {
//     href: "/orders",
//     icon: ShoppingCart,
//     title: "Orders",
//   },
//   {
//     href: "/invoices",
//     icon: CreditCard,
//     title: "Invoices",
//     children: [
//       {
//         href: "/invoices",
//         title: "List",
//       },
//       {
//         href: "/invoices/detail",
//         title: "Detail",
//       },
//     ],
//   },
//   {
//     href: "/tasks",
//     icon: CheckSquare,
//     title: "Tasks",
//     badge: "17",
//   },
//   {
//     href: "/calendar",
//     icon: Calendar,
//     title: "Calendar",
//   },
//   {
//     href: "/auth",
//     icon: Users,
//     title: "Auth",
//     children: [
//       {
//         href: "/auth/sign-in",
//         title: "Sign In",
//       },
//       {
//         href: "/auth/sign-up",
//         title: "Sign Up",
//       },
//       {
//         href: "/auth/reset-password",
//         title: "Reset Password",
//       },
//       {
//         href: "/auth/404",
//         title: "404 Page",
//       },
//       {
//         href: "/auth/500",
//         title: "500 Page",
//       },
//     ],
//   },
// ];

// const elementsSection = [
//   {
//     href: "/components",
//     icon: Grid,
//     title: "Components",
//     children: [
//       {
//         href: "/components/alerts",
//         title: "Alerts",
//       },
//       {
//         href: "/components/accordion",
//         title: "Accordion",
//       },
//       {
//         href: "/components/avatars",
//         title: "Avatars",
//       },
//       {
//         href: "/components/badges",
//         title: "Badges",
//       },
//       {
//         href: "/components/buttons",
//         title: "Buttons",
//       },
//       {
//         href: "/components/cards",
//         title: "Cards",
//       },
//       {
//         href: "/components/chips",
//         title: "Chips",
//       },
//       {
//         href: "/components/dialogs",
//         title: "Dialogs",
//       },
//       {
//         href: "/components/lists",
//         title: "Lists",
//       },
//       {
//         href: "/components/menus",
//         title: "Menus",
//       },
//       {
//         href: "/components/pagination",
//         title: "Pagination",
//       },
//       {
//         href: "/components/progress",
//         title: "Progress",
//       },
//       {
//         href: "/components/snackbars",
//         title: "Snackbars",
//       },
//       {
//         href: "/components/tooltips",
//         title: "Tooltips",
//       },
//     ],
//   },
//  {
//    href: "/charts",
//    icon: PieChart,
//    title: "Charts",
//  },
//   {
//     href: "/forms",
//     icon: CheckSquare,
//     title: "Forms",
//     children: [
//       {
//         href: "/forms/pickers",
//         title: "Pickers",
//       },
//       {
//         href: "/forms/selection-controls",
//         title: "Selection Controls",
//       },
//       {
//         href: "/forms/selects",
//         title: "Selects",
//       },
//       {
//         href: "/forms/text-fields",
//         title: "Text Fields",
//       },
//       {
//         href: "/forms/editors",
//         title: "Editors",
//       },
//       {
//         href: "/forms/formik",
//         title: "Formik",
//       },
//     ],
//   },
//   {
//     href: "/tables",
//     icon: List,
//     title: "Tables",
//     children: [
//       {
//         href: "/tables/simple-table",
//         title: "Simple Table",
//       },
//       {
//         href: "/tables/advanced-table",
//         title: "Advanced Table",
//       },
//       {
//         href: "/tables/data-grid",
//         title: "Data Grid",
//       },
//     ],
//   },
//   {
//     href: "/icons",
//     icon: Heart,
//     title: "Icons",
//     children: [
//       {
//         href: "/icons/material-icons",
//         title: "Material Icons",
//       },
//       {
//         href: "/icons/feather-icons",
//         title: "Feather Icons",
//       },
//     ],
//   },
//   {
//     href: "/maps",
//     icon: Map,
//     title: "Maps",
//     children: [
//       {
//         href: "/maps/google-maps",
//         title: "Google Maps",
//       },
//       {
//         href: "/maps/vector-maps",
//         title: "Vector Maps",
//       },
//     ],
//   },
// ];

// const docsSection = [
//   {
//     href: "/documentation/welcome",
//     icon: BookOpen,
//     title: "Documentation",
//   },
//   {
//     href: "/changelog",
//     icon: List,
//     title: "Changelog",
//     badge: "v3.2.1",
//   },
// ];
const pages = [
  // {
  //   href: "/piplines",
  //   icon: Sliders,
  //   title: "Pipeline",
  // },
  {
    href: "#",
    icon: StoreIcon,
    title: "Store Management",
    children: [
      {
        title: "Store Page",
        href: "/store-management",
        icon: StarBorderIcon,
      },
      {
        title: "Operations Management",
        href: "/sm-product-list",
        icon: StarBorderIcon,
      },
      {
        title: "Goals & KPIs",
        href: "/sm-planning",
        icon: StarBorderIcon,
      },
      // {
      //   title: "Analytics",
      //   href: "/sm-analytics",
      //   icon: StarBorderIcon,
      // },
      // {
      //   title: "Snappy Settings",
      //   href: "/sm-snappy-settings",
      //   icon: StarBorderIcon,
      // },
      {
        title: "Advanced Report",
        href: `/advanced-business-report`,
        icon: StarBorderIcon,
      },
      {
        title: "Competitors",
        href: `/sm-competitors`,
        icon: StarBorderIcon,
      },
    ],
  },
  {
    href: "#",
    icon: ProductManagement,
    title: "Product Management",
    children: [
      {
        title: "Product Page",
        href: `/store-product-detail`,
        icon: StarBorderIcon,
      },
      // {
      //   title: "Keywords & Search Funnel",
      //   href: `/pm-keywords-and-search`,
      //   icon: StarBorderIcon,
      // },
      // {
      //   title: "Review Analysis",
      //   href: `/pm-review-analysis`,
      //   icon: StarBorderIcon,
      // },
    ],
  },
  {
    href: "/NicheAnalysis",
    icon: BubbleChartIcon,
    title: "Niche",
    children: [
      {
        title: "Scrape",
        href: "/brand",
        icon: AddIcon,
        type: "new_report",
      },
      {
        title: "Analysis",
        href: "/NicheAnalysis",
        icon: BubbleChartIcon,
      },
      {
        title: "Ranking",
        href: "/NicheRanking",
        icon: SignalCellularAltIcon,
      },
    ],
  },
  // {
  //   href: "/",
  //   icon: Layout,
  //   title: "Category playbook",
  //   children: [
  //     {
  //       href: "/",
  //       icon: FaAmazon,
  //       title: "Amazon",
  //     },
  //     {
  //       href: "/Walmart",
  //       icon: BiLoader,
  //       title: "Walmart",
  //     },
  //     {
  //       href: "/pages/Shopify",
  //       icon: FaShopify,
  //       title: "Shopify",
  //     },
  //   ],
  // },
];
const navItems = [
  {
    title: "Pages",
    pages: pages,
  },
  // {
  //   title: "Elements",
  //   pages: elementsSection,
  // },
  // {
  //   title: "Material App",
  //   pages: docsSection,
  // },
];

export default navItems;
