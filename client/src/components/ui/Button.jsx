import { Link } from 'react-router-dom';

const variantClass = {
  primary:
    'border-lime bg-lime text-ink hover:border-ink hover:bg-ink hover:text-lime focus-visible:outline-lime',
  secondary:
    'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink',
  dark: 'border-lime bg-lime text-ink hover:border-paper hover:bg-paper focus-visible:outline-lime',
};

export function buttonClass(variant = 'primary', className = '') {
  return `inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-sm font-bold transition-colors duration-200 ${variantClass[variant]} ${className}`;
}

export default function Button({
  to,
  href,
  variant = 'primary',
  className,
  children,
  ...props
}) {
  const classes = buttonClass(variant, className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
