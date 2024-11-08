"use client";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const ECommerce: React.FC = () => {
 

  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "employee1", "employee2"]}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    </>
  );
};

export default ECommerce;
