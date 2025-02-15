import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, cloneElement, isValidElement, type ReactElement } from 'react';
import { mergeClasses, titleCase } from '../helpers';
import { LinkBase, type LinkBaseProps } from './Link';

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const btnVariants = cva(
  'inline-flex  rounded-md outline-none focus:outline font-medium gap-2 active:scale-98 items-center whitespace-nowrap text-sm transition focus-visible:outline-none  [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: '',
        primary: 'bg-sky-500 text-white dark:bg-sky-600',
        secondary: '',
        danger: '',
        quaternary: '',
      },
      size: {
        sm: 'h-7 px-3 [&_svg]:size-4',
        md: 'h-8 px-3 [&_svg]:size-5',
        lg: 'h-9 px-3 [&_svg]:size-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

export type ButtonProps = ButtonBaseProps &
  VariantProps<typeof btnVariants> &
  LinkBaseProps & {
    right?: ReactElement;
    left?: ReactElement;
    capitalise?: boolean;
  };

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

export default function Button({
  children,
  className,
  right,
  left,
  href,
  openInNewTab,
  variant,
  size,
  capitalise = false,
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
            'flex self-center leading-none text-inherit',
            href && 'select-none'
          )}
        >
          {typeof children === 'string' && !capitalise ? titleCase(children) : children}
        </span>
      )}
      {isRightIcon ? cloneElement(right, getIconProps(right, iconClasses)) : right}
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
