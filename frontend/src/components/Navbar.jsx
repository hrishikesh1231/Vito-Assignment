import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/" 
            onClick={() =>
                window.scrollTo({
                top: 0,
                behavior: "smooth",
                })
            }
          className="text-2xl font-bold text-blue-600"
          
        >
          Vitto
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#features"
            className="hover:text-blue-600 transition"
          >
            Features
          </a>

          <Link
            to="/track"
            className="hover:text-blue-600 transition"
          >
            Track Application
          </Link>

          <Link
            to="/apply"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 gap-4">
            <a
              href="#features"
              onClick={() =>
                setMenuOpen(false)
              }
              className="hover:text-blue-600"
            >
              Features
            </a>

            <Link
              to="/track"
              onClick={() =>
                setMenuOpen(false)
              }
              className="hover:text-blue-600"
            >
              Track Application
            </Link>

            <Link
              to="/apply"
              onClick={() =>
                setMenuOpen(false)
              }
              className="bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;