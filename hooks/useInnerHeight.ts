import { useEffect, useRef, useState } from "react";

/**
 * @returns 브라우저 윈도우 크기
 */
export default function useInnerHeight() {
  const didMountRef = useRef(true);
  const [innerHeight, setInnerHeight] = useState("");

  const onResize = () => {
    setInnerHeight(window.innerHeight + "px");
  };

  useEffect(() => {
    if (didMountRef.current) {
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    } else {
      didMountRef.current = false;
    }
  }, []);

  return { innerHeight };
}
