import PropTypes from "prop-types";

const tabs = [
  { id: "input", label: "입력" },
  { id: "view", label: "조회" },
];

export default function Tab({ currentTab = tabs[0].id, onChangeTab }) {
  return (
    <ul className="flex items-center justify-center p-2 bg-gray-100 rounded-lg">
      {tabs.map((tab) => (
        <li key={tab.id} className="w-full">
          <button
            className={`block w-full p-2 rounded-lg ${
              currentTab === tab.id
                ? "bg-primary-500 text-white font-semibold"
                : "bg-transparent"
            }`}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

Tab.propTypes = {
  currentTab: PropTypes.string,
  onChangeTab: PropTypes.func.isRequired,
};
