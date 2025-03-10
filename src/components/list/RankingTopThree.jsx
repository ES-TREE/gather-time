import PropTypes from "prop-types"

RankingTopThree.propTypes = {
  title: PropTypes.string,
  rankings: PropTypes.array,
}

export default function RankingTopThree({ title = "", rankings = [] }) {
  // 순위별 스타일 설정
  const getRankStyle = (position) => {
    switch (position) {
      case 0:
        return "text-yellow-600 font-bold"
      case 1:
        return "text-stone-500 font-semibold"
      case 2:
        return "text-amber-700 font-semibold"
      default:
        return "text-stone-700"
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-1 rounded-lg bg-stone-50 p-5">
      <h2 className="font-bold text-primary-400">{title}</h2>
      <ul className="overflow-hidden rounded-md bg-white text-sm shadow-sm">
        {rankings.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center p-4 ${
              index < rankings.length - 1 ? "border-b border-stone-100" : ""
            }`}
          >
            <span className={`${getRankStyle(index)} mr-4 w-6 text-center`}>
              {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
            </span>
            <span className="flex-grow text-base font-semibold text-stone-800">
              {item.date}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs">
              {item.votes}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
