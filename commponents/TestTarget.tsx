import React, { FC, PropsWithChildren, HTMLAttributes } from 'react';

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

const TestTarget: FC<Props> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default TestTarget;
