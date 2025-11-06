import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://192.168.29.251:5000/api/products/6908a376d70e68e06cc03eea`);
        setProduct(res.data.product);
      } catch (error) {
        console.log("Error loading product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex gap-10">
        
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-80 h-80 object-contain border rounded-lg" 
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="text-2xl font-bold mt-4">₹{product.price}</div>
          <p className="text-sm text-gray-500 line-through">
            ₹{product.original_price}
          </p>

          <p className="mt-2">Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <p>Rating:  {product.rating}</p>
          <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
        </div>

      </div>
    </div>
  );
};

export default SingleProductPage;

{/*

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/6908a88737c1ee1dd6ec5716`);
        setProduct(res.data);
      } catch (error) {
        console.log("Error loading product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex gap-10" 
      >
        
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-80 h-80 object-contain border rounded-lg" 
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="text-2xl font-bold mt-4">₹{product.price}</div>
          
          <p className="text-sm text-gray-500 line-through">
            ₹{product.original_price}
          </p>

          <p className="mt-2">Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <p>Rating:  {product.rating}</p>
          <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
        </div>

      </div>
    </div>
  );
};

export default SingleProductPage;
*/}