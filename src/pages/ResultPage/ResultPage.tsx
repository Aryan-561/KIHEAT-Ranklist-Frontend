import React from "react";
import Batch from "../../component/Landingpage/Batch";
import { useParams } from "react-router-dom";
import ClassResultList from "../../component/Resultlist/ClassResultList";

const ResultPage:React.FC = ()=>{

    const {batch} = useParams();

    return(
        <>
            <div className="min-h-screen">
                <Batch/>
                {batch && <ClassResultList/>}
            </div>
        </>
    )

}

export default ResultPage ;