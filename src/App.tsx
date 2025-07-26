import type { FC } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { services } from "./services/services";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FloatingParticles, ScrollToTop } from "./component/Landingpage/LandingPage";
const App: FC = () => {
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["programme-result", "bca", "2023"],
  //   queryFn: () => services.getProgrammeResult("bca", "2023"),
  //   enabled: false,
  // });

  return (
    <>
      <div className="min-h-screen w-full box-border p-2    bg-gradient-to-br from-green-200 to-blue-200 text-white">
        <Navbar />
        <ScrollToTop />

        <Outlet />
        <FloatingParticles bg={"bg-emerald-600/10"}/>
        <Footer />
      </div>
    </>
  );
};

export default App;
