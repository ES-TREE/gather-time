import PropTypes from "prop-types"
import { useState } from "react"
import supabase from "../../libs/supabase"
import { formatToYYMMDD } from "../../utils/date"
import FixedBottomButton from "../button/FixedBottomButton"
import EditTimeGrid from "../calendar/EditTimeGrid"
import ViewTimeGrid from "../calendar/ViewTimeGrid"
import Tab from "../common/Tab"
import RankingTopThree from "../list/RankingTopThree"

CalendarView.propTypes = {
  eventInfo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    startDate: PropTypes.Date,
    endDate: PropTypes.Date,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  participantId: PropTypes.number,
}

export default function CalendarView({ eventInfo, participantId }) {
  const [availabilityInfo, setAvailabilityInfo] = useState({
    eventId: eventInfo.id,
    participantId: participantId,
    availableTimeslots: "",
  })
  const [selectedSlots, setSelectedSlots] = useState(new Set())

  const resetTimeSlot = async () => {
    try {
      await supabase
        .from("availabilities")
        .delete()
        .eq("event_id", availabilityInfo?.eventId)
        .eq("participant_id", availabilityInfo?.participantId)
      setSelectedSlots(new Set())
    } catch (err) {
      console.error("Supabase Insert Error:", err)
    }
  }

  // 이벤트 정보
  // ? 사용자와 상호작용 하는 데이터가 아니어서 상태가 아닌 객체로 변경
  const timegridInfo = {
    // TimeGrid 시작 시간 종료 시간
    startHour: eventInfo.startTime.split(":")[0] - 0,
    endHour: eventInfo.endTime.split(":")[0] - 0,
    // 선택 가능한 이벤트 시작 일자 종료 일자
    registrationStart: new Date(eventInfo.startDate),
    registrationEnd: new Date(eventInfo.endDate),
  }

  // ! mock data
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
          <section className="space-y-2 pb-20">
            <div className="space-y-1">
              <h2 className="font-bold">일정 선택</h2>
              <p className="text-sm text-stone-500">
                참여 가능한 일정을 선택해주세요.
              </p>
            </div>

            <EditTimeGrid
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              timegridInfo={timegridInfo}
              availabilityInfo={availabilityInfo}
            />
          </section>

          <FixedBottomButton onClick={resetTimeSlot}>초기화</FixedBottomButton>
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
                {formatToYYMMDD(timegridInfo?.registrationStart)} ~{" "}
                {formatToYYMMDD(timegridInfo?.registrationEnd)}
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

            <ViewTimeGrid
              startHour={timegridInfo?.startHour}
              endHour={timegridInfo?.endHour}
              registrationStart={timegridInfo?.registrationStart}
              registrationEnd={timegridInfo?.registrationEnd}
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
