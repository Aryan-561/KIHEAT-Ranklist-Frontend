import React from "react";
import Card from "../Card/Card";
import { courses } from "../../constant/constant";
import { Link } from "react-router-dom";
const LandingPage: React.FC = () => {



    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-12  ">
            {/* Welcome Heading */}
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">Welcome to KIHEAT Ranklist</h1>
                <p className="text-lg text-gray-600">Your one-stop solution for all ranklist needs.</p>
            </div>

            {/* Department Courses */}
            <Card
                title="Department Results"
                fields={courses}
            />

            {/* Topper Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-800 mb-6">KIHEAT Department Topper List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
                    {[1, 2, 3,].map((_, i) => (
                        <Link
                            to={"/path"}
                            key={i}
                            className="bg-stone-100 border-black/30 p-4 rounded-xl shadow-md border text-center hover:bg-green-100 transition"
                        >
                            <img
                                src="/icon.png"
                                alt={`Topper ${i + 1}`}
                                className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-green-300"
                            />
                            <h3 className="text-lg font-semibold text-green-900">Arnav</h3>
                            <p className="text-sm text-gray-600">BCA 3rd Year</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
