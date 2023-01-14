import { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { useInnerHeight } from '../../hooks';

export default function Index() {
  const { innerHeight } = useInnerHeight();
  const { height } = useWindowSize();

  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    }
  }, []);

  if (!ref.current) {
    return null;
  }

  return (
    <>
      <div>{innerHeight}</div>
      <div>{height}</div>
    </>
  );
}
