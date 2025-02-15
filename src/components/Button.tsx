import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ComponentProps,
} from 'react';
import { mergeClasses, titleCase } from '../helpers';
import { LinkBase, type LinkBaseProps } from './Link';

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const btnVariants = cva(
  'inline-flex rounded-md outline-none focus:outline font-medium gap-2 active:scale-98 items-center whitespace-nowrap text-sm transition focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
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
        sm: 'h-8 px-3 [&_svg]:size-6',
        md: 'h-9 px-3 py-2 [&_svg]:size-5',
        lg: 'h-10 px-4 [&_svg]:size-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type IconComponent = React.ComponentType<{ className?: string }>;

export type ButtonProps = ButtonBaseProps &
  VariantProps<typeof btnVariants> &
  LinkBaseProps & {
    leftSlot?: ReactElement<ComponentProps<IconComponent>> | ReactElement;
    rightSlot?: ReactElement<ComponentProps<IconComponent>> | ReactElement;
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
  leftSlot,
  rightSlot,
  href,
  openInNewTab,
  variant,
  size,
  capitalise = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  const isLeftSlotIcon = leftSlot && isIconComponent(leftSlot);
  const isRightSlotIcon = rightSlot && isIconComponent(rightSlot);
  const iconClasses = '[data-disabled:opacity-60]';

  const twClasses = mergeClasses(
    btnVariants({ variant, size, className }),
    disabled && 'cursor-default opacity-80 pointer-event-none',
    size === 'md'
  );

  const content = (
    <>
      {isLeftSlotIcon && leftSlot
        ? cloneElement(leftSlot, getIconProps(leftSlot, iconClasses))
        : leftSlot}
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
      {isRightSlotIcon && rightSlot
        ? cloneElement(rightSlot, getIconProps(rightSlot, iconClasses))
        : rightSlot}
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
  }

  return (
    <ButtonBase className={twClasses} disabled={disabled} {...rest}>
      {content}
    </ButtonBase>
  );
}

function isIconComponent(
  element: ReactElement
): element is ReactElement<ComponentProps<IconComponent>> {
  if (isValidElement(element)) {
    return (
      element.type.toString().includes('Icon') ||
      (typeof element.type === 'function' && element.type.name.includes('Icon'))
    );
  }
  return false;
}

function getIconProps(element: ReactElement<ComponentProps<IconComponent>>, classNames: string) {
  return {
    ...element.props,
    className: mergeClasses(classNames, element.props.className),
  };
}
