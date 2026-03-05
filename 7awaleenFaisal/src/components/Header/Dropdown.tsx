import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Dropdown = ({ menuItem, stickyMenu }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      onMouseEnter={() => setDropdownToggler(true)}
      onMouseLeave={() => setDropdownToggler(false)}
      className="group relative"
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue capitalize ${
          pathUrl.includes(menuItem.path) ? "text-blue" : "text-dark dark:text-[#E0E0E0]"
        }`}
      >
        {menuItem.title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${dropdownToggler ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <ul
        className={`absolute left-0 top-full pt-4 min-w-[200px] transition-all duration-300 ${
          dropdownToggler 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible translate-y-2"
        }`}
      >
        <div className="bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-2">
          {menuItem.submenu.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={`block px-5 py-2.5 text-sm transition-all hover:bg-blue/5 hover:text-blue ${
                  pathUrl === item.path ? "text-blue bg-blue/5 font-semibold" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </li>
  );
};

export default Dropdown;
