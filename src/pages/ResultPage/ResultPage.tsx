import React from "react";
import Batch from "../../component/Landingpage/Batch";
import { useParams } from "react-router-dom";
import ClassResultList from "../../component/Resultlist/ClassResultList";
import { Helmet } from "react-helmet";

const ResultPage: React.FC = () => {
    const { batch } = useParams();
    const batchTitle = batch ? `Batch ${batch}` : "All Batches";

    const ogImage = batch
        ? "https://kiheatranklist.vercel.app/seo/meta/classresult.png"
        : "https://kiheatranklist.vercel.app/seo/meta/opengraph.png";

    return (
        <>
            <Helmet>
                <title>{batchTitle} Results – KIHEAT | GGSIPU</title>
                <meta
                    name="description"
                    content={`Explore CGPA results and performance analytics for ${batchTitle} at KIHEAT under GGSIPU.`}
                />
                <meta
                    name="keywords"
                    content={`KIHEAT ${batchTitle} Results, GGSIPU BCA Results, Kamal Institute BBA BJMC B.Com B.Ed, IPU Student Ranklist`}
                />
                <meta property="og:title" content={`${batchTitle} Results – KIHEAT | GGSIPU`} />
                <meta
                    property="og:description"
                    content={`View ranklists and student performance dashboards for ${batchTitle} of KIHEAT.`}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://kiheatranklist.vercel.app/${batch || ""}`}
                />
                <meta property="og:image" content={ogImage} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${batchTitle} Results – KIHEAT | GGSIPU`} />
                <meta
                    name="twitter:description"
                    content={`See the result analytics and CGPA ranklists for ${batchTitle} at KIHEAT.`}
                />
                <meta name="twitter:image" content={ogImage} />
            </Helmet>

            <div className="min-h-screen">
                <Batch />
                {batch && <ClassResultList />}
            </div>
        </>
    );
};

export default ResultPage;
