import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="text-xl font-bold">Stripe MRR Dashboard (2 accounts)</div>
      <Link
        href="https://github.com/shnai0/stripe-mrr"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-900 hover:bg-purple-700 text-white font-normal py-2 px-4 rounded-full flex items-center space-x-2 text-sm"
      >
        <FaGithub className="text-sm" />
        <span>Create Dashboard </span>
      </Link>
    </nav>
  );
};

export default Navbar;
