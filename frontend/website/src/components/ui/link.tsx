import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

const Link: React.FC<
  NextLinkProps & { className?: string; children?: ReactNode }
> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <span {...props}>{children}</span>
    </NextLink>
  );
};

export default Link;
