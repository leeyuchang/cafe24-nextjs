import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMoble] = useState(false);

  useEffect(() => {
    setIsMoble(window.innerWidth < 600);
  }, []);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}
