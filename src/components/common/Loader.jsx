import PropTypes from "prop-types"

Loader.propTypes = {
  children: PropTypes.node,
}

export default function Loader({ children }) {
  return (
    <article className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center">
      <div className="py-content flex flex-col items-center gap-5 rounded-xl bg-white px-8 text-sm text-stone-500 lg:text-base">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-400 border-b-transparent" />
        {children}
      </div>
    </article>
  )
}
