import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedRoute from "@/components/ProtectedRoute"; // Import ProtectedRoute
import React from "react";

export const metadata: Metadata = {
  title: "H K Consultants & Engineers | Sign In",
  description: "Sign In to your account",
};

export default function Home() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee1", "employee2"]}>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
