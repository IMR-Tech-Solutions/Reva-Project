import React from "react";
import { Heart } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-3 sm:py-4 px-3 sm:px-4 md:px-6 mt-4 sm:mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">Reva</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
          Made by RevaTeam
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
