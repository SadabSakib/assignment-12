import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import Users from "./components/Users.jsx";
import NotFound from "./components/NotFound.jsx";
// import Main from "./components/Main.jsx";
import Home from "./components/Home.jsx";
import PrivateRoute from "./components/Visa/PrivateRoute.jsx";
// import AllVisas from "./components/Visa/AllVisas.jsx";
import Main from "./components/Visa/Main.jsx";
// import AddVisa from "./components/Visa/AddVisa.jsx";
// import AddVisaByAdmin from "./components/Visa/AddVisaByAdmin.jsx";
// import MyAddedVisas from "./components/Visa/MyAddedVisas.jsx";
// import MyVisaApplications from "./components/Visa/MyVisaApplications.jsx";
// import VisaDetails from "./components/Visa/VisaDetails/VisaDetails.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Users2 from "./components/Dashboard.jsx";
import AllUsers from "./components/Visa/AllUsers.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Payment from "./components/Payment/Payment.jsx";
import PaymentHistory from "./components/Payment/PaymentHistory.jsx";
import UserHome from "./components/Dashboard/UserHome.jsx";
import AdminHome from "./components/Dashboard/AdminHome.jsx";
import PackageDetails from "./Pages/PackageDetails.jsx";
import PackagesAndtourguides from "./Pages/PackagesAndtourguides.jsx";
import About from "./Pages/About.jsx";
import Community from "./Pages/Community.jsx";
import TourGuideProfile from "./Pages/TourGuideProfile.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import AddStory from "./Pages/AddStory.jsx";
import ManageStories from "./Pages/ManageStories.jsx";
import TouristDashboard from "./Pages/TouristDashboard/TouristDashboard.jsx";
import TouristBookings from "./Pages/TouristDashboard/TouristBookings.jsx";
import TouristProfile from "./Pages/TouristDashboard/TouristProfile.jsx";
import TouristStories from "./Pages/TouristDashboard/TouristStories.jsx";
import JoinGuide from "./Pages/TouristDashboard/JoinGuide.jsx";
import TourGuideProfileDashboard from "./Pages/TourGuideDashboard/TourGuideProfileDashboard.jsx";
import TourGuideDashboard from "./Pages/TourGuideDashboard/TourGuideDashboard.jsx";
import GuideStories from "./Pages/TourGuideDashboard/GuideStories.jsx";
import GuideTours from "./Pages/TourGuideDashboard/GuideTours.jsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
import AdminProfile from "./Pages/AdminDashboard/AdminProfile.jsx";
import AdminPackages from "./Pages/AdminDashboard/AdminPackages.jsx";
import AdminUsers from "./Pages/AdminDashboard/AdminUsers.jsx";
import AdminCandidates from "./Pages/AdminDashboard/AdminCandidates.jsx";
import AllTrips from "./Pages/AllTrips.jsx";
import EditStory from "./Pages/EditStory .jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/all-visas",
//         element: <AllVisas />,
//         loader: () => fetch("https://assignment-12-server-beige-two.vercel.app/visas"),
//       },
//       {
//         path: "/add-visa",
//         element: (
//           <PrivateRoute>
//             <AddVisa />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/my-added-visas",
//         element: (
//           <PrivateRoute>
//             <MyAddedVisas />
//           </PrivateRoute>
//         ),
//         // loader: ({params}) => fetch("https://assignment-12-server-beige-two.vercel.app/coffee"),
//       },
//       {
//         path: "/add-visas-by-admin-only",
//         element: (
//           <AdminRoute>
//             <AddVisaByAdmin />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "/my-visa-applications",
//         element: (
//           <PrivateRoute>
//             <MyVisaApplications />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/payment",
//         element: <Payment></Payment>,
//       },
//       // {
//       //   path: "paymentHistory",
//       //   element: <PaymentHistory></PaymentHistory>,
//       // },
//       {
//         path: "/visa/:id",
//         element: (
//           <PrivateRoute>
//             <VisaDetails />
//           </PrivateRoute>
//         ),
//         loader: ({ params }) =>
//           fetch(`https://assignment-12-server-beige-two.vercel.app/visa/${params.id}`),
//       },
//       {
//         path: "/login",
//         element: <SignIn />,
//       },
//       {
//         path: "/register",
//         element: <SignUp />,
//       },
//       {
//         path: "*",
//         element: <NotFound />,
//       },
//       {
//         path: "/users2",
//         element: <Users2></Users2>,
//         loader: () => fetch("/https://assignment-12-server-beige-two.vercel.app/users"),
//       },
//     ],
//   },
//   // admin routes
//   {
//     path: "/dashboard",
//     element: <Dashboard></Dashboard>,
//     children: [
//       {
//         path: "",
//         element: <h1>Absolute children</h1>,
//       },
//       {
//         path: 'userHome',
//         element: <UserHome></UserHome>,
//       },
//       {
//         path: 'adminHome',
//         element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
//       },
//       {
//         path: "users",
//         element: (
//           <AdminRoute>
//             <AllUsers></AllUsers>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "paymentHistory",
//         element: <PaymentHistory></PaymentHistory>,
//       }
//     ],
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/AllTrips", element: <AllTrips /> },
      { path: "/login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "/about", element: <About /> },
      { path: "/community", element: <Community /> },
      { path: "/PackagesAndtourguides", element: <PackagesAndtourguides /> },
      { path: "/package/:id", element: <PackageDetails /> },
      { path: "/tour-guide/:id", element: <TourGuideProfile /> },
      { path: "*", element: <NotFound /> },
      { path: "/users", element: <AllUsers /> },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        {" "}
        <UserProfile />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/stories",
    element: <AddStory />,
    // element: (
    //   <PrivateRoute>
    //     {" "}
    //     <AddStory />{" "}
    //   </PrivateRoute>
    // ),
  },
  {
    path: "/my-stories",
    element: (
      <PrivateRoute>
        {" "}
        <ManageStories />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/edit-story/:id",
    // element: (
    //   <PrivateRoute>
    //     {" "}
    //     <EditStory />{" "}
    //   </PrivateRoute>
    // ),
    element: <EditStory />,
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        {" "}
        <Payment />{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    // element: (
    //   <PrivateRoute>
    //     {" "}
    //     <Dashboard />{" "}
    //   </PrivateRoute>
    // ),
    element: <Dashboard />,
    children: [
      { path: "profile", element: <TouristProfile /> },
      { path: "bookings", element: <TouristBookings /> },
      { path: "addStory", element: <AddStory /> },
      { path: "stories", element: <ManageStories /> },
      { path: "join-guide", element: <JoinGuide /> },

      { path: "profile", element: <TourGuideProfileDashboard /> },
      { path: "tours", element: <GuideTours /> },
      { path: "addStory", element: <AddStory /> },
      { path: "stories", element: <ManageStories /> },
      {
        path: "manageStories",
        element: (
          <PrivateRoute>
            {" "}
            <ManageStories />{" "}
          </PrivateRoute>
        ),
      },

      // { path: "profile", element: <AdminProfile /> },
      // { path: "packages", element: <AdminPackages /> },
      // { path: "users", element: <AdminUsers /> },
      // { path: "candidates", element: <AdminCandidates /> },

      { path: "manageProfile", element: <AdminProfile /> },
      { path: "addpackages", element: <AdminPackages /> },
      { path: "candidates", element: <AdminCandidates /> },
      { path: "manageUsers", element: <AllUsers /> },
    ],
  },
]);
// export default router;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
