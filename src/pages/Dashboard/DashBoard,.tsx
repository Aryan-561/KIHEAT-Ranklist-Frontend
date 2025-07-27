import { Helmet } from "react-helmet";
import StudentDashBoard from "../../component/DashBoard/DashBoard";

const DashBoard = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard – KIHEAT | Student Performance & CGPA Insights</title>
                <meta
                    name="description"
                    content="Visualize student performance with CGPA trends, semester-wise analytics, and batch-wise rank insights at KIHEAT under GGSIPU."
                />
                <meta
                    name="keywords"
                    content="KIHEAT Dashboard, GGSIPU Student Analytics, Semester Analysis, CGPA Trends, Performance Insights, Rank Visualization"
                />

                {/* Open Graph for social preview */}
                <meta property="og:title" content="KIHEAT Dashboard – CGPA & Semester Insights" />
                <meta
                    property="og:description"
                    content="Analyze student CGPA, performance trends, and ranklists semester-wise in a visual dashboard format."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kiheatranklist.vercel.app/student" />
                <meta
                    property="og:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/dashboard.png"
                />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="KIHEAT Dashboard – Student Performance" />
                <meta
                    name="twitter:description"
                    content="View CGPA analytics and semester-wise performance for KIHEAT students under GGSIPU."
                />
                <meta
                    name="twitter:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/dashboard.png"
                />
            </Helmet>

            <StudentDashBoard />
            <div style={{ display: "none" }}>
                <img src="/seo/meta/dashboard.png" alt="Main dashboard overview" />
                <img src="/seo/meta/performaceInsights.png" alt="Performance Insights Chart" />
                <img src="/seo/meta/semesteranalisys.png" alt="Semester Analysis Chart" />
            </div>
        </>
    );
};

export default DashBoard;
