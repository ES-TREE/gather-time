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

export default function ViewTimeGrid({
  startHour,
  endHour,
  // TODO 이벤트 범위 외 주 이동 불가하게 수정
  registrationStart,
  registrationEnd,
  selectedSlots = new Set(),
}) {
  const [currentWeek, setCurrentWeek] = useState(0)
  const today = new Date()

  const startOfWeek = getMonday(
    new Date(today.setDate(today.getDate() + currentWeek * 7)),
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
          onClick={() => setCurrentWeek((prev) => prev - 1)}
          className="rounded-full p-2 active:bg-stone-100"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-bold">
          {today.getFullYear()}년{" "}
          {String(today.getMonth() + 1).padStart(2, "0")}월
        </h2>
        <button
          onClick={() => setCurrentWeek((prev) => prev + 1)}
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
              <br></br>
              {date}
            </li>
          ))}
        </ul>
        <div className="grid select-none grid-cols-8 overflow-auto">
          {/* Time Grid */}
          {Array.from(
            {
              length: (endHour - startHour) * (60 / SLOT_INTERVAL),
            },
            (_, i) => {
              const hour = startHour + Math.floor(i / (60 / SLOT_INTERVAL))
              const minute = (i % (60 / SLOT_INTERVAL)) * SLOT_INTERVAL
              const timeLabel = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
              return (
                <React.Fragment key={`row-${i}`}>
                  {/* Time Labels (Non-Interactive) */}
                  <div className="pointer-events-none border-b border-l border-r p-1 pr-2 text-right text-xs">
                    {timeLabel}
                  </div>
                  {/* Time Slots (Interactive) */}
                  {formattedDays.map(({ fullDate }) => {
                    const slotDateTime = new Date(
                      fullDate.getFullYear(),
                      fullDate.getMonth(),
                      fullDate.getDate(),
                      hour,
                      minute,
                    )
                    const slotKey = slotDateTime.toISOString()
                    return (
                      <div
                        key={slotKey}
                        className={`cursor-pointer border-b border-r p-2 ${selectedSlots.has(slotKey) ? "bg-primary-300" : "cursor-not-allowed bg-stone-100"}`}
                        data-slot-key={slotKey}
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
