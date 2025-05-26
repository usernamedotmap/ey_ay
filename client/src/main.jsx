import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes//homepage/Home.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Chat from "./routes/chatpage/Chat.jsx";
import RootLayout from "./layout/rootLayout/RootLayout.jsx";
import DashboardLayout from "./layout/dashboardLayout/DashboardLayout.jsx";
import { Signin } from "./routes/signin/Signin.jsx";
import Signup from "./routes/signup/Signup.jsx";




const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/sign-in", Component: Signin },
      { path: "/sign-up", Component: Signup },
      {
        Component: DashboardLayout,
        children: [
          { path: "/dashboard", Component: Dashboard },
          { path: "/dashboard/chats/:id", Component: Chat },
        ],
      },
    ],
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
