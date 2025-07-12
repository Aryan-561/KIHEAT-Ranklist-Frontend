import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Batch from "./component/Landingpage/Batch.tsx";
import ClassResultList from "./component/Resultlist/ClassResultList.tsx";
import Search from "./component/Search/Search.tsx";
import DashBoard from "./component/DashBoard/DashBoard.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path:"/:course",
        element: <Batch />,
      },
      {
        path:"/:course/:year",
        element: <ClassResultList/>,
      },
      {
        path:"/search/:enroll",
        element: <DashBoard/>,
      }
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
