import PropTypes from "prop-types"

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default function Modal({ open, children, className = "" }) {
  if (!open) {
    return null
  }

  return (
    <article className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-stone-900 bg-opacity-40 p-5">
      <div
        className={`relative w-full max-w-screen-sm rounded-2xl bg-white p-5 ${className}`}
      >
        {children}
      </div>
    </article>
  )
}
