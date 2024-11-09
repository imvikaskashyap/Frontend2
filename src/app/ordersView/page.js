import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedRoute from "@/components/ProtectedRoute";

const OrdersView = () => {
  return (
    <ProtectedRoute allowedRoles={["employee1", "employee2"]}>
      <DefaultLayout>
        <h1>Orders View Page</h1>
      
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default OrdersView;
