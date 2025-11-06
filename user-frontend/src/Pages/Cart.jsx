import React from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const cart = [
    {
      name: "Pro Smartphone X",
      price: "$999.00",
      desc: "Color: Midnight Black, Storage: 256GB",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBfl78VlnW_q0rq4eSJHlFcRwCX_R7w_k7fHz6KQ0y2OYfIRUK-kEotEqYuNagfBei4RDwsMcQViSsLmTuTnSvcErZJqWW-w2wRQCy7oCmu8Dun__l4y3_ucwepexb4GHOlGc10Wbz-nlzo6SrpuH3UEskJ65Mk9uV5TLiRHG3ivxCZnwL2NJvs1ahgcSL0NKzUqBSL0wyGQDK8hXlsDaCRoFVqe1R_O0SNL__6OOAXFnhtIGSiZUHYI30lINtD04AwNXUffFe0yE",
    },
    {
      name: "Noise-Cancelling Headphones",
      price: "$349.00",
      desc: "Color: Silver",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHK1M8e9hgnsg-KbiCf2cEC4pgaFJaUFlr2txwMcRRbMRGB4ALHlnqqrNz48FtaK_2z5vRe7FQeDzJkkDfApola0yKH4EJEMnnz3EF6xnp27u_oJyp70HWhKlTB12eFbQBKMXpZQFnKIk8azjBYqQ6DRayP5KgB3m3QuOxA3TJ6fJfijNLPbn-5wjEt9N7sRJADGttOAixRpq-u7L6UgEuxTykFAYzjjrp6tzKxft5XST1iVz1TCNNgWLOfKySofn0Cn5QKlMoh4",
    },
    {
      name: "UltraBook Pro 14-inch",
      price: "$1599.00",
      desc: "CPU: M3, RAM: 16GB, SSD: 512GB",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADmVubcc6cNYk3nDRvSHeIh96_fnx45NC_mRlRwRTcyPfGaOWXkFUkUTOjjreXFecCM4PekMG61I4KDRV_MVIAddGhZW1Sq7rdowGqJgWob5P94UobXGahRXzWfCRH76oCUC-JQ3UNDVBLoZ4OOFdsfDBUz1k9PvBYcd7w-3AXa93rEOBVTloEJXnbelp8MXy6nr3ugt1m14pmsFMziDKg37aOk32NwkIGf6OREFBWHuI_nZQfKVIMp6bMwPsmNU-yrXITqXJEYV8",
    },
  ];

  return (
    <div className="px-4 py-2">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-3xl font-bold">Shopping Cart</p>
            <p className="text-black">Review and manage items in your cart.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row gap-4 px-4 py-5 justify-between items-start border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div
                        className="bg-center bg-cover rounded-lg h-[80px] w-[80px]"
                        style={{ backgroundImage: `url(${item.img})` }}
                      ></div>
                      <div className="flex flex-1 flex-col justify-center gap-1">
                        <p className="text-base font-medium">{item.name}</p>
                        <p className="text-secondary text-sm">{item.price}</p>
                        <p className="text-secondary text-sm">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 mt-2 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 flex items-center justify-center rounded-full bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">-</button>
                        <input
                          type="number"
                          defaultValue="1"
                          className="w-6 text-center bg-transparent border-none focus:outline-none"
                        />
                        <button className="h-8 w-8 flex items-center justify-center rounded-full bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">+</button>
                      </div>
                      <button className="text-destructive">
                        <span className="material-symbols-outlined cursor-pointer">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm p-6 h-fit">
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-secondary dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$2947.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$128.52</span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between text-lg font-bold">
                <span>Order Total</span>
                <span>$3090.52</span>
              </div>
              <button
                className="w-full mt-6 h-12 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
