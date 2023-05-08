import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Post } from "@/components/Post";
// import { Ranking } from "@/components/Ranking";
// import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import { Name } from "@/components/Name";
import { Subject } from "@/components/Subject";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");

  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Excellent 🤩");
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Excellent 🤩":
        prompt = ` Generate a comment for a school report using the following ${post} :

${name} of student


Tone: Enthusiastic and student was excellent

Subject and grade: ${subject}

Characters output:  600`;

        break;
      case "Good 😊":
        prompt = `Generate a comment for a school report using the following ${post} :

${name} of student

Tone: Good and student was performing good

Use the subject and grade: ${subject}

Characters output:  600`;

        break;
      case "Okay 😐":
        prompt = `Generate a comment for a school report using the following ${post} :

${name} of student

Tone: Neutral, student performing okay

Use the subject and grade: ${subject}

Characters output:  600`;

        break;
      case "Poor 🙁":
        prompt = `Generate a comment for a school report using the following ${post} :

${name} of student

Tone: Negative, student perfroming not good

Use the subject and grade: ${subject}

Characters output: 600`;
        break;

      default:
        prompt = `Generate a comment for a school report using the following ${post} use ${name} of student and grade and subject from ${subject}`;
        break;
    }
    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true)
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
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };
  return (
    <>
      <Head>

        <title>ReportX</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="ReportX" />
        <meta
          name="description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta
          property="og:site_name"
          content="linkedin-booster.vercel.app"
        />
        <meta
          property="og:description"
          content="See how your post performs against LinkedIn alghoritm and generate better post with AI."
        />
        <meta
          property="og:title"
          content="LinkedIn Post Generator with AI"
        />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta
          name="linkedin:title"
          content="Linkedin Post Generator"
        />
        <meta
          name="linkedin:description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta
          property="og:image"
          content="https://postgenerator.app/cover.png"
        />
        <meta
          name="linked:image"
          content="https://postgenerator.app/cover.png"
        />

      </Head>

      <main>
        <nav className="bg-purple-500 text-white ">
          <div className="px-5">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center h-16 ">
                <div className="flex items-center text-base ">
                  <a target="_blank"
                    href="https://www.linkedin.com/in/iuliia-shnai/"
                    rel="noreferrer"
                    className="text-white flex max-w-fit items-center justify-center space-x-2 text-xl"
                  >
                    <p>ReportX</p>

                  </a>
                </div>

              </div>
            </div>
          </div>
        </nav>
        <section className="py-10 lg:py-20 ">
          {/* bg-[url('/image1.svg')] */}
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">

                  ReportX
                </h1>
                <p className="mt-3 mb-10 text-center">
                  AI school report writer for teachers <br />

                </p>
                <div className="flex flex-col md:flex-row w-full md:space-x-20">
                  <div className="flex md:w-1/2 flex-col">
                    <h2 className="text-xl font-bold">
                      Your Notes
                    </h2>
                    <div className="pt-1">
                      {/* <Ranking ranking={ranking} /> */}
                    </div>

                    <div className="w-full my-1 mx-auto">
                      <div className="flex space-x-4"> {/* Add this wrapper div with flex and space-x classes */}
                        <div className="w-1/3"> {/* Add w-1/2 class to the parent div */}
                          <Name
                            name={name}
                            setName={setName}
                          />
                        </div>

                        <div className="w-2/3"> {/* Add w-1/2 class to the parent div */}
                          <Subject
                            subject={subject}
                            setSubject={setSubject}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="w-full my-1 mx-auto">
                      <Post
                        post={post}
                        setPost={setPost}
                        media={media}
                        setMedia={setMedia}
                      />
                    </div>

                    <div className="flex mb-5 items-center space-x-3">


                    </div>
                    <div className="block">
                      <DropDown vibe={vibe} setVibe={setVibe} />
                    </div>
                    <div className="my-4">
                      <button
                        disabled={loading}
                        onClick={(e) => optimizePost(e)}
                        className="bg-purple-500 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-purple-100 disabled:bg-purple-500"
                      >
                        {loading && <LoadingDots color="white" style="large" />}
                        {!loading && `Create full report `}
                      </button>
                    </div>

                  </div>
                  <div className="flex md:w-1/2 md:flex-col">
                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      toastOptions={{ duration: 2000 }}
                    />
                    {optimizedPost && (
                      <div className="my-1">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                          <h2 className="text-xl font-bold">
                            Your Generated Report
                          </h2>
                        </div>
                        <div className="max-w-2xl my-4 mx-auto">
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.write([
                                new ClipboardItem({
                                  "text/html": new Blob([optimizedPost], { type: "text/html" }),
                                }),
                              ]);
                              toast("Post copied to clipboard", {
                                icon: "📋",
                              });
                            }}
                            key={optimizedPost}
                          >
                            <p className="text-black-700" dangerouslySetInnerHTML={{ __html: optimizedPost }} />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}
