import PropTypes from "prop-types"
import { useCallback, useEffect, useRef, useState } from "react"
import HeatmapCalendarItem from "./HeatmapCalendarItem"

export default function HeatmapCalendar({
  startDate,
  endDate,
  totalVotes,
  selectedDates,
}) {
  const [months, setMonths] = useState([new Date(startDate)])
  const lastCalendarRef = useRef(null)

  const addMoreMonths = useCallback(() => {
    setMonths((prev) => {
      const lastDate = new Date(prev[prev.length - 1])
      lastDate.setMonth(lastDate.getMonth() + 1)
      if (lastDate > endDate) return prev // 종료 날짜 이후는 추가 안 함
      return [...prev, new Date(lastDate)]
    })
  }, [endDate])

  useEffect(() => {
    if (!lastCalendarRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          addMoreMonths()
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(lastCalendarRef.current)

    return () => {
      if (lastCalendarRef.current) observer.unobserve(lastCalendarRef.current)
    }
  }, [months, addMoreMonths])

  return (
    <div className="overflow-y-auto rounded-lg text-sm">
      {months.map((date, index) => (
        <div
          key={index}
          ref={index === months.length - 1 ? lastCalendarRef : null}
        >
          <HeatmapCalendarItem
            date={date}
            startDate={startDate}
            endDate={endDate}
            selectedDates={selectedDates}
            totalVotes={totalVotes}
          />
        </div>
      ))}
    </div>
  )
}

HeatmapCalendar.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  totalVotes: PropTypes.number,
  selectedDates: PropTypes.array,
}
