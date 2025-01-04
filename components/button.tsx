import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react';
import { mergeClasses, titleCase } from '../helpers';
import { LinkBase, type LinkBaseProps } from './link';
export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const btnVariants = cva(
  'inline-flex border rounded-md outline-none focus:outline font-medium gap-2 active:scale-98 items-center whitespace-nowrap text-sm transition focus-visible:outline-none  [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        dark: 'bg-black border-0 text-white shadow-xs [&_svg]:text-white dark:bg-white dark:text-black',
        primary:
          'bg-btn-primary border-btn-primary text-white shadow-xs [&_svg]:text-btn-primary-icon hocus:bg-btn-primary',
        danger: 'bg-danger border-0 [&_svg]:text-white text-white shadow-xs',
        outline:
          'bg-white text-default border-btn-outline hocus:bg-btn-outline-hover shadow-xs [&_svg]:text-btn-outline-icon',
        plain:
          'border-0 text-default hover:bg-[#eceef0] [&_svg:text-[#687076]]',
      },
      size: {
        primary: 'h-9 px-4 [&_svg]:size-6',
        sm: 'h-8 rounded-md px-3 [&_svg]:size-5',
        lg: 'h-10 rounded-md px-8 [&_svg]:size-5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

export function ButtonBase({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}: ButtonBaseProps) {
  return (
    <button
      className={mergeClasses('flex cursor-pointer', className)}
      disabled={disabled}
      type={type}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export type ButtonProps = ButtonBaseProps &
  VariantProps<typeof btnVariants> &
  LinkBaseProps & {
    right?: ReactElement;
    left?: ReactElement;
    capitalize?: boolean;
  };

export default function Button({
  children,
  className,
  right,
  left,
  href,
  openInNewTab,
  variant,
  size,
  capitalize = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  const isLeftIcon = left && isIconElement(left);
  const isRightIcon = right && isIconElement(right);
  const iconClasses = '[data-disabled:opacity-60]';

  const twClasses = mergeClasses(
    btnVariants({ variant, size, className }),
    disabled && 'cursor-default opacity-80 pointer-event-none',
    size === 'sm' && '[&_svg:size-4]'
  );

  const content = (
    <>
      {isLeftIcon ? cloneElement(left, getIconProps(left, iconClasses)) : left}
      {children && (
        <span
          className={mergeClasses(
            'flex self-center text-inherit leading-none',
            href && 'select-none'
          )}
        >
          {typeof children === 'string' && !capitalize
            ? titleCase(children)
            : children}
        </span>
      )}
      {isRightIcon
        ? cloneElement(right, getIconProps(right, iconClasses))
        : right}
    </>
  );
  if (href) {
    return (
      <LinkBase
        href={href}
        className={twClasses}
        disabled={disabled}
        openInNewTab={openInNewTab}
        {...rest}
      >
        {content}
      </LinkBase>
    );
  } else {
    return (
      <ButtonBase className={twClasses} disabled={disabled} {...rest}>
        {content}
      </ButtonBase>
    );
  }
}

function isIconElement(element: ReactElement) {
  if (isValidElement(element)) {
    // @ts-expect-error React Portal did not have `displayName` prop, but it is a valid element
    return element.type?.displayName?.endsWith('Icon') ?? false;
  }
  return false;
}

function getIconProps(element: ReactElement, classNames: string) {
  return {
    ...(element.props as Record<string, any>),
    //@ts-expect-error
    className: mergeClasses(classNames, element.props.className),
  };
}
