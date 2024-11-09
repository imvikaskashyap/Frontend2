"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const CreatePOForm = () => {
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [options, setOptions] = useState([{ name: "", values: [""] }]);

  const addOption = () => setOptions([...options, { name: "", values: [""] }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/admin/add-products", { name, productCode, options });
      alert("Product and options added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Product Code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required
          />
          {options.map((option, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Option Name"
                value={option.name}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[idx].name = e.target.value;
                  setOptions(newOptions);
                }}
                required
              />
              <input
                type="text"
                placeholder="Option Values (comma-separated)"
                value={option.values.join(",")}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[idx].values = e.target.value.split(",");
                  setOptions(newOptions);
                }}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addOption}>
            Add Option
          </button>
          <button type="submit">Create Product</button>
        </form>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CreatePOForm;
