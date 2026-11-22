export default function Section({
  as: Element = 'section',
  children,
  className = '',
  id,
  labelledBy,
}) {
  return (
    <Element
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-ink/20 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </Element>
  );
}
