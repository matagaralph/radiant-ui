import type { AnchorHTMLAttributes } from 'react';
import { Link as ReactRouterLink, type LinkProps } from 'react-router';

export default function Link({
  href,
  children,
  ...rest
}: Omit<LinkProps, 'to'> & { href: string }) {
  return (
    <ReactRouterLink to={href} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

export type LinkBaseProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  openInNewTab?: boolean;
  disabled?: boolean;
  skipLink?: boolean;
};

export function LinkBase({
  children,
  href,
  openInNewTab,
  onClick,
  target,
  disabled,
  skipLink,
  rel,
  ...rest
}: LinkBaseProps) {
  if (disabled) {
    return <a {...rest}>{children}</a>;
  }

  if (!href || href.startsWith('#')) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const Tag = skipLink ? 'a' : Link;

  return (
    <Tag
      href={href}
      onClick={onClick}
      target={openInNewTab ? '_blank' : target}
      rel={openInNewTab ? 'noopener noreferrer' : rel}
      {...rest}
    >
      {children}
    </Tag>
  );
}
