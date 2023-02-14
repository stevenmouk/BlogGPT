import React, { useEffect, useState } from "react";
import cheerio from "cheerio";
import Image from "next/image";
import { ImBooks } from "react-icons/im";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import UserAgent from "user-agents";

export default function Test({ id }) {
  const userAgent = new UserAgent();
  const [error, setError] = useState(false);
  setTimeout(() => {
    setError(true);
  }, 2000);
  let headers = new Headers();

  const router = useRouter();

  useEffect(() => {
    let url = "";
    for (let i = 0; i < id.length; i++) {
      url += id[i] + "";

      if (i == id.length - 1) {
        break;
      }
      if (i == 0 && id[0].includes("http")) {
        url += "//";
      } else {
        url += "/";
      }
    }

    // router.push("http://library.lol/scimag/" + url);
    // console.log(userAgent.toString());
    // fetch("/api/bookapi", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(`${url}`),
    //   // prettier-ignore
    //   // headers: {

    //   //   "User-Agent":
    //   //   userAgent.toString(),
    //   // },
    // }).then(async (response) => {
    //   let html4 = await response.json();
    //   // console.log(html4);
    //   html4 = html4.result;

    //   console.log(html4);
    //   // let $4 = cheerio.load(html4);

    //   // $4("#article", html4).each(function () {
    //   //   let link = $4(this).find("embed").attr("src");

    //   //   if (link.includes("downloads")) {
    //   //     router.push(`https://sci-hub.ru/${link}`);
    //   //   } else {
    //   //     router.push(`https:${link}`);
    //   //   }
    //   // });
    // });
  }, []);

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
      {error ? (
        <main className=" min-h-screen  flex flex-col ">
          <div className="w-full flex flex-col">
            <div className="mt-3 pl-4  h-16 flex flex-row justify-between ">
              <Link href="/">
                <ImBooks className="text-3xl  " />
              </Link>
              <Link href="/">
                <h1 className="font-serif text-3xl font-bold pl-8 sm:pl-0">
                  Free Scholarly Articles
                </h1>
              </Link>
              <div></div>
            </div>

            <div className="w-full h-full flex items-center justify-center flex-col mt-5  ">
              <h1 className="px-0 sm:px-6 pt-20 pb-7 md:px-0 max-w-screen-md text-5xl md:text-7xl font-extrabold tracking-tight   ">
                Sorry article not found.
              </h1>
              <p className="text-black w-[80%] sm:w-[50%]">
                Please try search again with a different article.
              </p>

              <Link href="/" className="mt-16 text-black font-bold text-xl hover:underline">
                return to main page
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <div />
      )}

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  return {
    props: {
      id: id,
    },
  };
}
