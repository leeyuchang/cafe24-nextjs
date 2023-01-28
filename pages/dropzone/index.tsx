import HelloWorld from '../../commponents/HelloWorld';

export default function Index() {
  // const onDrop = useCallback((files: File[]) => {
  //   // Do something with the files
  //   console.log('===> 호출됩니다. ', files);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onabort = () => console.log('file reading was aborted');
  //     reader.onerror = () => console.log('file reading has failed');

  //     reader.onloadend = () => {
  //       const binaryStr = reader.result;
  //       console.log('===> binaryStr ', binaryStr);
  //     };

  //     reader.readAsArrayBuffer(file);
  //   });
  // }, []);

  // if (typeof window === 'undefined') {
  //   return null;
  // }

  // const { height: innerHeight } = useWindowSize();

  // const [height, setHeight] = useState('100%');

  // useEffect(() => {
  //   setHeight(`${innerHeight}px`);
  // }, [innerHeight]);

  return (
    <div className="h-screen w-screen bg-yellow-300">
      <div className="bg-blue-400">Header</div>
      <HelloWorld />
      <div className='bg-red-300'>Footer</div>
    </div>
  );
}
