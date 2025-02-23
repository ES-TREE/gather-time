import PropTypes from "prop-types"

const tabs = [
  { id: "input", label: "입력" },
  { id: "view", label: "조회" },
]

export default function Tab({ currentTab = tabs[0].id, onChangeTab }) {
  return (
    <ul className="flex items-center justify-center rounded-lg bg-stone-100 p-2 text-sm">
      {tabs.map((tab) => (
        <li key={tab.id} className="w-full">
          <button
            className={`block w-full rounded-lg p-2 ${
              currentTab === tab.id
                ? "bg-primary-400 font-semibold text-white"
                : "bg-transparent"
            }`}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

Tab.propTypes = {
  currentTab: PropTypes.string,
  onChangeTab: PropTypes.func.isRequired,
}
