import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>Powered by Stripe</div>
        <div className="space-x-4 flex items-center">
          <Link
            href="https://github.com/shnai0/stripe-mrr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <FaGithub className="text-2xl" />
          </Link>
          <Link
            href="https://twitter.com/shnai0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTwitter className="text-2xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
//       <div className="text-sm text-bg-white">
//         Powered by{" "}
//         <a
//           href="https://stripe.com"
//           target="_blank"
//           rel="noreferrer"
//           className="font-bold hover:underline transition underline-offset-2"
//         >
//           ChatGPT{" "}
//         </a>
//         and{" "}
//         <a
//           href="https://vercel.com/"
//           target="_blank"
//           rel="noreferrer"
//           className="font-bold hover:underline transition underline-offset-2"
//         >
//           Vercel Edge Functions.
//         </a>
//       </div>
//       <div className="flex space-x-4 pb-4 sm:pb-0 ">
//         <Link
//           href="https://twitter.com/shnai0"
//           className="group"
//           aria-label="@shnai0 on Twitter"
//         >
//           <svg
//             aria-hidden="true"
//             className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
//           >
//             <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
//           </svg>
//         </Link>
//         <Link
//           href="https://github.com/mfts/papermark"
//           className="group"
//           aria-label="@shnai0 on GitHub"
//         >
//           <svg
//             aria-hidden="true"
//             className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
//           >
//             <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
//           </svg>
//         </Link>
//         {/* <Link
//           href="https://www.linkedin.com/in/iuliia-shnai/"
//           className="group"
//           aria-label="@your-linkedin-username on LinkedIn"
//         >
//           <svg
//             aria-hidden="true"
//             className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fill="currentColor"
//               d="M20.5,0H3.5C1.6,0,0,1.6,0,3.5v17c0,1.9,1.6,3.5,3.5,3.5h17c1.9,0,3.5-1.6,3.5-3.5v-17C24,1.6,22.4,0,20.5,0z M7.3,18.8H3.9v-9.9h3.4V18.8z M5.6,7.9c-0.9,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S6.5,7.9,5.6,7.9z M18.9,18.8h-3.4v-5.2c0-1.2,0-2.8-1.7-2.8c-1.7,0-2,1.3-2,2.7v5.3h-3.4v-9.9h3.3v1.4h0c0.5-0.9,1.8-1.9,3.4-1.9c3.6,0,4.3,2.4,4.3,5.5V18.8z"
//             />
//           </svg>
//         </Link> */}
//         <a
//           href="https://www.papermark.io/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <button className="bg-black text-xs white px-2 py-1 rounded-md">
//             Send pitchdeck via Papermark
//           </button>
//         </a>
//       </div>
//     </footer>
//   );
// }
