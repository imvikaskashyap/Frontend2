"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useRouter } from "next/navigation";

export default function IdPassGenerate() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    designation: '',
    department: '',
    mobile: '',
    // profilePicture: null,
  });
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();

  const router = useRouter()

  const handlePasswordBlur = () => {
    if (data.password !== data.confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMismatch) {
      setError("Passwords do not match.");
      return;
    }
  
    setError(null);
    try {
      const requestData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        designation: data.designation,
        department: data.department,
        mobile: data.mobile,
      };

      console.log("Data before submit:", requestData);

      const res = await axios.post("http://localhost:8080/api/v1/register", requestData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.status === 201) {
        // Display success toast on account creation
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(()=>{
          router.push("/allEmployees")
        }, 3000)

        // login(res.data.token, res.data.employee);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="m-auto mt-4 h-auto w-full max-w-lg p-8 rounded-lg shadow-md bg-opacity-50 bg-white backdrop-filter backdrop-blur-md"
      >
        <h1 className="text-center text-2xl font-semibold text-primary mb-8">Create Account</h1>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="mb-4 relative">
          <label className="mb-2 block font-medium text-dark dark:text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onBlur={handlePasswordBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className="mb-4 relative">
          <label className="mb-2 block font-medium text-dark dark:text-white">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            onBlur={handlePasswordBlur}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-11"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
          {passwordMismatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Role</label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee1">Employee 1</option>
            <option value="employee2">Employee 2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Designation</label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, designation: e.target.value })}
          >
            <option value="">Select Designation</option>
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Department</label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="hr">HR</option>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-medium text-dark dark:text-white">Mobile No.</label>
          <input
            type="text"
            placeholder="Enter Mobile No."
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-dark dark:text-white">Profile Picture (optional)</label>
          <input
            type="file"
            className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark dark:bg-dark-2 dark:text-white"
            // onChange={(e) => setData({ ...data, profilePicture: e.target.files[0] })}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-opacity-90"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </DefaultLayout>
  );
}
