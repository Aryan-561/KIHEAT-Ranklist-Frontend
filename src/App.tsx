import type { FC } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { services } from "./services/services";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./component/Landingpage/LandingPage";
const App: FC = () => {
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["programme-result", "bca", "2023"],
  //   queryFn: () => services.getProgrammeResult("bca", "2023"),
  //   enabled: false,
  // });

  return (
    <>
      <div className="min-h-screen w-full box-border p-2  bg-gradient-to-br from-green-300 to-lime-200 text-white"> 
        <Navbar/>
        <ScrollToTop/>
        <Outlet/>
        <Footer />
      </div>
    </>
  );
};

export default App;
