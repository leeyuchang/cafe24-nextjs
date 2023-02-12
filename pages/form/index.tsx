import { KeyboardEvent, useRef } from 'react';

function isEntered<T>(event: KeyboardEvent<T>, callback: () => void) {
  if (event.key === 'Enter') {
    callback();
  }
}

const onClick = async () => {
  return new Promise((resolve) => {
    alert('Button onKeyDown ');
    resolve('OK');
  });
};

const Index = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <label className='block outline'>&nbsp;</label>
      <form
        className="p-2 grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-6"
        onSubmit={() => alert('onsubmit')}
      >
        <div className="sm:col-span-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border focus:outline-indigo-500 focus:outline focus:ring-indigo-500"
            ref={nameRef}
            onKeyDown={(e) =>
              isEntered<HTMLInputElement>(e, () => emailRef.current?.focus())
            }
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            ref={emailRef}
            type="text"
            className="w-full border focus:outline-indigo-500 focus:outline focus:ring-indigo-500"
            onKeyDown={(e) =>
              isEntered<HTMLInputElement>(e, () => btnRef.current?.focus())
            }
          />
        </div>
        <div className="sm:col-span-1">
          <label className="hidden sm:block">&nbsp;</label>
          <button
            type="button"
            className="border rounded w-full max-w-[20rem] shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            ref={btnRef}
            onKeyDown={(e) => isEntered<HTMLButtonElement>(e, onClick)}
          >
            Button
          </button>
        </div>
      </form>
    </>
  );
};

export default Index;
