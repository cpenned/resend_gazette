const Wrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`grid gap-3 bg-overlay/40 backdrop-blur-md ~py-3/4 ~px-3/4 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
};
export default Wrapper;
