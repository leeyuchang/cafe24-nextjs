import { useCallback, useState } from 'react';

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const [array, setArray] = useState<number[]>([]);

  const handleAdd = useCallback(() => {
    setArray((prev) => prev.concat(prev.at(-1) || 0 + 1));
  }, []);

  const handleReset = useCallback(() => {
    setArray([]);
  }, []);

  // const { user, setUser, loading, authenticated } = useAuth();

  return (
    <>
      <div className="w-[500px] h-[200px] bg-yellow-400 overflow-y-auto">
        <ul className="bg-green-200 border-4 flex flex-col flex-wrap h-full">
          {array.map((_, index) => (
            <span key={index} className={['last:bg-red-400'].join(' ')}>
              {index}
            </span>
          ))}
        </ul>
      </div>

      <div className="border flex gap-10 ">
        <button className="border-2" onClick={handleAdd}>
          Add
        </button>
        <button className="border-2" onClick={handleReset}>
          Reset
        </button>
        <button className="border-2" onClick={() => {}}>
          User
        </button>
      </div>
      <span className="border-4 border-red-500">Span</span>
    </>
  );
}
