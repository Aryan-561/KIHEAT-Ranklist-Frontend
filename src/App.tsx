import type { FC } from "react";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import {
  FloatingParticles,
  ScrollToTop,
} from "./component/Landingpage/LandingPage";
import { Helmet } from "react-helmet";

const App: FC = () => {
  return (
    <>
      <div className="min-h-screen w-full box-border p-2 bg-gradient-to-br from-green-200 to-blue-200 text-white">
        <Helmet>
          {/* Basic SEO */}
          <title>KIHEAT Ranklist</title>
          <meta
            name="description"
            content="Explore KIHEAT student ranklists, CGPA insights, and performance dashboards across GGSIPU colleges including Kamal Institute and more."
          />
          <meta
            name="keywords"
            content="KIHEAT, Ranklist, Student Dashboard, CGPA, GGSIPU, IPU, Guru Gobind Singh Indraprastha University, Kamal Institute of Higher Education and Advance Technology, Kamal Institute of Higher Ed & Tech, Kamal Model School, BCA, BBA, B.Com, BJMC, B.Ed"
          />

          {/* Open Graph */}
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

          {/* Twitter Card */}
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

          {/* Favicon and Theme */}
          <link rel="icon" href="/seo/logo.png" />
          <meta name="msapplication-TileColor" content="#0f172a" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#166534" />
          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-W0NK9M06ZM"
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W0NK9M06ZM');
            `}
          </script>

          {/* Structured Data - JSON-LD */}
          <script type="application/ld+json">
            {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "KIHEAT RankList",
            "url": "https://kiheatranklist.vercel.app",
            "description": "Explore KIHEAT student ranklists, CGPA insights, and dashboards for GGSIPU colleges.",
            "publisher": {
              "@type": "Organization",
              "name": "KIHEAT",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kiheatranklist.vercel.app/seo/logo.png"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kiheatranklist.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`}
          </script>
          <link rel="canonical" href="https://kiheatranklist.vercel.app" />

        </Helmet>

        {/* Layout */}
        <Navbar />
        <ScrollToTop />
        <Outlet />
        <FloatingParticles bg={"bg-emerald-600/10"} />
        <Footer />
      </div>
    </>
  );
};

export default App;
