import Head from "next/head";
import prisma from "@/lib/prisma";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import Footer from "@/components/Footer";
import { SectorSelect } from "@/components/Sector";
import { RoundSelect } from "@/components/Round";
import { CountrySelect } from "@/components/Country";
import { Page } from "@prisma/client";

export async function getStaticPaths() {
  const pages = await prisma.page.findMany({
    select: { slug: true },
  });

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false }; // or 'blocking' if you want to enable on-demand page generation
}

interface Params {
  slug: string;
  id: string;
}

export async function getStaticProps({ params }: { params: Params }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    return { notFound: true };
  }

  return { props: { page } };
}

export default function Home({ page }: { page: Page }) {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");

  const [sector, setSector] = useState<string>("Any Industry");
  const [round, setRound] = useState<string>("Seed");
  const [country, setCountry] = useState<string>("${country}");

  if (!page) {
    return <div>Page not found</div>;
  }

  const handlePrompt = () => {
    let prompt = `Provide me the list of seed investors in ${country}  
  for specific funding round ${round}  and specific sector in industry ${sector}  with name of company and website link
  only give a list, no comments, never comments. 
  If there is no list available, than povide the list of investors for any funding round and any sector in this country.`;

    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
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
    let data = await response.text(); // get the full response text
    if (!data) {
      return;
    }

    // check if the AI error message is present and replace it
    const errorMessage = " AI language model";
    if (data.includes(errorMessage)) {
      data = data.replace(errorMessage, "Nothing found, try another search.");
    }

    const formattedData = data.replace(/\n/g, "<br>");
    setOptimizedPost(formattedData);
    setLoading(false);
  };

  console.log("page", page);

  return (
    <>
      <Head>
        <title>Investors for startups</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content={page.meta} />
        <meta property="og:site_name" content="startupinvestors.vercel.app" />
        <meta property="og:description" content="Startup funding" />

        <meta name="StartupFunding:card" content="summary_large_image" />
        <meta property="og:image" content="/cover.png" />
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
                      href="/"
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
                    {page.header}
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
                              slug={page.slug}
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
                          href="https://iuliia2.marbleflows.com/flows/6733/link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-xs rounded-md w-full text-white px-1 py-1 hover:bg-black disabled:bg-purple-500 inline-block text-center"
                        >
                          Get access to 1000+ investors and funds
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
