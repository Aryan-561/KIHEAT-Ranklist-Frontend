import LandingPage from "../../component/Landingpage/LandingPage";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <main className="w-full min-h-screen rounded-2xl flex justify-center items-start px-0.5">
            <Helmet>
                <title>KIHEAT Ranklist | GGSIPU </title>
                <meta
                    name="description"
                    content="Explore KIHEAT student performance, GGSIPU result analytics, CGPA ranklists, and dashboards for BCA, BBA, B.Com, BJMC, and B.Ed courses."
                />
                <meta
                    name="keywords"
                    content="KIHEAT, GGSIPU, Kamal Institute of Higher Education and Advance Technology, BCA Results, BBA Ranklist, BJMC CGPA, IPU , Indraprastha University, B.Ed, B.Com, Student Performance, Semester Analytics"
                />

                {/* Open Graph tags for social sharing */}
                <meta property="og:title" content="KIHEAT Ranklist | GGSIPU " />
                <meta
                    property="og:description"
                    content="Check KIHEAT student ranklists, GGSIPU course performance data, and real-time CGPA analytics."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kiheatranklist.vercel.app/" />
                <meta
                    property="og:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/opengraph.png"
                />

                {/* Twitter card meta */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="KIHEAT Ranklist | GGSIPU Student Dashboard" />
                <meta
                    name="twitter:description"
                    content="Explore ranklists, semester-wise results, and student dashboards for KIHEAT under GGSIPU."
                />
                <meta
                    name="twitter:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/opengraph.png"
                />
            </Helmet>

            <LandingPage />
        </main>
    );
};

export default Home;
