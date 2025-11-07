import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
import ProductsProduct from "./ProductsProduct";

const ProductSidebar = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://192.168.29.133:5002/products");
        const products = Array.isArray(res.data) ? res.data : res.data?.products || [];
        console.log("API Response:", { raw: res.data, processed: products });
        setAllProducts(products);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchAllProducts();
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const valuetext = (value) => `${value}₹`;

  return (
    <div className="flex flex-row m-5">
    
      <div className="border border-gray-200 shadow-md w-64 p-5 rounded-lg bg-white">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="font-semibold text-gray-700">Filter By</h1>
          <button
            className="text-blue-600 text-sm hover:underline"
            onClick={() => {
              setPriceRange([500, 50000]);
              setSelectedCategories([]);
            }}
          >
            Clear All
          </button>
        </div>

        
        <div className="mb-6">
          <h2 className="font-medium text-gray-800 mb-2">Price Range</h2>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={5000}
            step={500}
            sx={{ color: "#2563eb" }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

      
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">Category</h2>
          {Array.from(new Set(allProducts.map(p => p.category || p.categoryName)))
            .filter(Boolean)
            .sort()
            .map((item) => (
              <label key={item} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={() => handleCategoryChange(item)}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>{item}</span>
              </label>
            ))}
        </div>
      </div>

     
      <div className="flex-1 ml-5">
        <ProductsProduct
          allProducts={allProducts}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
        />
      </div>
    </div>
  );
};

export default ProductSidebar;