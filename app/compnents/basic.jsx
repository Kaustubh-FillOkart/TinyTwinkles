"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

export default function Home() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [showOverlay, setShowOverlay] = useState(false);
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch("/api/submit-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      if (response.ok) {
        const result = await response.json();
        console.log(result);

        alert("Your names have been submitted");
        getCounter();
        resetField("firstName");
        resetField("secondName");
      }
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const onClickNames = async (data) => {
    const userName = data.name;
    const password = data.password;

    if (userName === "kanha" && password === "kanha") {
      router.push("/kanha");
    } else {
      alert("Sorry only Mommy and Daddy has access to this !!!");
    }
  };

  const getCounter = async () => {
    try {
      const response = await fetch("/api/submit-name");
      if (!response.ok) {
        throw new Error("Failed to fetch names");
      }
      const fetchedNames = await response.json();
      setCounter(fetchedNames.length);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };
  useEffect(() => {
    getCounter();
  }, []);

  const handleClose = () => {
    setShowOverlay(false);
    resetField("name");
    resetField("password");
  };

  const [isInIndia, setIsInIndia] = useState(false);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Using ipapi.co as an example. You might want to use a more robust service in production.
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setIsInIndia(data.country_code === "IN");
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    checkLocation();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf0] text-black p-6">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full text-center text-2xl font-medium">
          <h1>Submit your entry for name suggestions here</h1>
          {isInIndia && <h1>(तुमच्या नावाची suggestion येथे टाइप करा)</h1>}
        </div>
        <div className="w-full text-center flex flex-row gap-4 justify-center items-center">
          <h1 className="font-medium w-52">
            Your Name {isInIndia && <span>(तुमचे नाव)</span>}
          </h1>
          <input
            name="userName"
            type="text"
            placeholder="Your Name"
            className="border border-black outline-none p-2 rounded-md bg-transparent"
            {...register("userName")}
            errors={errors}
            required={true}
          />
        </div>
        <div className="w-full text-center flex flex-row gap-4 justify-center items-center">
          <h1 className="font-medium w-52">
            Baby one {isInIndia && <span>(बाळ १)</span>}
          </h1>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="border border-black outline-none p-2 rounded-md bg-transparent"
            {...register("firstName")}
            errors={errors}
          />
        </div>
        <div className="w-full text-center flex flex-row gap-4 justify-center items-center">
          <h1 className="font-medium w-52">
            Baby two {isInIndia && <span>(बाळ २)</span>}
          </h1>
          <input
            name="secondName"
            type="text"
            placeholder="Second Name"
            className="border border-black outline-none p-2 rounded-md bg-transparent "
            {...register("secondName")}
            errors={errors}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-400 px-2 py-1 text-white rounded-md hover:bg-blue-600 duration-200"
          >
            Submit
          </button>
        </div>

        <div className="flex justify-center">
          <div
            className="text-blue-400 rounded-md hover:text-blue-600 duration-200 cursor-pointer"
            onClick={() => setShowOverlay(true)}
          >
            See Names
          </div>
        </div>

        <div className="flex justify-center">
          <div className="text-xl font-medium">
            Name submission counter :- {counter}
          </div>
        </div>
      </form>

      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 backdrop-blur "></div>
          <div className="fixed z-50 flex flex-col gap-3 items-center bg-[#ffffff] border-[1px] border-[#1a1a1a] rounded-lg p-4 w-screen md:w-8/12 md:h-9/12 ">
            <div className="flex flex-row items-center justify-between w-full">
              <IoClose className="h-7 w-7 text-transparent" />
              <h2 className="text-xl text-center font-semibold">
                Sorry only Mommy and Daddy has access to this !!!
              </h2>
              <IoClose
                className="h-7 w-7 cursor-pointer text-blue-400 hover:text-blue-600"
                onClick={handleClose}
              />
            </div>

            <form
              className="w-full flex flex-col gap-5 mt-5"
              onSubmit={handleSubmit(onClickNames)}
            >
              <div className="w-full text-center">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="border border-black outline-none p-2 rounded-md"
                  {...register("name")}
                  errors={errors}
                  required={true}
                />
              </div>
              <div className="w-full text-center">
                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  className="border border-black outline-none p-2 rounded-md"
                  {...register("password")}
                  errors={errors}
                  required={true}
                />
              </div>
              <div className="w-full items-center flex justify-center mt-4">
                <button
                  type="submit"
                  className="py-2 px-14 bg-blue-400 text-white rounded-lg duration-300 hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
