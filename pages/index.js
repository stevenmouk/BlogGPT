import Head from "next/head";
import Image from "next/image";
import { ImBooks } from "react-icons/im";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";

import dynamic from "next/dynamic";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("# Hello Editor");

  const [title, setTitle] = useState(null);
  const [metaTag, setMetaTag] = useState(null);
  const [list, setList] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    // window.open("/" + e.target[0].value);

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
  Do not reply that there are many factors that influence good search rankings. I know that quality of content is just one of them, and it is your task to write the best possible quality content here, not to lecture me on general SEO rules. I give you the Title ${e.target[0].value} of an article that we need to outrank in Google. Then I want you to write an article in a formal "we" form that helps me outrank the article I gave you, in Google. Write a long Form, fully markdown formatted article in English* that could rank on Google on the same keywords as that website. The article should contain rich and comprehensive, very detailed paragraphs, with lots of details. Do not echo my prompt. Let the article be a long Form article of a minimum of 2000 words. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do now use generic filler phrases. Do use useful subheadings with keyword-rich titles. Get to the point precisely and accurately. Do not explain what and why, just give me your best possible article. write it in a markdown format`),
    });

    let data = await res.json();
    let promptRes = data.result.choices[0].text;

    console.log(promptRes);
    console.log("done");
    setTitle(promptRes);

    // meta(promptRes);

    // listing(promptRes, metaTag);

    setText(promptRes);
    // e.target[0].value = "";
  }

  async function meta(promtRes) {
    let res = await fetch("/api/openAI", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(`write me a meta description on ${promtRes}.`),
    });

    let data = await res.json();
    let promptRes2 = data.result.choices[0].text;

    setMetaTag(promptRes2);
  }

  async function listing(promtRes, metaTag) {
    let res = await fetch("/api/openAI", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(
        `write me 10 subheadings on ${promtRes} with a description of ${metaTag}.`
      ),
    });

    let data = await res.json();
    let arr = data.result.choices[0].text.split(",");
    setList(arr);
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
          <div className="mt-3 pl-4  h-16 flex flex-row justify-between ">
            <Link href="/">
              <ImBooks className="text-3xl  " />
            </Link>
            <Link href="/">
              <h1 className="font-serif text-3xl font-bold pl-8 sm:pl-0 hidden sm:inline">
                Free Scholarly Articles
              </h1>
            </Link>
            <div></div>
          </div>

          <div className="w-full min-h-screen flex items-center flex-col mt-5  ">
            <h1 className="w-[80%] sm:w-full pt-20  pb-7  max-w-screen-md  text-4xl sm:text-5xl md:text-7xl font-extrabold sm:tracking-tight text-center">
              Search over 30 million scholarly articles.
            </h1>
            <p className="text-black w-[80%] sm:w-[50%]">
              Free Scholarly Articles works by scraping open access content from over 50,000
              publishers and repositories, making it easy to read and use. Simply enter the DOI code
              of the article and hit search.
            </p>
            <form onSubmit={handleSubmit} className="flex justify-center mt-20">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-row items-stretch w-full mb-4">
                  <input
                    type="text"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
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

            {/* {metaTag ? (
              <div className="flex flex-row space-x-3 w-[70%] mt-4">
                <div>{metaTag}</div>
                <div className="hover:cursor-pointer" onClick={() => meta(title)}>
                  reroll
                </div>
              </div>
            ) : (
              ""
            )}
            {list
              ? list.map((list) => {
                  return (
                    <div className="flex flex-row space-x-3 w-[70%] mt-4">
                      <div>{list}</div>
                      <div className="hover:cursor-pointer">reroll</div>
                    </div>
                  );
                })
              : ""} */}
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center mt-[50px]">
          <div className="sm:w-[60%] w-[90%]  flex flex-col items-center justify-center text-black font-serif  mb-28">
            <h1 className="text-2xl font-bold">FAQ</h1>
            <div className="w-[80%]">
              <h2 className="mt-3 font-bold">What?</h2>
              <p className="mt-3">
                Search for any scholarly aticle in seconds. We use over 50,000 publishers to scrape
                free and open scholarly articles. This means all you have to do is enter the DOI
                code and read the article without the annoying price tag.
              </p>
              <h2 className="mt-5 font-bold">Why?</h2>
              <p className="mt-3">
                We believe education is a basic human right and should be available to anyone for no
                cost. As such, we worked to create a site where people can find and read any
                scholarly article they want without worrying about paying.
              </p>
              <p className="mt-3">
                You should be able to enjoy reading published research without worrying about
                affording it.
              </p>
              <h2 className="mt-5 font-bold">How does it work?</h2>
              <p className="mt-3">
                The idea is pretty simple, we scrape open publishers and put the free versions of
                the articles in one website. We allow users to find any of those scholarly articles
                if they encounter a paywall on other websites. You can download any pdf and store it
                locally. To download, simply search for the article and press the download button on
                the top right corner.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
