import React from "react";

interface NavigationButtonProps {
  onClick: () => void;
  color: "blue" | "green" | "orange" | "purple" | "gray";
  children: React.ReactNode;
}

export default function NavigationButton({
  onClick,
  color,
  children,
}: NavigationButtonProps) {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    orange: "bg-orange-600 hover:bg-orange-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${colorClasses[color]} text-white rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer`}
    >
      {children}
    </button>
  );
}
