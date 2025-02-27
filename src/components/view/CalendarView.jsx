import PropTypes from "prop-types"
import { useState } from "react"
import FixedBottomButton from "../button/FixedBottomButton"
import DateRangeCalendar from "../calendar/DateRangeCalendar"
import HeatmapCalendar from "../calendar/HeatmapCalendar"
import Tab from "../common/Tab"

export default function CalendarView({ eventInfo }) {
  // ! mock data
  // 참여 가능 날짜
  const startDate = new Date(2025, 2, 1)
  const endDate = new Date(2025, 4, 31)
  // 전체 참여자
  const totalVotes = 5
  // 참여자들이 선택한 날짜와 선택한 인원 수
  const selectedDates = [
    {
      date: new Date(2025, 2, 5),
      votes: 2,
    },
    {
      date: new Date(2025, 2, 15),
      votes: 4,
    },
    {
      date: new Date(2025, 3, 2),
      votes: 1,
    },
    {
      date: new Date(2025, 4, 22),
      votes: 5,
    },
  ]

  const tabs = [
    {
      id: "input",
      label: "입력",
      jsx: (
        <>
          <section>
            <div className="space-y-1">
              <h2 className="font-bold">일정 선택</h2>
              <p className="text-sm text-stone-500">
                참여 가능한 일정을 선택해주세요.
              </p>
            </div>

            <DateRangeCalendar />
          </section>

          <FixedBottomButton>초기화</FixedBottomButton>
        </>
      ),
    },
    {
      id: "view",
      label: "조회",
      jsx: (
        <>
          <HeatmapCalendar
            startDate={startDate}
            endDate={endDate}
            totalVotes={totalVotes}
            selectedDates={selectedDates}
          />
        </>
      ),
    },
  ]

  const [currentTab, setCurrentTab] = useState(tabs[0].id)

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">{eventInfo.title}</h2>

      <Tab tabs={tabs} currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  )
}

CalendarView.propTypes = {
  eventInfo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
}
