"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="shrink-0 font-bold text-2xl text-black hover:text-blue-600 transition"
          >
            SolDash
          </Link>

          <div className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
