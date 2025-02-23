import PropTypes from "prop-types"

export default function Tab({ tabs = [], currentTab = "", onChangeTab }) {
  if (!tabs || tabs.length === 0) {
    return null
  }

  return (
    <>
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

      {tabs.find((tab) => tab.id === currentTab).jsx}
    </>
  )
}

Tab.propTypes = {
  tabs: PropTypes.array,
  currentTab: PropTypes.string,
  onChangeTab: PropTypes.func.isRequired,
}
