import type { FC } from "react";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FloatingParticles, ScrollToTop } from "./component/Landingpage/LandingPage";
import { Helmet } from "react-helmet";
const App: FC = () => {


  return (
    <>
      <div className="min-h-screen w-full box-border p-2    bg-gradient-to-br from-green-200 to-blue-200 text-white">
        <Helmet>
          <title>KIHEAT Ranklist</title>
          <meta
            name="description"
            content="Explore KIHEAT student ranklists, CGPA insights, and performance dashboards across GGSIPU colleges including Kamal Institute and more."
          />
          <meta
            name="keywords"
            content="KIHEAT, Ranklist, Student Dashboard, CGPA, GGSIPU, IPU, Guru Gobind Singh Indraprastha University, Kamal Institute of Higher Education and Advance Technology, Kamal Institute of Higher Ed & Tech, Kamal Model School, BCA, BBA, B.Com, BJMC, B.Ed"
          />

          <meta property="og:title" content="KIHEAT Ranklist" />
          <meta
            property="og:description"
            content="Explore KIHEAT ranklists and performance dashboards for GGSIPU and affiliated colleges."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kiheatranklist.vercel.app" />
          <meta
            property="og:image"
            content="https://kiheatranklist.vercel.app/seo/meta/opengraph.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="KIHEAT Ranklist" />
          <meta
            name="twitter:description"
            content="Explore KIHEAT ranklists and performance dashboards for GGSIPU students."
          />
          <meta
            name="twitter:image"
            content="https://kiheatranklist.vercel.app/seo/meta/opengraph.png"
          />

          <link rel="icon" href="/seo/logo.png" />
          <meta name="theme-color" content="#0f172a" />
        </Helmet>

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
