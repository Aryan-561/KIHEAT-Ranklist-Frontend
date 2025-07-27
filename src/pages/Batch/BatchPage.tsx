import React from "react";
import Batch from "../../component/Landingpage/Batch";
import { Helmet } from "react-helmet";

const BatchPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Available Batches – KIHEAT | GGSIPU</title>
                <meta
                    name="description"
                    content="Browse available batches for BCA, BBA, B.Com, BJMC, B.Ed programs under GGSIPU including Kamal Institute of Higher Education and Advanced Technology (KIHEAT)."
                />
                <meta
                    name="keywords"
                    content="KIHEAT Batches, GGSIPU BCA Batches, IPU Batch List, Kamal Institute BBA BJMC B.Com B.Ed, Guru Gobind Singh Indraprastha University, KIHEAT Ranklist"
                />
                {/* Open Graph tags */}
                <meta property="og:title" content="Available Batches – KIHEAT | GGSIPU" />
                <meta
                    property="og:description"
                    content="Find all available student batches across BCA, BBA, B.Com, BJMC, and B.Ed courses at KIHEAT under GGSIPU."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kiheatranklist.vercel.app/batch" />
                <meta
                    property="og:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/batches.png"
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Available Batches – KIHEAT | GGSIPU" />
                <meta
                    name="twitter:description"
                    content="View all batches for BCA, BBA, B.Com, BJMC, and B.Ed students under GGSIPU, Kamal Institute."
                />
                <meta
                    name="twitter:image"
                    content="https://kiheatranklist.vercel.app/seo/meta/batches.png"
                />
            </Helmet>

            <Batch />
        </div>
    );
};

export default BatchPage;
