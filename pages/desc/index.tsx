import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

const Index = () => {
  const { height } = useWindowSize();
  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    if (height) {
      setInnerHeight(height);
    }
  }, [height]);

  return (
    <div
      style={{
        height: `${innerHeight}px`,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div className="w-full h-full">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="">Applicant Information</h3>
          <p className="">Personal details and application.</p>
        </div>

        <div
          style={{ height: `calc(100% - 88px)` }}
          className="border-t border-gray-200 overflow-y-auto"
        >
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Margot Foster
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Backend Developer
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                margotfoster@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                $120,000
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Maxime, illum corporis sapiente
                nesciunt aut dolores! Pariatur optio, iusto quidem aut aliquam
                mollitia voluptatum rem, reprehenderit tempora quam expedita,lo
                deleniti quos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Dignissimos exercitationem odio quisquam
                adipisci atque magnam id, et libero provident omnis tempora,
                iusto a dolor laborum nihil alias reprehenderit itaque dolore.
                Voluptate odit deleniti ex eius explicabo numquam sit veritatis
                nihil pariatur illo odio, quo, dolores atque architecto velit
                aliquid repellendus sunt magni perspiciatis voluptatum quia,
                neque rem. Molestiae, corporis perspiciatis? Nesciunt vero aut
                corporis assumenda velit a rerum, amet dolor ipsum perspiciatis
                quas nostrum quis molestiae impedit quibusdam dolores tempora
                animi placeat reiciendis minima doloribus delectus sint.
                Molestias, nostrum sit? Nisi ad optio recusandae, illum placeat
                voluptas necessitatibus praesentium sequi alias dolores tempora
                beatae sit itaque, possimus eum minima veniam error commodi
                sunt? Odio possimus cumque fuga qui, repudiandae totam? Porro
                impedit laudantium fugiat doloremque{' '}
                <mark>
                  cum molestiae maiores qui asperiores sapiente? Architecto,
                  modi possimus eum maxime quae
                </mark>
                vitae reiciendis. Totam pariatur, officiis earum nihil quibusdam
                aut. Sint recusandae tempora fugit.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                  <li className="flex items-center justify-center py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span className="ml-2 w-0 flex-1 truncate">
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                      </a>
                    </div>
                  </li>
                  <li className="flex py-3 pl-3 pr-4 text-sm">
                    <div className="flex flex-1 ">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span className="ml-2 w-0 flex-1 truncate">
                        coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                      </span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Index;
