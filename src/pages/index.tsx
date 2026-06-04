import React from "react";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import RotorflightSvg from "@site/static/img/Rotorflight3.svg";
import BgVidMp4 from "@site/static/vid/rf_bg_vid_1920.mp4";
import BgVidWebm from "@site/static/vid/rf_bg_vid_1920.webm";
import BgVidPoster from "@site/static/img/rf_bg_vid_poster_1920.webp";

import styles from "./index.module.css";
import Head from "@docusaurus/Head";

function HomepageHeader() {
  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        autoPlay
        playsInline
        loop
        muted
        preload="none"
        aria-hidden={true}
        poster={BgVidPoster}
      >
        <source src={BgVidWebm} type="video/webm" />
        <source src={BgVidMp4} type="video/mp4" />
      </video>
      <div className={styles.mask}></div>
      <RotorflightSvg className={styles.content} />
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Homepage"
      description="Open Source RC Helicopter Flight Controller"
    >
      <Head>
        <link
          rel="preload"
          as="image"
          href={BgVidPoster}
          fetchPriority="high"
        />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
