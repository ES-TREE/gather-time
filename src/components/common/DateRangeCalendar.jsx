import { useCallback, useEffect, useRef, useState } from "react"
import Calendar from "react-calendar"
import "../../styles/calendar.css"

export default function DateRangeCalendar() {
  const [months, setMonths] = useState([new Date()]) // 초기값: 현재 달
  const lastCalendarRef = useRef(null)

  // 새로운 달 추가 함수
  const addMoreMonths = useCallback(() => {
    setMonths((prev) => {
      const lastDate = new Date(prev[prev.length - 1]) // 마지막 달 가져오기
      lastDate.setMonth(lastDate.getMonth() + 1) // 다음 달 계산
      return [...prev, new Date(lastDate)]
    })
  }, [])

  // IntersectionObserver 설정 (무한 스크롤 감지)
  useEffect(() => {
    if (!lastCalendarRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          addMoreMonths() // 마지막 요소가 보이면 새 달 추가
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
            formatDay={(locale, date) => date.getDate().toString()} // 숫자만 표시
            tileClassName={({ date }) =>
              `p-5 ${date.getDay() === 0 ? "text-red-500" : ""}`
            }
          />
        </div>
      ))}
    </div>
  )
}
