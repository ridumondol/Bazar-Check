export default function Avatar({ user, size = 36, className = "rounded-[10px]" }) {
  const style = { width: size, height: size };
  if (user?.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt={user.name} style={style} className={`${className} object-cover`} />;
  }
  return (
    <span
      style={{ ...style, fontSize: Math.round(size * 0.4) }}
      className={`inline-flex shrink-0 items-center justify-center bg-brand font-semibold text-brand-content ${className}`}
    >
      {(user?.name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}
