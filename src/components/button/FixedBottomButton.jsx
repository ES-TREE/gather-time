import PropTypes from "prop-types"
import Button from "../common/Button"

export default function FixedBottomButton({ children, ...props }) {
  return (
    <article className="fixed bottom-0 left-1/2 w-full max-w-screen-sm -translate-x-1/2 transform bg-white p-5">
      <Button {...props}>{children}</Button>
    </article>
  )
}

FixedBottomButton.propTypes = {
  children: PropTypes.node,
}
