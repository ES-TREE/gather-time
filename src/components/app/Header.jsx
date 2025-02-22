import appLogo from "../../assets/logo.png"

export default function Header() {
  return (
    <header className="flex h-14 w-full items-center gap-2 pl-2">
      <img src={appLogo} alt="로고" width={36} height={36} />
      <h1 className="font-bold">GatherTime</h1>
    </header>
  )
}
