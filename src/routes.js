import React from "react";

import async from "./components/Async";
// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size
// Layouts
import AuthGuard from "./components/guards/AuthGuard";
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import PresentationLayout from "./layouts/Presentation";
// Auth components
import Login from "./pages/auth/Login";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
// Components
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Avatars from "./pages/components/Avatars";
import Badges from "./pages/components/Badges";
import Buttons from "./pages/components/Buttons";
import Cards from "./pages/components/Cards";
import Chips from "./pages/components/Chips";
import Dialogs from "./pages/components/Dialogs";
import Lists from "./pages/components/Lists";
import Menus from "./pages/components/Menus";
import Pagination from "./pages/components/Pagination";
import Progress from "./pages/components/Progress";
import Snackbars from "./pages/components/Snackbars";
import Tooltips from "./pages/components/Tooltips";
// Form components
import StoreManagement from "./pages/dashboards/StoreManagement";
import ProductSKUDashboard from "./pages/dashboards/StoreManagement/components/ProductSKUDashboard";
import ReviewAnalysis from "./pages/dashboards/StoreManagement/components/ReviewAnalysis";
import ReviewsDetailedReport from "./pages/dashboards/StoreManagement/components/ReviewsDetailedReport";
import StoreAnalysis from "./pages/dashboards/StoreManagement/components/StoreAnalysis";
import AnalyticsStoreProductDetails from "./pages/dashboards/StoreManagement/components/StoreProductDetails/Analytics";
import Business from "./pages/dashboards/StoreManagement/components/StoreProductDetails/Business";
import Insights from "./pages/dashboards/StoreManagement/components/StoreProductDetails/Insights";
import StoreProducts from "./pages/dashboards/StoreManagement/components/StoreProducts";
import APICalls from "./pages/docs/APICalls";
import Changelog from "./pages/docs/Changelog";
import Deployment from "./pages/docs/Deployment";
import ESLintAndPrettier from "./pages/docs/ESLintAndPrettier";
import EnvironmentVariables from "./pages/docs/EnvironmentVariables";
import GettingStarted from "./pages/docs/GettingStarted";
import Guards from "./pages/docs/Guards";
import Internationalization from "./pages/docs/Internationalization";
import MigratingToNextJS from "./pages/docs/MigratingToNextJS";
import Redux from "./pages/docs/Redux";
import Routing from "./pages/docs/Routing";
import Support from "./pages/docs/Support";
import Theming from "./pages/docs/Theming";
import Welcome from "./pages/docs/Welcome";
import Auth0 from "./pages/docs/auth/Auth0";
import Cognito from "./pages/docs/auth/Cognito";
import Firebase from "./pages/docs/auth/Firebase";
import JWT from "./pages/docs/auth/JWT";
import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";
// Icon components
import MaterialIcons from "./pages/icons/MaterialIcons";
// Page components
import BrandScorecard from "./pages/pages/BrandScorecard";
import InvoiceDetails from "./pages/pages/InvoiceDetails";
import InvoiceList from "./pages/pages/InvoiceList";
import NicheAnalysis from "./pages/pages/NicheAnalysis";
import NicheRanking from "./pages/pages/NicheRanking";
import Orders from "./pages/pages/Orders";
// import Pricing from "./pages/pages/Pricing";
// import Settings from "./pages/pages/Settings";
import Projects from "./pages/pages/Projects";
// import Chat from "./pages/pages/Chat";
// Table components
import Landing from "./pages/presentation/Landing";
import ProtectedPage from "./pages/protected/ProtectedPage";
import AdvancedTable from "./pages/tables/AdvancedTable";
import SimpleTable from "./pages/tables/SimpleTable";

// Documentation

// Landing

// Protected routes

// import Amazon from "./pages/dashboards/Amazon/Main";
// import SubCategory from "./pages/dashboards/Analytics/SubCategory";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
// const Analytics = async(() => import("./pages/dashboards/Analytics"));
const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
// const Profile = async(() => import("./pages/pages/Profile"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));

