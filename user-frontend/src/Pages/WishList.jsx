import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";

const WishList = () => {

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        
        return prev.filter((p) => p.id !== product.id);
      } else {
     
        return [...prev, product];
      }
    });
  };


  const allProducts = [
    {
      id: 1,
      name: "Apple MacBook Pro 14",
      price: "$1,999.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASiC-9NLjaUGvaixsq0gWi62MyDSPrqabciY2ZJajLLP6nM5dQG2qpgxrGAB2RbvTZClLS5MCu93Jnj76TXd6izkn2pTAW2TcERjB89hiBujSLUrWUNBbWFX44Xsw0m8Hbma3fsUe1NGaE609EaiNO871bPW-QQcrnaeDrZaPPYpt0fHLiC0pJkgv437XBB-KEBce9Xe6ZdHM4RgyaiqurY_p_PtVq8HegEdaJ7uP2J7sMULxlfm0ujHrsKQsK0p-tk6u7QUK3JgQ",
    },
    {
      id: 2,
      name: "Pixel 8 Pro",
      price: "$999.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe9cNf6oXlCN_-eEgXPVRLEaUUQ65dr7khEs9c7WUoWku1hG_Ec2DStfdxAFIihjlBNwmRqwYNAy3HL-OTlQDrUQl9ZHp9NwhWl522nQsx_Jn_P5_UnO6ZnRzMpw7kNMaYFff7dmuG2TANfvYKNmjz0gZSoKu-2pfSviOa6gbgIPD_6F8MJ_KPQwHsMUoqaP8VRBc2ZzrxrWguI0pFs_AXuasEWsYGMFSXMUFtizDGfVV2FedusaZ3tR49_uhk9cBpa8jLGEyFyzI",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: "$399.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChyZOlP6hLAXr2wNUuAoL0tTPgpt5_JxZfa7G-AzEtUdiDi3JA8EAYwQLRPDGwuHwt0WTt89PfpV7OVc_C9KUpDhPZdsH8nlP6F7ffbNibS1yjQUghSjkwcSZx6qNdh6inWn1nrEfhDTLL3dfh29M7dqAfwVI_tcJ212G_nkxOHpiepucZPzUfQDrPyT-IgwPlo-KISIcCZrhKFEDJoi6hHI8evUgNfUFzjgYWtFwx4nBM5LKTJreF-AmqPP543MdKiU5-X9gk8Fs",
    },
    {
      id: 4,
      name: "Galaxy Watch 6",
      price: "$299.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqt4XWxXrrcdV3F8tCXomzmBs9slTfcvds1czeX03omC8kB4SpCim8MS4mX-GsR4JgQdV2vthD2rOSFIi09xB153WuVVEMTOnLlmMrgUDCbcUormAsGS1nTv0HkthIhqTIvmtjFimWUFk1XlGDKvx16zv7og1WRtfMKIzyPg2RMChoixoQCXscaqbZbXZlRJBOpFSrh7ux-ToaOh9_x6gYAUqgF1VItqK0IIOmv3get1kA4JYZ04NHW45LfbpyK2FpZTi66DX3oBk",
    },
  ];


  return (
    <div className="container mx-auto p-2">
      <Navbar />

      <div className="flex flex-wrap justify-between mt-10 gap-3">
        <p className="text-[#1F2937] dark:text-black text-4xl pl-5 font-black leading-tight tracking-[-0.033em] min-w-72">
          My Wishlist ({wishlist.length})
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="mt-12 text-center text-gray-500">
          Your wishlist is empty. Click the heart on any product to add it!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInWishlist={true}
              onToggle={() => toggleWishlist(item)}
            />
          ))}
        </div>
      )}


      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => {
            const isInWishlist = wishlist.some((p) => p.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist}
                onToggle={() => toggleWishlist(product)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, isInWishlist, onToggle }) => {
  return (
    <div className="flex flex-col gap-3 group bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all">
     
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.img})` }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onToggle();
          }}
          className={`
            absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full
            transition-all duration-200
            ${isInWishlist
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
            }
          `}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isInWishlist ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 p-2">
        <p className="text-gray-800 font-semibold truncate">{product.name}</p>
        <p className="text-gray-500 text-sm">{product.price}</p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishList;