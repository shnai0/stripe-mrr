import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-black text-white ">
      <div className="px-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center h-16 ">
            {/* Left Side */}
            <div className="flex items-centertext-base ">
              <a
                target="_blank"
                href="/"
                rel="noreferrer"
                className="text-white flex max-w-fit items-center justify-center space-x-2 text-l"
              >
                <p>VC Generator by Papermark</p>
              </a>
            </div>
            {/* Right Side */}
            <div>
              <Link
                href="https://www.papermark.io/login"
                className="bg-gray-800 hover:bg-white-700 text-white px-4 font-normal py-2 rounded"
              >
                Share you Pitchdeck
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
