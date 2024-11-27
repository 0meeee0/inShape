import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-500 to-red-500 p-4">
      <div className="relative w-full max-w-sm">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-44">
          <img
            src="/png-b.png"
            alt="Top Image"
            className=""
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 ">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.webp"
              alt="Logo"
              className="w-24 h-24 rounded-full"
            />
          </div>

          {/* form */}
          <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
            Welcome Athlete!
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:orange-blue-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
