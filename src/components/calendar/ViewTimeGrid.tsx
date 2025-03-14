import { ChevronLeft, ChevronRight } from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { getMonday } from "../../utils/date"

ViewTimeGrid.propTypes = {
  startHour: PropTypes.number,
  endHour: PropTypes.number,
  registrationStart: PropTypes.string,
  registrationEnd: PropTypes.string,
  selectedSlots: PropTypes.instanceOf(Set),
}

const DAYS = ["월", "화", "수", "목", "금", "토", "일"]
const SLOT_INTERVAL = 30
const TODAY = new Date()

// 1인 기준 목업 데이터 (임시 일정 정보)
const MOCK_SELECTED_SLOTS = new Set([
  "03/12-수-09:00",
  "03/12-수-09:30",
  "03/12-수-14:00",
  "03/12-수-14:30",
  "03/14-금-18:00",
])

export default function ViewTimeGrid({
  startHour,
  endHour,
  // TODO 이벤트 범위 외 주 이동 불가하게 수정
  registrationStart,
  registrationEnd,
  selectedSlots = MOCK_SELECTED_SLOTS,
}) {
  const [currentWeek, setCurrentWeek] = useState(0)

  const startOfWeek = getMonday(
    new Date(TODAY.setDate(TODAY.getDate() + currentWeek * 7)),
  )
  const formattedDays = DAYS.map((_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(d.getDate() + i)
    return {
      day: DAYS[i],
      date: d.getDate().toString(),
      fullDate: d,
      formattedDate: `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`,
    }
  })

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentWeek((prev) => prev + 1),
    onSwipedRight: () => setCurrentWeek((prev) => prev - 1),
  })

  return (
    <div className="space-y-2">
      {/* Weekly Navigator */}
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => setCurrentWeek(currentWeek - 1)}
          className="rounded-full p-2 active:bg-stone-100"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-bold">
          {TODAY.getFullYear()}년{" "}
          {String(TODAY.getMonth() + 1).padStart(2, "0")}월
        </h2>
        <button
          onClick={() => setCurrentWeek(currentWeek + 1)}
          className="rounded-full p-2 active:bg-stone-100"
        >
          <ChevronRight />
        </button>
      </div>
      {/* Weekly Calendar Grid */}
      <div>
        <ul
          {...handlers}
          className="grid select-none grid-cols-8 gap-1 overflow-auto border py-1 text-sm"
        >
          <li></li>
          {formattedDays.map(({ day, date }) => (
            <li key={day} className="text-center font-bold">
              {day}
              <br />
              {date}
            </li>
          ))}
        </ul>
        <div className="grid select-none grid-cols-8 overflow-auto">
          {/* Time Grid */}
          {Array.from(
            { length: (endHour - startHour) * (60 / SLOT_INTERVAL) },
            (_, i) => {
              const hour = startHour + Math.floor(i / (60 / SLOT_INTERVAL))
              const minute = (i % (60 / SLOT_INTERVAL)) * SLOT_INTERVAL
              const timeLabel = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
              return (
                <React.Fragment key={`row-${i}`}>
                  <div className="pointer-events-none border-b border-l border-r p-1 pr-2 text-right text-xs">
                    {timeLabel}
                  </div>
                  {formattedDays.map(({ day, formattedDate }) => {
                    const slotKey = `${formattedDate}-${day}-${timeLabel}`
                    return (
                      <div
                        key={slotKey}
                        className={`border-b border-r p-2 ${selectedSlots.has(slotKey) ? "bg-primary-300" : "bg-stone-100"}`}
                      />
                    )
                  })}
                </React.Fragment>
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}
