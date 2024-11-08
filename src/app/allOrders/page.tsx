import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const AllOrders: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
    <DefaultLayout>

      <h1>All Orders page</h1>
    </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AllOrders;
