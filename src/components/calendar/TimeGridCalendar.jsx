import { ChevronLeft, ChevronRight } from "lucide-react"
import PropTypes from "prop-types"
import React, { useCallback, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { getMonday } from "../../utils/date"

TimeGrid.propTypes = {
  start_hour: PropTypes.number,
  end_hours: PropTypes.number,
  registration_start: PropTypes.string,
  registration_end: PropTypes.string,
}

const DAYS = ["월", "화", "수", "목", "금", "토", "일"]
const SLOT_INTERVAL = 30 // 일정 30분 단위로 등록
const NOW = Date.now() // 현재 시간
const TODAY = new Date()

export default function TimeGrid({
  start_hour = 8,
  end_hours = 20,
  registration_start = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth(),
    TODAY.getDate(),
  ),
  registration_end = null,
}) {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedSlots, setSelectedSlots] = useState(new Set())
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchedSlot, setLastTouchedSlot] = useState(null) // 마지막으로 터치한 슬롯 저장

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

  const handleSlotToggle = useCallback((slot, date, hour, minute) => {
    const slotDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      minute,
    )
    if (
      slotDateTime >= registration_start &&
      slotDateTime <= registration_end &&
      slotDateTime >= NOW
    ) {
      setSelectedSlots((prev) => {
        const newSlots = new Set(prev)
        if (newSlots.has(slot)) {
          newSlots.delete(slot)
        } else {
          newSlots.add(slot)
        }
        return newSlots
      })
    }
  }, [])

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
          {today.getFullYear()}년{" "}
          {String(today.getMonth() + 1).padStart(2, "0")}월
        </h2>
        <button
          onClick={() => setCurrentWeek(currentWeek + 1)}
          className="rounded-full p-2 active:bg-stone-100"
        >
          <ChevronRight />
        </button>

        {/* <button onClick={handleTodayClick} className="rounded bg-gray-200 p-2">
          오늘
        </button> */}
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
            { length: (end_hours - start_hour) * (60 / SLOT_INTERVAL) },
            (_, i) => {
              const hour = start_hour + Math.floor(i / (60 / SLOT_INTERVAL))
              const minute = (i % (60 / SLOT_INTERVAL)) * SLOT_INTERVAL
              const timeLabel = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
              return (
                <React.Fragment key={`row-${i}`}>
                  {/* Time Labels (Non-Interactive) */}
                  <div className="pointer-events-none border-b border-l border-r p-1 pr-2 text-right text-xs">
                    {timeLabel}
                  </div>
                  {/* Time Slots (Interactive) */}
                  {formattedDays.map(({ day, formattedDate, fullDate }) => {
                    const slotKey = `${formattedDate}-${day}-${timeLabel}`
                    const slotDateTime = new Date(
                      fullDate.getFullYear(),
                      fullDate.getMonth(),
                      fullDate.getDate(),
                      hour,
                      minute,
                    )
                    const isDisabled =
                      slotDateTime < registration_start ||
                      slotDateTime > registration_end ||
                      slotDateTime < NOW
                    return (
                      <div
                        key={slotKey}
                        className={`cursor-pointer border-b border-r p-2 ${selectedSlots.has(slotKey) ? "bg-primary-300" : isDisabled ? "cursor-not-allowed bg-stone-100" : "bg-white"}`}
                        onMouseDown={(e) =>
                          !isDisabled &&
                          e.button === 0 &&
                          handleSlotToggle(slotKey, fullDate, hour, minute)
                        }
                        onMouseEnter={(e) =>
                          e.buttons === 1 &&
                          !isDisabled &&
                          handleSlotToggle(slotKey, fullDate, hour, minute)
                        }
                        onTouchStart={() => {
                          if (!isDisabled) {
                            const touchStartTime = Date.now() // 터치 시작 시간 저장

                            // 짧은 터치(클릭)인지 확인하는 타이머 설정
                            const touchTimeout = setTimeout(() => {
                              setIsDragging(true) // 일정 시간 지나면 드래그 모드 활성화
                            }, 10) // 10ms 이상이면 드래그 모드로 전환

                            // 터치가 끝나면 단일 선택 처리
                            const handleTouchEnd = () => {
                              clearTimeout(touchTimeout) // 타이머 정리

                              if (Date.now() - touchStartTime < 10) {
                                // 10ms 이하의 터치는 단일 선택/해제
                                setSelectedSlots((prev) => {
                                  const newSlots = new Set(prev)
                                  if (newSlots.has(slotKey)) {
                                    newSlots.delete(slotKey) // 이미 선택된 슬롯이면 해제
                                  } else {
                                    newSlots.add(slotKey) // 선택되지 않았다면 추가
                                  }
                                  return newSlots
                                })
                              }

                              setIsDragging(false) // 드래그 모드 해제
                              document.removeEventListener(
                                "touchend",
                                handleTouchEnd,
                              )
                            }

                            document.addEventListener(
                              "touchend",
                              handleTouchEnd,
                            ) // 터치 종료 이벤트 추가
                          }
                        }}
                        onTouchMove={(e) => {
                          if (isDragging && !isDisabled) {
                            const touch = e.touches[0]
                            const target = document.elementFromPoint(
                              touch.clientX,
                              touch.clientY,
                            )

                            if (
                              target &&
                              target.dataset.slotKey &&
                              target.dataset.slotKey !== lastTouchedSlot // 이전 슬롯과 다를 때만 실행
                            ) {
                              handleSlotToggle(
                                target.dataset.slotKey,
                                fullDate,
                                hour,
                                minute,
                              )
                              setLastTouchedSlot(target.dataset.slotKey) // 새로운 슬롯 저장
                            }
                          }
                        }}
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
