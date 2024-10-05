"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCircle } from "react-icons/md";
import DynamicBackgroundCard from "@/components/DynamicBg/DynamicBackgroundCard";

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
    getNames();
  }, [params.secret, router]);

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

  const onUpdate = async (id, bg) => {
    const data = { id, bg };
    console.log(data);

    try {
      const response = await fetch("/api/submit-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update");

      const result = await response.json();
      getNames();
      console.log(result);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (loading || !names) {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-500">
        Secret Names List
      </h1>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {names.map((name) => (
            <DynamicBackgroundCard
              key={name._id}
              name={name}
              onUpdate={onUpdate}
            />
          ))}
        </div>
        {names.length === 0 && (
          <div className="bg-white bg-opacity-70 rounded-3xl shadow-lg p-6 mt-6">
            <p className="text-xl text-gray-700 text-center">
              No names found. Be the first to add one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
