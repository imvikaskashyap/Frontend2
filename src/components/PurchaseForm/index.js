"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [options, setOptions] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/admin/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleProductChange = async (productId) => {
    setSelectedProduct(productId);
    const res = await axios.get(`http://localhost:8080/api/v1/emp/products/${productId}/options`);
    
    // Set options as received from backend, with option "values" array for dropdown
    setOptions(res.data);
    setFormValues({});
  };

  const handleOptionChange = (optionId, value) => {
    setFormValues({ ...formValues, [optionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/emp/po-form", {
        productId: selectedProduct,
        customerName,
        customerEmail,
        quantity,
        optionsSelected: formValues,
      });
      alert("PO form submitted successfully.");
    } catch (error) {
      console.error("Failed to submit PO form:", error);
      alert("Error submitting PO form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Purchase Form</h2>

      <div>
        <label className="block mb-2">Customer Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2">Customer Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          className="w-full p-2 border rounded-md"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Product</label>
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => handleProductChange(e.target.value)}
          value={selectedProduct || ""}
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {options.map((option) => (
        <div key={option.id} className="mt-4">
          <label className="block mb-2">{option.name}</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            value={formValues[option.id] || ""}
            required
          >
            <option value="">Select {option.name}</option>
            {option.values.map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
        </div>
      ))}

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default PurchaseForm;
