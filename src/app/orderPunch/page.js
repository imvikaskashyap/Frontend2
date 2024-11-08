import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedRoute from "@/components/ProtectedRoute";

const OrderPunch = () => {
  return (
    <ProtectedRoute allowedRoles={["employee1"]}>
      <DefaultLayout>
        <h1>Order Punch Page</h1>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default OrderPunch;
