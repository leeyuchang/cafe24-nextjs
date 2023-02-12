import { Dialog } from '@headlessui/react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

export default function Example() {
  const { height } = useWindowSize();

  const [innerHeight, setInnerHeight] = useState<number | null>(null);
  const [commentInputHeight, setCommentInputHeight] = useState<number>(50);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (height) {
      setInnerHeight(height);
    }
  }, [height]);

  if (!innerHeight) {
    return null;
  }

  return (
    <>
      <button
        className="border border-gray-400 p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Show
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <div
          className={[
            'fixed inset-0',
            `h-[${innerHeight}px]`,
            'flex items-center justify-center',
            'bg-white',
            'p-4 border-4 border-red-500',
          ].join(' ')}
        >
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={[
              'w-full h-full', // Mobile
              'md:max-w-[58.625rem] md:max-h-[42.5rem]', // PC
              'md:rounded-md',
              'border-2 border-red-500',
            ].join(' ')}
          >
            <div
              style={{
                display: 'grid',
                height: '100%',
                width: '100%',
                gridTemplateRows: `50px auto ${commentInputHeight}px`,
              }}
            >
              <div className="bg-blue-200">Header</div>
              <div className="overflow-y-auto">
                <ul className="space-y-2 p-2 ">
                  {[...new Array(100)].map((_, idx) => (
                    <li
                      key={idx}
                      className="text-lg border border-black/10 rounded-md p-2"
                    >
                      {idx + 1}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-200 ">
                <div className="flex justify-around">
                  <span
                    className="p-3 border-2 border-black"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <PhoneIcon width={20} height={20} className="h-5 w-5" />
                  </span>
                  <a
                    className="p-3 border-2 border-black"
                    onClick={() =>
                      setCommentInputHeight((prev) => (prev === 50 ? 150 : 50))
                    }
                  >
                    <EnvelopeIcon width={20} height={20} className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
