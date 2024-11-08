"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo-r-bg.png";
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';

export default function SigninWithPassword() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null); 

  // const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  
    try {
      const res = await axios.post("http://localhost:8080/api/v1/login", data);
      if (res.status === 200) {
        console.log("success login");
        console.log("Token:", res.data.token);
        console.log("User data:", res.data.employee);
        login(res.data.token, res.data.employee); // Pass user data to login
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials."); 
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="m-auto mt-28 h-[500px] w-[500px]">
      <Image
        width={112}
        height={112}
        src={logo}
        style={{
          width: "auto",
          height: "auto",
        }}
        alt="User"
        className="mx-auto mb-4 overflow-hidden rounded-full"
      />
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
