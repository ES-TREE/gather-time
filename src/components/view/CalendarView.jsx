import PropTypes from "prop-types"
import { useState } from "react"
import { formatToYYMMDD } from "../../utils/date"
import FixedBottomButton from "../button/FixedBottomButton"
import TimeGrid from "../calendar/TimeGridCalendar"
import Tab from "../common/Tab"
import RankingTopThree from "../list/RankingTopThree"

CalendarView.propTypes = {
  eventInfo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
}

export default function CalendarView({ eventInfo }) {
  // ! mock data
  // TODO 9:30분부터 시작이면 9.5로 저장
  const startHour = 9
  const endHour = 21
  // 참여 가능 날짜
  const registrationStart = new Date(2025, 2, 10)
  const registrationEnd = new Date(2025, 3, 20)
  // 전체 참여자
  const totalVotes = 5
  // Top3 날짜
  const topThreeDates = [
    { id: 1, date: "25년 3월 19일 10:00", votes: 4 },
    { id: 2, date: "25년 3월 29일 21:30", votes: 3 },
    { id: 3, date: "25년 4월 2일 16:30", votes: 2 },
  ]

  const tabs = [
    {
      id: "input",
      label: "입력",
      jsx: (
        <>
          <section className="space-y-2">
            <div className="space-y-1">
              <h2 className="font-bold">일정 선택</h2>
              <p className="text-sm text-stone-500">
                참여 가능한 일정을 선택해주세요.
              </p>
            </div>

            <TimeGrid
              startHour={startHour}
              endHour={endHour}
              registrationStart={registrationStart}
              registrationEnd={registrationEnd}
            />
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
          <section className="space-y-2">
            <div className="flex items-center justify-between font-semibold">
              <h2>
                {formatToYYMMDD(registrationStart)} ~{" "}
                {formatToYYMMDD(registrationEnd)}
              </h2>
              <h3>
                총 <span className="text-primary-400">{totalVotes}</span>명 참여
              </h3>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-stone-500">
                만날 가능성이 높은 날짜 순으로 보여줘요.
              </p>
              <RankingTopThree
                title="확실히 되는 시간 TOP 3"
                rankings={topThreeDates}
              />
            </div>

            <TimeGrid
              startHour={startHour}
              endHour={endHour}
              registrationStart={registrationStart}
              registrationEnd={registrationEnd}
            />
          </section>
        </>
      ),
    },
  ]

  const [currentTab, setCurrentTab] = useState(tabs[0].id)

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">
        {eventInfo.title} {currentTab === "view" && "투표 결과"}
      </h2>

      <Tab tabs={tabs} currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  )
}
