import { Dialog } from '@headlessui/react';
import { ChangeEvent, useEffect, useState } from 'react';

const Index = () => {
  /**
   * 모달을 어떻게하면 예측 가능하고, 깔금하게 만들수 있을까?
   * 해드리스UI에서 사용하는것과 Popper.js는 사용하는 목적이 서로 다르다.
   *
   * open이 true가 되면 Dialog의 children이 랜더링 된다.
   * Dialog.Panel 밖을 클릭하면 close event가 발생되어 Dialog onClose Prop이 Catch한다..
   * ESC를 누르면 close event가 발생되어 Dialog onClose Props이 catch한다.
   *
   * 여기서 중요한 말은 unmount 다. 컴포넌트가 html dom tree에 존재하지 않는다는 의미
   * className, style에 사용되는 hidden, block은 화면에 보이지는 않지만, html dom에는 존재함
   * 화면에서의 공간을 차지하지도 않는다. 하지만 html dom에는 존한다.
   *
   * parent이 children 감싸고 있을때, parent에 padding값을 줘서 children과의 내부 간격을 조절할 수 있다.
   * 순서를 지켜서 Dialog를 사용해야 esc를 누르면 순서대로 닫힌다.
   *
   */

  const [isOpen01, setIsOpen01] = useState(false);
  const [isOpen02, setIsOpen02] = useState(false);
  const [count, setCount] = useState(0);

  const onHandleInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('===> ', e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJSON = Object.fromEntries(formData.entries());
    console.log('===> formJSON ', formJSON);
  };

  return (
    <>
      <Dialog open={isOpen01} onClose={() => setIsOpen01(false)}>
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />

        {/* <div className="fixed inset-0 overflow-y-auto"> */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* <div className="flex min-h-full items-center justify-center p-4 border-4 border-red-400"> */}
          <div className="flex items-center justify-center p-4 border-4 border-red-400 overflow-hidden">
            <Dialog.Panel className="max-w-xl rounded bg-white p-4  overflow-y-auto">
              <Dialog.Title>1st</Dialog.Title>
              <Dialog.Description className="fontSize">
                This will permanently deactivate your account
              </Dialog.Description>

              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  className="ring-1 focus:ring-4"
                  name="input001"
                />
                <input
                  type="text"
                  className="ring-1 focus:ring-4"
                  name="input002"
                />

                <input type="checkbox" name="check001" value="check001values" />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsOpen02(true)}>
                    One more thing
                  </button>
                  <button type="button" onClick={() => setIsOpen01(false)}>
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </form>

              <div className="btn-primary">Button</div>

              {/* {[...Array(60)].map((each, idx) => (
                <div className="h-24 w-full border border-1" key={idx}>
                  {idx}
                </div>
              ))} */}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>

      <div>Hello world</div>
      <button onClick={() => setIsOpen01((prev) => !prev)}>
        {isOpen01 ? 'Hide' : 'Show'}
      </button>
    </>
  );
};

export default Index;
