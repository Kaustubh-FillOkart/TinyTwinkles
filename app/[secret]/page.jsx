"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (params.secret !== "kanha") {
      router.push("/");
      return;
    }

    const getNames = async () => {
      try {
        const response = await fetch("/api/submit-name");
        if (!response.ok) {
          throw new Error("Failed to fetch names");
        }
        const fetchedNames = await response.json();
        setNames(fetchedNames);
      } catch (error) {
        console.error("Error fetching names:", error);
        setError("Failed to load names. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNames();
  }, [params.secret, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Secret Names List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((name, index) => (
          <div
            key={name._id || index}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            {/* <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {name.userName}
            </h2> */}
            <p className="text-gray-600">First Name: {name.firstName}</p>
            <p className="text-gray-600">Second Name: {name.secondName}</p>
          </div>
        ))}
      </div>
      {names.length === 0 && (
        <p className="text-xl text-gray-700 mt-4">
          No names found. Be the first to add one!
        </p>
      )}
    </div>
  );
};

export default Page;
