"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import confetti from "canvas-confetti";

export default function Home() {
  const { register, handleSubmit, resetField } = useForm();
  const [showOverlay, setShowOverlay] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isInIndia, setIsInIndia] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCounter();
    checkLocation();
    launchConfetti();
  }, []);

  const launchConfetti = () => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const leftConfetti = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 1 },
        colors: ["#ff9ff3", "#feca57", "#48dbfb"],
      });
    };

    const rightConfetti = () => {
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 1 },
        colors: ["#ff9ff3", "#feca57", "#48dbfb"],
      });
    };

    const confettiInterval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(confettiInterval);
        return;
      }
      leftConfetti();
      rightConfetti();
    }, 40);
  };

  const onSubmit = async (data) => {
    if (!data.firstName && !data.lastName) {
      alert("Come on atleast fill one name :)");
      return;
    }
    try {
      const response = await fetch("/api/submit-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      console.log(result);
      alert("Your name suggestions have been submitted. Thank you!");
      getCounter();
      resetField("firstName");
      resetField("secondName");
      resetField("meaningOne");
      resetField("meaningTwo");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const onClickNames = async (data) => {
    const { name: userName, password } = data;
    if (userName === "kanha" && password === "kanha") {
      router.push("/kanha");
    } else {
      alert("Sorry, only Mommy and Daddy have access to this!");
    }
  };

  const getCounter = async () => {
    try {
      const response = await fetch("/api/submit-name");
      if (!response.ok) throw new Error("Failed to fetch names");
      const fetchedNames = await response.json();
      setCounter(fetchedNames.length);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };

  const checkLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setIsInIndia(data.country_code === "IN");
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 text-gray-800 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-500">
        It's a Boy and a Girl!
      </h1>

      <div className="max-w-md w-full bg-transparent rounded-3xl p-[2px] bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400">
        <div className=" bg-white bg-opacity-100 rounded-3xl shadow-lg p-6 space-y-4 ">
          <p className="text-center text-lg text-gray-600 mb-6">
            Help us choose names for our precious twins!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name{" "}
                {isInIndia && (
                  <span className="text-gray-500">(तुमचे नाव)</span>
                )}
              </label>
              <input
                {...register("userName")}
                className="w-full px-4 py-2 bg-white bg-opacity-50 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suggestion for the Boy{" "}
                {isInIndia && <span className="text-gray-500">(मुलगा)</span>}
              </label>
              <input
                {...register("firstName")}
                className="w-full px-4 py-2 bg-white bg-opacity-50 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition"
                placeholder="Boy's name"
              />
              <input
                {...register("meaningOne")}
                className="w-full px-4 py-2 bg-white bg-opacity-50 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition mt-2"
                placeholder={`Meaning (optional)`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suggestion for the Girl{" "}
                {isInIndia && <span className="text-gray-500">(मुलगी)</span>}
              </label>
              <input
                {...register("secondName")}
                className="w-full px-4 py-2 bg-white bg-opacity-50 border-2 border-pink-200 rounded-full focus:outline-none focus:border-pink-400 transition"
                placeholder="Girl's name"
              />
              <input
                {...register("meaningTwo")}
                className="w-full px-4 py-2 bg-white bg-opacity-50 border-2 border-pink-200 rounded-full focus:outline-none focus:border-pink-400 transition mt-2"
                placeholder={`Meaning (optional)`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white rounded-full hover:from-blue-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Submit Suggestions
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setShowOverlay(true)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              View All Suggestions
            </button>
          </div>

          <div className="text-center text-lg font-semibold text-gray-600">
            Total Suggestions: {counter}
          </div>
        </div>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative max-w-xl w-full rounded-3xl m-4 p-[2px] bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400">
            <div className=" bg-white rounded-3xl shadow-xl p-8  ">
              <button
                onClick={() => setShowOverlay(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Parents' Access Only
              </h2>
              <p className="mb-4 text-center text-gray-600">
                This section is reserved for Mommy and Daddy.
              </p>
              <form onSubmit={handleSubmit(onClickNames)} className="space-y-4">
                <input
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400"
                  placeholder="Name"
                />
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white rounded-full hover:from-blue-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Access
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
