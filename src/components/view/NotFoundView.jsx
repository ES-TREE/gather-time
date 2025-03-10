import { Link } from "react-router-dom"

export default function NotFoundView() {
  return (
    <article className="fixed left-0 top-0 z-50 h-screen w-full">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-400 to-primary-100 p-5">
        <div className="w-full max-w-sm space-y-5 rounded-3xl bg-white bg-opacity-80 p-8 text-center shadow-lg">
          <div className="space-y-2 text-stone-700">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl font-bold">찾을 수 없는 이벤트에요</h2>
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="rounded-full border border-primary-400 bg-white px-6 py-2 font-bold text-primary-400 transition duration-300 hover:bg-stone-100"
            >
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
