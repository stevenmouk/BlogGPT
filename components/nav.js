import Image from "next/image";
import React from "react";
import styles from "../styles/nav.module.css";

export default function Nav() {
  return (
    <div className={` min-h-screen min-w-screen ${styles.body} flex flex-col `}>
      <div className="mt-5 ml-5">
        <Image src="/images/bloggpt-low2.png" height={100} width={100}></Image>
      </div>

      <div className={` mt-40 ${styles.body} flex items-center justify-center flex-col `}>
        <h1 className={`${styles.fspmxi} ${styles.title} space-x-5`}>
          <div
            className={`${styles.cKqlIw} ${styles.line} flex item-start justify-start w-full ml-5 mb-3`}
          ></div>
          <span className={`${styles.red} ${styles.word}`}>
            <span>Blog</span>
          </span>
          <span className={styles.word}>
            <span>GPT</span>
          </span>
        </h1>
      </div>

      <div className="text-white w-full flex items-center justify-center flex-col">
        <p className="w-[50%] text-center font-bold font-mono text-2xl">
          Create the best free blog post in seconds. Simply enter any topic below to get a free ai
          generated blog post.
        </p>
        <div className="text-white mt-10  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="100px"
            height="100px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
