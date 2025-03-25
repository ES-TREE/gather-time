import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
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
  const [selectedSlots, setSelectedSlots] = useState(new Set())
  const isInitialLoadTimeSlot = useRef(true)

  const [slotCountMap, setSlotCountMap] = useState(new Map())
  const [maxCount, setMaxCount] = useState(0)
  const [topThreeDates, setTopThreeDates] = useState([])
  const [totalVotes, setTotalVotes] = useState(0)

  const fetchVoteResult = async () => {
    const { data, error } = await supabase
      .from("availabilities")
      .select("*")
      .eq("event_id", eventInfo?.id)

    if (error) return console.error(error)

    const slotSelections = data.map((d) => d.available_timeslots)
    const slotMap = new Map()

    slotSelections.flat().forEach((slot) => {
      slotMap.set(slot, (slotMap.get(slot) || 0) + 1)
    })

    const sortedTop = Array.from(slotMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([date, count], idx) => ({
        id: idx + 1,
        date: new Date(date).toLocaleString("ko-KR", {
          year: "2-digit",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        votes: count,
      }))

    setSlotCountMap(slotMap)
    setMaxCount(Math.max(...slotMap.values(), 0))
    setTopThreeDates(sortedTop)
    setTotalVotes(data.length)
  }

  useEffect(() => {
    fetchVoteResult()
  }, [])

  // 기존에 저장한 시간 조회 & 상태에 저장
  const initTimeSlot = async () => {
    try {
      const { data } = await supabase
        .from("availabilities")
        .select("available_timeslots")
        .eq("event_id", eventInfo?.id)
        .eq("participant_id", participantId)

      setSelectedSlots(new Set(data[0]?.available_timeslots))
    } catch (err) {
      console.error("Supabase Insert Error:", err)
    } finally {
      isInitialLoadTimeSlot.current = false
    }
  }

  useEffect(() => {
    initTimeSlot()
  }, [])

  // 선택한 시간 저장
  const saveTimeSlot = async (newSlots) => {
    try {
      // 중복값 체크
      const { data: existAvailability } = await supabase
        .from("availabilities")
        .select("id")
        .eq("event_id", eventInfo?.id)
        .eq("participant_id", participantId)

      if (existAvailability.length) {
        // 기존 timeslots 업데이트
        const { data, error } = await supabase
          .from("availabilities")
          .update({ available_timeslots: [...newSlots] })
          .eq("id", existAvailability[0].id)
          .select()
          .single()
        console.log("---기존 timeslots 업데이트---")
        console.log(data)
        console.log(error)
      } else {
        // 신규 입력
        const { data, error } = await supabase
          .from("availabilities")
          .insert({
            event_id: eventInfo?.id,
            participant_id: participantId,
            available_timeslots: [...newSlots],
          })
          .select()
          .single()
        console.log("---신규 입력---")
        console.log(data)
        console.log(error)
      }
    } catch (err) {
      console.error("Supabase Insert Error:", err)
    }
  }

  useEffect(() => {
    if (!isInitialLoadTimeSlot.current && selectedSlots.size > 0) {
      saveTimeSlot(selectedSlots)
    }
  }, [selectedSlots])

  // 선택한 시간 초기화
  const resetTimeSlot = async () => {
    try {
      await supabase
        .from("availabilities")
        .delete()
        .eq("event_id", eventInfo?.id)
        .eq("participant_id", participantId)
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
              event_id={eventInfo?.id}
              {...timegridInfo}
              slotCountMap={slotCountMap}
              maxCount={maxCount}
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
