import PropTypes from "prop-types";

export default function Button({ fill, className, children, ...props }) {
  const buttonStyle = fill
    ? "bg-primary-500 text-white"
    : "bg-white text-primary-500 border border-primary-500";

  return (
    <button
      className={`${buttonStyle} p-2 font-semibold rounded-lg w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fill: PropTypes.bool,
};
