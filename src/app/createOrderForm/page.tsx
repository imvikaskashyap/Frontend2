import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const CreateOrderForm: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
   <DefaultLayout>
    <h1>Create Order Form page</h1>
   </DefaultLayout>
   </ProtectedRoute>
  );
};

export default CreateOrderForm;
