import { Link } from "react-router-dom"
import appLogo from "../../assets/logo.png"

export default function Header() {
  return (
    <header className="h-14 w-full max-w-screen-sm pl-3">
      <Link to="/" className="flex h-full items-center gap-2">
        <img src={appLogo} alt="로고" width={36} height={36} />
        <h1 className="font-bold">GatherTime</h1>
      </Link>
    </header>
  )
}
