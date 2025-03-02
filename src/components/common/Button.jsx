import PropTypes from "prop-types"

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fill: PropTypes.bool,
}

export default function Button({ fill = true, className, children, ...props }) {
  const buttonStyle = fill
    ? "bg-primary-400 text-white"
    : "bg-white text-primary-400 border border-primary-400"

  return (
    <button
      className={`${buttonStyle} w-full rounded-lg py-3 text-sm font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
