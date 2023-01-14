import { Popover } from '@headlessui/react';
import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

const LOCATIONS = ['left-0', 'right-0', 'left-0 bottom-0', 'right-0 bottom-0'];

export default function Index() {
  const referenceElement = useRef<HTMLButtonElement | null>(null);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
      placement: 'bottom',
      strategy: 'absolute',
    },
  );

  return (
    <div className="h-screen border-8 border-blue-300 relative">
      <div style={{ display: 'none' }}>
        <div>Hello1</div>
      </div>
      <div style={{ visibility: 'hidden' }}>
        <div>Hello2</div>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            setCurrentIndex((prev) => {
              const next = prev + 1;
              return next % LOCATIONS.length;
            });
          }}
        >
          Change
        </button>
        {currentIndex}
      </div>
      <Popover
        className={[
          'border-4 border-red-400 absolute right-0',
          LOCATIONS[currentIndex],
        ].join(' ')}
      >
        <Popover.Button ref={referenceElement}>Solutions</Popover.Button>

        <Popover.Panel
          ref={popperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="border-2 border-blue-400">hello world</div>
          <div id="arrow" ref={setArrowElement} style={styles.arrow} />
        </Popover.Panel>
      </Popover>
    </div>
  );
}
