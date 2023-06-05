import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { Post } from "@/components/Post";
// import { Ranking } from "@/components/Ranking";
// import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
// import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import { SectorSelect } from "@/components/Sector";
import { RoundSelect } from "@/components/Round";
import { CountrySelect } from "@/components/Country";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [sector, setSector] = useState<string>("Technology");
  const [round, setRound] = useState<string>("Seed");
  const [country, setCountry] = useState<string>("Finland");

  const handlePrompt = () => {
    let prompt = `Provide me the list of 10 investors or vc funds in ${country}  
  for ${round} round
  and industry defined here: ${sector}. List should include name of the fund, website. 
  Only give a list, no comments, never comments. 
  If there is no list available, than povide the list of any vc funds or investors in this country.`;

    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const prompt = handlePrompt();

    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = await response.text(); // get the full response text

    // Handle no data case
    if (!data) {
      setOptimizedPost("Nothing found, try another search.");
      setLoading(false);
      return;

      // Set the response data directly to state
      setOptimizedPost(data);
      setLoading(false);
    }

    const formattedData = data.replace(/\n/g, "<br>");
    setOptimizedPost(formattedData);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>1000+ investors for startups </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Generate professional reports and assessments for students "
        />
        <meta property="og:site_name" content="startupinvestors.vercel.app" />
        <meta property="og:description" content="Startup funding." />
        <meta property="Startup investors:title" content="Startup investors" />

        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="Startups:title" content="Startups funding" />
        <meta name="ReportX:description" content="Startups funding" />
        <meta
          property="og:image"
          content="https://postgenerator.app/cover.png"
        />
      </Head>

      <div className="flex flex-col min-h-screen justify-between bg-slate-900">
        <main className="h-full bg-slate-900">
          <nav className="bg-black text-white ">
            <div className="px-5">
              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center h-16 ">
                  <div className="flex items-centertext-base ">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/iuliia-shnai/"
                      rel="noreferrer"
                      className="text-white flex max-w-fit items-center justify-center space-x-2 text-xl"
                    >
                      <p>Startup investors</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <section className="py-10 lg:py-20 bg-slate-900">
            {/* bg-[url('/image1.svg')] */}
            <div className="px-4">
              <div className="max-w-5xl mx-auto">
                <div className="w-full mx-auto">
                  <h1 className="text-6xl text-center font-bold pb-1 text-white ">
                    Investors for Startups
                  </h1>
                  <p className="mt-3 mb-10 text-center text-white">
                    Raise capital with help of AI generated list of investors{" "}
                    <br />
                  </p>
                  <div className="max-w-5xl mx-auto px-8 lg:px-28">
                    <div className="max-w-5xl mx-auto">
                      <div className="w-full my-1 mx-auto "></div>

                      <div className="w-full my-1 mx-auto">
                        <div className="flex space-x-4">
                          {" "}
                          {/* Add this wrapper div with flex and space-x classes */}
                          <div className="w-full ">
                            {" "}
                            {/* Add w-1/2 class to the parent div */}
                            <CountrySelect
                              country={country}
                              setCountry={setCountry}
                              slug={""}
                            />
                          </div>
                          <div className="w-full">
                            {" "}
                            {/* Add w-1/2 class to the parent div */}
                            <RoundSelect round={round} setRound={setRound} />
                          </div>
                          <div className="w-2/3">
                            {" "}
                            {/* Add w-1/2 class to the parent div */}
                            <SectorSelect
                              sector={sector}
                              setSector={setSector}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full my-1 mx-auto">
                        <div className="flex space-x-6"></div>
                      </div>

                      <div className="my-4 lg:px-72 ">
                        <button
                          disabled={loading}
                          onClick={(e) => optimizePost(e)}
                          className="bg-purple-500 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-purple-100 disabled:bg-purple-500"
                        >
                          {loading && (
                            <LoadingDots color="white" style="large" />
                          )}
                          {!loading && `Get investor list `}
                        </button>
                      </div>
                    </div>
                    <div className="flex md:w-full md:flex-col lg:px-32">
                      <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{ duration: 2000 }}
                      />
                      {optimizedPost && (
                        <div className="my-1">
                          <div className="flex justify-between items-center pb-2 py-2 border-gray-300">
                            <h2 className="text-xl font-bold text-white mx-auto">
                              Your VC and investors
                            </h2>
                          </div>

                          <div
                            className="bg-slate-900 text-white rounded-xl p-4 hover:bg-black transition  border"
                            onClick={() => {
                              navigator.clipboard.write([
                                new ClipboardItem({
                                  "text/html": new Blob([optimizedPost], {
                                    type: "text/html",
                                  }),
                                }),
                              ]);
                              toast("List copied to clipboard", {
                                icon: "📋",
                              });
                            }}
                            key={optimizedPost}
                          >
                            <p
                              className="text-black-700"
                              dangerouslySetInnerHTML={{
                                __html: optimizedPost,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="my-4 lg:px-80">
                      {optimizedPost && (
                        <a
                          href="https://papermark.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-xs rounded-md w-full text-white px-1 py-1 hover:bg-black disabled:bg-purple-500 inline-block text-center"
                        >
                          Get access to 1000+ investors
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </footer>
      </div>
    </>
  );
}
