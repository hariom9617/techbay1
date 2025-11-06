import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ProductsProduct = ({ selectedCategories = [], priceRange = [0, Infinity] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://192.168.29.133:5000/products");
       
        console.log("API Response:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          throw new Error("Invalid API response format");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;

  // Helper to extract possible string values for a set of keys from a product
  const getFieldStrings = (product, keys) => {
    const out = [];
    keys.forEach((key) => {
      const val = product?.[key];
      if (!val) return;
      if (Array.isArray(val)) {
        val.forEach((v) => {
          if (!v) return;
          if (typeof v === 'string') out.push(v);
          else if (typeof v === 'object') out.push(v.name || v.title || v.categoryName || String(v));
          else out.push(String(v));
        });
      } else if (typeof val === 'object') {
        out.push(val.name || val.title || val.categoryName || String(val));
      } else {
        out.push(String(val));
      }
    });
    return out.map((s) => s.trim()).filter(Boolean);
  };

  // Apply client-side filters
  const filteredProducts = products.filter((product) => {
    // Price filter
    const price = Number(product.price ?? product.amount ?? 0);
    const minPrice = Number(priceRange?.[0] ?? 0);
    const maxPrice = Number(priceRange?.[1] ?? Infinity);

    if (isFinite(minPrice) && price < minPrice) return false;
    if (isFinite(maxPrice) && price > maxPrice) return false;

    // Category filter (supports strings, arrays and objects)
    if (selectedCategories && selectedCategories.length > 0) {
      const prodCats = getFieldStrings(product, ['category','categories','categoryName','type']);
      const prodCatsLower = prodCats.map((c) => c.toLowerCase());
      const matchesCategory = selectedCategories.some((sel) => {
        const s = sel.toString().toLowerCase();
        return prodCatsLower.some((pc) => pc.includes(s) || s.includes(pc));
      });
      if (!matchesCategory) return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto px-6 ">
      <h1 className="text-2xl font-semibold text-black-800 mb-6 text-center">
        All Products ({filteredProducts.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}   
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-background-dark shadow-sm transition-all hover:shadow-lg"
          >
            <div className="p-4 bg-gray-100 flex items-center justify-center">
              <img
                className="h-48 w-auto object-contain transition-transform group-hover:scale-105"
                src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={product.title || "Product image"}
              />
            </div>

            <div className="flex flex-col p-4 flex-grow">
              <h3 className="text-base font-bold text-[#111418] mb-1 truncate">
                {product.name || "Unnamed Product"}
              </h3>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = Math.round(product?.rating?.rate ?? product?.rating ?? 5);
                  return (
                    <span
                      key={i}
                      className="material-symbols-outlined text-yellow-500"
                      style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
                    >
                      {i < ratingValue ? 'star' : 'star_border'}
                    </span>
                  );
                })}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product?.reviews ?? product?.rating?.count ?? 0})</span>
              </div>

              <p className="text-xl font-black text-[#111418] mb-4 mt-auto">₹{product.price ? product.price.toFixed(2) : "N/A"}</p>

              <div className="flex items-center gap-2">
                <button className="flex-1 flex min-w-0 cursor-pointer bg-blue-600 text-white items-center justify-center overflow-hidden rounded-lg h-9 px-3 bg-primary/10 text-primary text-sm font-bold leading-normal hover:bg-primary/20 transition-colors dark:bg-primary/20 dark:hover:bg-primary/30">
                  <span className="truncate">Add to Cart</span>
                </button>
                <button className="flex items-center justify-center rounded-lg h-9 w-9 hover:text-red-500 transition-colors dark:hover:bg-white-700 text-black dark:hover:text-red-500">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>favorite_border</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsProduct;