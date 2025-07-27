import SearchPage from "../../component/Search/Search";
import { Helmet } from "react-helmet";

function Search() {
    return (
        <>
            <Helmet>
                <title>Search Student Results – KIHEAT | GGSIPU</title>
                <meta
                    name="description"
                    content="Search students of KIHEAT under GGSIPU by name, enrollment number, batch, or course. View their CGPA, rank, and semester-wise performance."
                />
                <meta
                    name="keywords"
                    content="KIHEAT Search, Student Result Lookup, GGSIPU Search, Kamal Institute Results, BCA BBA B.Com BJMC B.Ed, KIHEAT Dashboard"
                />
                <meta property="og:title" content="Search Student Results – KIHEAT | GGSIPU" />
                <meta
                    property="og:description"
                    content="Find KIHEAT student results, ranks, and CGPA using our smart search engine."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kiheatranklist.vercel.app/search" />
                <meta
                    property="og:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/search.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Search Student Results – KIHEAT | GGSIPU" />
                <meta
                    name="twitter:description"
                    content="Search KIHEAT students by name, batch, or enrollment number to view CGPA and performance data."
                />
                <meta
                    name="twitter:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/search.png"
                />
            </Helmet>

            <SearchPage />
        </>
    );
}

export default Search;
