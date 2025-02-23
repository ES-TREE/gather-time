import PropTypes from "prop-types"
import { useCallback, useEffect, useRef, useState } from "react"
import Calendar from "react-calendar"
import "./calendar.css"

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
          <h2 className="py-5 text-center text-base font-bold text-gray-700">
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </h2>
          <Calendar
            key={index}
            value={date}
            calendarType="gregory"
            allowPartialRange={true}
            minDate={startDate}
            maxDate={endDate}
            formatDay={(locale, date) => date.getDate().toString()}
            tileClassName={({ date }) => {
              // 해당 날짜가 selectedDates에 있는지 찾기
              const selected = selectedDates.find(
                (d) =>
                  d.date.getFullYear() === date.getFullYear() &&
                  d.date.getMonth() === date.getMonth() &&
                  d.date.getDate() === date.getDate(),
              )

              // 기본 스타일 (일요일 빨간색)
              let baseClass = "py-5"
              if (date.getDay() === 0) baseClass += " text-red-500"

              // 선택된 날짜라면 투표 비율에 따라 배경색 추가
              if (selected) {
                const ratio = selected.votes / totalVotes // 투표 비율 계산
                if (ratio == 1) return `${baseClass} bg-primary-500 text-white`
                if (ratio >= 0.8)
                  return `${baseClass} bg-primary-400 text-white`
                if (ratio >= 0.6) return `${baseClass} bg-primary-300`
                if (ratio >= 0.4) return `${baseClass} bg-primary-200`
                if (ratio >= 0.2) return `${baseClass} bg-primary-100`
                return `${baseClass} bg-primary-50`
              }

              return baseClass
            }}
            tileContent={({ date }) => {
              // 해당 날짜가 selectedDates에 있는지 찾기
              const selected = selectedDates.find(
                (d) =>
                  d.date.getFullYear() === date.getFullYear() &&
                  d.date.getMonth() === date.getMonth() &&
                  d.date.getDate() === date.getDate(),
              )

              if (selected) {
                const ratio = (selected.votes / totalVotes) * 100 // 퍼센티지 계산
                return (
                  <div className="text-center text-xs">
                    <p>{`${selected.votes}/${totalVotes}`}</p>{" "}
                    {/* 참여자/총인원 표시 */}
                    <p>{`${Math.round(ratio)}%`}</p> {/* 퍼센티지 표시 */}
                  </div>
                )
              }

              return null // 선택된 날짜가 아니면 null 반환
            }}
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
