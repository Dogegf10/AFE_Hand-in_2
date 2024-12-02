"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/${payload.UserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setUserRole(data.accountType);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    // Update auth state on mount
    updateAuthState();

    // Listen for storage changes
    window.addEventListener("storage", updateAuthState);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null); // Clear user role on logout
    router.push("/login");
  };

  const handleHomeClick = () => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    switch (userRole) {
      case "Client":
        router.push("/client");
        break;
      case "PersonalTrainer":
        router.push("/trainer");
        break;
      case "Manager":
        router.push("/manager");
        break;
      default:
        router.push("/");
        break;
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div onClick={handleHomeClick} className="cursor-pointer">
        <img src="/img/pig.png" alt="Logo" className="h-8" />
      </div>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={handleHomeClick}
            className="text-white hover:text-gray-400"
          >
            Home
          </button>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-400"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-400">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;