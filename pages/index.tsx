import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      if (didMountRef.current) {
        (async () => await fetch("/api", { method: "get" }))();
      } else {
        didMountRef.current = true;
      }
    };
  }, []);

  const onSubmut = (e: SyntheticEvent) => {
    e.preventDefault(); // 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용
    (async () => await router.push("/login"))();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmut}>
          <label htmlFor="">Username</label>
          <input type="text" name="username" />
          <label htmlFor="">Password</label>
          <input type="text" name="password" />
          <button type="submit">Submit</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
