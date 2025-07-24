import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import BatchPage from "./pages/Batch/BatchPage.tsx";
import Search from "./component/Search/Search.tsx";
import DashBoard from "./component/DashBoard/DashBoard.tsx";
import _404_page from "./component/404/404.tsx";
import AboutPage from "./pages/Home/About.tsx";
import ResultPage from "./pages/ResultPage/ResultPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<_404_page/>,
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
        path: "/about",
        element: <AboutPage />,
      },
      {
        path:"/:course",
        element: <BatchPage />,
      },
      {
        path:"/:course/:batch",
        element: <ResultPage />,
      },
      {
        path:"/student/:enroll",
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
