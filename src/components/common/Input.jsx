import PropTypes from "prop-types"
import { useId } from "react"

export default function Input({ label = "", className = "", ...props }) {
  const id = useId()

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-lg border border-stone-300 p-2 outline-none focus:border-primary-400 ${className}`}
        {...props}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
}
