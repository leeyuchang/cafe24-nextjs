import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInnerHeight } from '../../hooks';

const ScrollableLayout: NextPage = () => {
  const { innerHeight } = useInnerHeight();

  const [array1, setArray1] = useState([...Array(100)]);
  const [array2, setArray2] = useState([...Array(100)]);

  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView1) {
      setArray1((prev) => prev.concat([...Array(10)]));
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2) {
      setArray2((prev) => prev.concat([...Array(10)]));
    }
  }, [inView2]);

  if (!innerHeight) return null;

  return (
    <div style={{ height: innerHeight }} className={'flex flex-col'}>
      <div className="bg-pink-400 p-4">Header</div>
      <div className="bg-yellow-200 p-4">Breadcrumb</div>
      <div className="h-full relative">
        <div className="bg-green-300 text-white p-2 absolute top-0 bottom-0 left-0 w-40 overflow-y-auto">
          {array1.map((_, index) => (
            <div
              className="h-36 border flex items-center justify-center mb-1 text-black"
              key={index}
            >
              {index + 1}
            </div>
          ))}
          <div className="h-px" ref={ref1} />
        </div>
        <div className="absolute p-5 top-0 left-40 right-0 bottom-0 overflow-y-auto bg-blue-400 text-white">
          {array2.map((_, index) => (
            <div
              className="h-36 border flex items-center justify-center mb-1 text-base"
              key={index}
            >
              {index + 1}
            </div>
          ))}
          <div className="h-px" ref={ref2} />
        </div>
      </div>
      <div className="h-20 p-4">Footer</div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ScrollableLayout;
