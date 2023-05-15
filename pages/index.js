import Head from "next/head";
import Image from "next/image";
import { ImBooks } from "react-icons/im";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import Planets from "../components/planets";

import dynamic from "next/dynamic";
import Nav from "../components/nav";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info1, setInfo1] = useState(false);
  const [info2, setInfo2] = useState(false);
  const [title, setTitle] = useState(null);
  const [metaTag, setMetaTag] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    // window.open("/" + e.target[0].value);

    meta(e.target[0].value);

    listing(e.target[0].value);
  

    let res = await fetch("/api/openAI", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(`
      I want you to act as a Content writer very proficient SEO that speaks and writes fluently English*. Write an SEO-optimized Long Form article with
      1. a minimum of 2000 words in markdown format.
      2. Please use a minimum of 5 headings and sub headings, include a heading.
      3. The final paragraph should be a conclusion
      5. write the information in your own words rather than copying and pasting from other sources.
      6. also double-check for plagiarism because I need pure unique content,
      7. write the content in a conversational style as if it were written by a human.
      8. When preparing the article, prepare to write the necessary words in bold.
      9. I want you to write content so that it can outrank other websites.
      Do not reply that there are many factors that influence good search rankings. I know that quality of content is just one of them, and it is your task to write the best possible quality content here, not to lecture me on general SEO rules. I give you the Title ${e.target[0].value} of an article that we need to outrank in Google. Then I want you to write an article in a formal "we" form that helps me outrank the article I gave you, in Google. Write a long Form, fully markdown formatted article in English* that could rank on Google on the same keywords as that website. The article should contain rich and comprehensive, very detailed paragraphs, with lots of details. Do not echo my prompt. Let the article be a long Form article of a minimum of 2000 words. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do now use generic filler phrases. Do use useful subheadings with keyword-rich titles. Get to the point precisely and accurately. Do not explain what and why, just give me your best possible article. write it in a markdown format

      `),
    });

    let data = await res.json();
    let promptRes = data.result.choices[0].text;

    // let res = await fetch("/api/openAI", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(`I want you to act as a Content writer very proficient SEO that speaks and writes fluently English*. Write an SEO-optimized blog outline article on ${e.target[0].value} with:

    //     1)Please use a minimum of 5 headings and sub headings, include a heading.

    //     `),
    // });

    // let data = await res.json();
    // let promptRes = data.result.choices[0].text;

    // console.log(promptRes);

    // let answer = "";
    // for (let i = 0; i < 4; i++) {
    //   let res2 = await fetch("/api/openAI", {
    //     method: "POST",
    //     mode: "cors",
    //     body: JSON.stringify(`I want you to act as a Content writer very proficient SEO that speaks and writes fluently English*. Write the ${i}th paragraph of ${promptRes} with:
    //     Include the ${i}th heading as the title of the paragraph in markdown format.

    //       `),
    //   });
    //   let data2 = await res2.json();
    //   let promptRes2 = data2.result.choices[0].text;

    //   answer += promptRes2;

    setText(promptRes);
    //}
    setLoading(false);
    // e.target[0].value = "";
  }

  async function meta(promtRes) {
    let res = await fetch("/api/openAI", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(
        `I want you to act as a Content writer very proficient in SEO that speaks and writes fluently English*. Write an SEO-optimized  meta description on ${promtRes}.`
      ),
    });

    let data = await res.json();
    let promptRes2 = data.result.choices[0].text;

    setMetaTag(promptRes2);
  }

  async function listing(promtRes) {
    let res = await fetch("/api/openAI", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(
        `I want you to act as a Content writer very proficient in SEO that speaks and writes fluently English*. Write an SEO-optimized blog title tag on ${promtRes}. Include the keywords in the title. Do not include SEO in the title.`
      ),
    });

    let data = await res.json();
    let response = data.result.choices[0].text;
    setTitle(response);
  }

  const downloadFile = () => {
    const link = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "Untitled.md";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  function infofunc(info1) {
    if (info1 == true) {
      document.getElementById("info1").classList.remove("invisible");
      setInfo1(false);
    } else {
      document.getElementById("info1").classList.add("invisible");
      setInfo1(true);
    }
  }

  function infofunc2(info2) {
    if (info2 == true) {
      document.getElementById("info2").classList.remove("invisible");
      setInfo2(false);
    } else {
      document.getElementById("info2").classList.add("invisible");
      setInfo2(true);
    }
  }
  return (
    <div>
      <Head>
        <title>Free Scholarly Articles | Read published articles without the paywall</title>
        <meta
          name="description"
          content="Free Scholarly Articles, get published works without the paywall. Read over 30 million scholarly articles without needing to pay or login. All scholarly works are open access from over 50,000 publishers.  "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen  flex flex-col ">
        <div className="w-full flex flex-col">
          <Nav></Nav>

          <div className="w-full min-h-screen flex items-center flex-col mt-5  ">
            <h1 className="w-[80%] sm:w-full  mb-20 mt-5 max-w-screen-md  text-5xl font-extrabold sm:tracking-tight text-center">
              Enter your blog topic:
            </h1>

            <form onSubmit={handleSubmit} className="flex justify-center ">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-row items-stretch w-full mb-4">
                  <input
                    type="text"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="ex. The best pizza in nyc"
                    required
                  />
                  <button
                    className="btn inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-800 hover:shadow-lg   focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="submit"
                    id="button-addon2"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            {title ? (
              <h1 className="w-[80%] sm:w-full  mt-5  max-w-screen-md  text-2xl font-bold sm:tracking-tight text-center">
                Title Tag:
              </h1>
            ) : (
              <div></div>
            )}

            {title ? (
              <div className=" ml-60 flex flex-row space-x-3 w-[70%] items-center justify-center ">
                <div className="p-3 border border-[#C82703] rounded-xl">{title}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  height="20px"
                  width="20px"
                  onClick={() => infofunc(info1)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <div
                  id="info1"
                  className="border border-black h-[90px] w-[180px] rounded-xl relative text-xs p-2 font-bold invisible"
                >
                  The Title is added in the Title tag of the HTML header. This helps your blog rank
                  for SEO.
                </div>
              </div>
            ) : (
              ""
            )}

            {metaTag ? (
              <h1 className="w-[80%] sm:w-full  mt-5  max-w-screen-md  text-2xl font-bold sm:tracking-tight text-center">
                Meta Description:
              </h1>
            ) : (
              <div></div>
            )}
            {metaTag ? (
              <div className="flex flex-row space-x-3 items-center justify-center  mt-4 mb-10">
                <div className=" ml-[250px] flex flex-row items-center justify-center  w-[60%]">
                  <div className="p-3 border border-[#C82703] rounded-xl mr-2">{metaTag}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="75px"
                    width="75px"
                    onClick={() => infofunc2(info2)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
                <div
                  id="info2"
                  className="border border-black h-[120px] w-[200px] rounded-xl relative text-xs p-2 font-bold invisible"
                >
                  The metaTag is added in the meta description of the HTML header. This helps your
                  blog rank for SEO and lets users know what the website is about.
                </div>
              </div>
            ) : (
              ""
            )}

            {text ? (
              <h1 className="w-[80%] sm:w-full  mt-5 mb-5 max-w-screen-md  text-2xl font-bold sm:tracking-tight text-center">
                Completed Blog:
              </h1>
            ) : (
              <div></div>
            )}
            {text ? (
              <div className="flex flex-row w-[80%] min-h-screen">
                <MdEditor
                  className="min-h-screen"
                  modelValue={text}
                  onChange={setText}
                  language="en-US"
                  toolbarsExclude={["github"]}
                />
              </div>
            ) : (
              ""
            )}

            {text ? (
              <div
                className="mt-10 text-2xl font-bolt hover:cursor-pointer capitalize text-white bg-black p-3 rounded-xl hover:bg-gray-700"
                onClick={downloadFile}
              >
                download
              </div>
            ) : (
              <div></div>
            )}

            {loading ? (
              <div className="mt-10">
                <Planets />
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center mt-[150px]">
          <div className="sm:w-[60%] w-[90%]  flex flex-col items-center justify-center text-black font-serif  mb-28">
            <h1 className="text-2xl font-bold">FAQ</h1>
            <div className="w-[80%]">
              <h2 className="mt-3 font-bold">What?</h2>
              <p className="mt-3">
                Create a blog on any topic in seconds We use prompt engineering with chat GPT api to
                create SEO ranking blogs for free.
              </p>
              <h2 className="mt-5 font-bold">Why?</h2>
              <p className="mt-3">
                Chat GPT is an amazing resource but can be improved on for specific cases. Trying to
                use Chat GPT for creating blog posts is a mess. You need to include the best prompt
                to get a Title tag, meta description, and blog post. We tested and found the best
                prompts to use and simplified the process. Blog GPT also allows you to edit the blog
                you get and download the final result as a markdown file. This cannot be done in
                Chat GPT but greatly simplifies the blog making process.
              </p>

              <h2 className="mt-5 font-bold">How does it work?</h2>
              <p className="mt-3">
                The idea is pretty simple, all you have to do is enter a topic you want a blog to be
                written about and wait. It takes a few minutes to generate the Title tag, meta
                description, and blog post. After that is complete, you can edit the blog in the
                markdown editor. Finally, hit the download button to save all of your changes and
                download a markdown file of your blog. This can then be posted to any website.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
