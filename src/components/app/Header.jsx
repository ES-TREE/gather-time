import appLogo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full flex items-center gap-2 h-14 pl-2">
      <img src={appLogo} alt="로고" width={36} height={36} />
      <h1 className="font-bold">GatherTime</h1>
    </header>
  );
}
