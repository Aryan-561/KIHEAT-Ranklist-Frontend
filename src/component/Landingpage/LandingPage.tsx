import React from "react";
import Card from "../Card/Card";
import { courses } from "../../constant/constant";
import TopStudentsCard from "../Card/TopStudentsCard";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12  ">
      {/* Welcome Heading */}
      <div className="text-center font-gabarito">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-2">
          Welcome to KIHEAT Ranklist
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          Your one-stop solution for all ranklist needs.
        </p>
      </div>

      {/* Department Courses */}
      <Card title="Department Results" fields={courses} />

      {/* Topper Section */}
      <div className="text-center my-6">
        <div className="mb-2 sm:mb-4 border-b-3 border-green-800 p-4">
          <h2 className="font-roboto-flex-600 font-bold text-xl sm:text-3xl mb-3 text-green-800">
            KIHEAT Top Students by Programme
          </h2>
          <p className="text-sm sm:text-lg text-gray-600">
            Explore the top students from each programme.(onward 2022)
          </p>
        </div>
        <TopStudentsCard />
      </div>
    </div>
  );
};

export default LandingPage;