const routes = [
  {
    path: "/landing",
    element: <PresentationLayout />,
    children: [
      {
        path: "/landing",
        element: <Landing />,
      },
    ],
  },
  {
    path: "",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "NicheAnalysis",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <NicheAnalysis />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "NicheRanking",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <NicheRanking />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "brand",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <BrandScorecard />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "brand/:id",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <BrandScorecard />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "store-management",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "sm-product-list",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "sm-planning",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "advanced-business-report",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "sm-analytics",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "sm-snappy-settings",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "store-dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreAnalysis />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "store-product-detail",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ProductSKUDashboard />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: "pm-keywords-and-search",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ProductSKUDashboard />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: "sm-competitors",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreManagement />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: "pm-review-analysis",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ProductSKUDashboard />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: "store-products",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <StoreProducts />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },

  {
    path: "store-insights",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Insights />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "business",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Business />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "reviews-analysis",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ReviewAnalysis />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "review-report",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ReviewsDetailedReport />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [],
  },
  {
    path: "pipeline",
    element: <DashboardLayout />,
    children: [
      {
        path: "default",
        element: <Default />,
      },
      {
        path: "saas",
        element: <SaaS />,
      },
    ],
  },
  {
    path: "projects",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Projects />,
      },
    ],
  },
  {
    path: "invoices",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <InvoiceList />,
      },
      {
        path: "detail",
        element: <InvoiceDetails />,
      },
    ],
  },
  {
    path: "orders",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Orders />,
      },
    ],
  },
  {
    path: "tasks",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Tasks />,
      },
    ],
  },
  {
    path: "calendar",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
      {
        path: "reset_password/:id/:timestamp",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "components",
    element: <DashboardLayout />,
    children: [
      {
        path: "accordion",
        element: <Accordion />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "chips",
        element: <Chips />,
      },
      {
        path: "dialogs",
        element: <Dialogs />,
      },
      {
        path: "lists",
        element: <Lists />,
      },
      {
        path: "menus",
        element: <Menus />,
      },
      {
        path: "pagination",
        element: <Pagination />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
      {
        path: "snackbars",
        element: <Snackbars />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
    ],
  },
  {
    path: "forms",
    element: <DashboardLayout />,
    children: [
      {
        path: "pickers",
        element: <Pickers />,
      },
      {
        path: "selection-controls",
        element: <SelectionCtrls />,
      },
      {
        path: "selects",
        element: <Selects />,
      },
      {
        path: "text-fields",
        element: <TextFields />,
      },
      {
        path: "editors",
        element: <Editors />,
      },
      {
        path: "formik",
        element: <Formik />,
      },
    ],
  },
  {
    path: "tables",
    element: <DashboardLayout />,
    children: [
      {
        path: "simple-table",
        element: <SimpleTable />,
      },
      {
        path: "advanced-table",
        element: <AdvancedTable />,
      },
      {
        path: "data-grid",
        element: <DataGrid />,
      },
    ],
  },
  {
    path: "icons",
    element: <DashboardLayout />,
    children: [
      {
        path: "material-icons",
        element: <MaterialIcons />,
      },
      {
        path: "feather-icons",
        element: <FeatherIcons />,
      },
    ],
  },
  {
    path: "documentation",
    element: <DocLayout />,
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "getting-started",
        element: <GettingStarted />,
      },
      {
        path: "routing",
        element: <Routing />,
      },
      {
        path: "auth/auth0",
        element: <Auth0 />,
      },
      {
        path: "auth/cognito",
        element: <Cognito />,
      },
      {
        path: "auth/firebase",
        element: <Firebase />,
      },
      {
        path: "auth/jwt",
        element: <JWT />,
      },
      {
        path: "guards",
        element: <Guards />,
      },
      {
        path: "environment-variables",
        element: <EnvironmentVariables />,
      },
      {
        path: "deployment",
        element: <Deployment />,
      },
      {
        path: "theming",
        element: <Theming />,
      },
      {
        path: "api-calls",
        element: <APICalls />,
      },
      {
        path: "redux",
        element: <Redux />,
      },
      {
        path: "internationalization",
        element: <Internationalization />,
      },
      {
        path: "eslint-and-prettier",
        element: <ESLintAndPrettier />,
      },
      {
        path: "migrating-to-next-js",
        element: <MigratingToNextJS />,
      },
      {
        path: "support",
        element: <Support />,
      },
    ],
  },
  {
    path: "changelog",
    element: <DocLayout />,
    children: [
      {
        path: "",
        element: <Changelog />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "dev/store-products/analytics",
    element: <AnalyticsStoreProductDetails />,
  },
];

export default routes;
