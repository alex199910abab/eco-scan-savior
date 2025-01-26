import { Scan, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center">
      <Link
        to="/"
        className={`flex flex-col items-center space-y-1 ${
          currentPath === "/" ? "text-eco-primary" : "text-gray-500"
        }`}
      >
        <Scan className="h-6 w-6" />
        <span className="text-xs">Scan</span>
      </Link>
      <Link
        to="/materials"
        className={`flex flex-col items-center space-y-1 ${
          currentPath === "/materials" ? "text-eco-primary" : "text-gray-500"
        }`}
      >
        <Layers className="h-6 w-6" />
        <span className="text-xs">Materials</span>
      </Link>
    </nav>
  );
};

export default BottomNav;