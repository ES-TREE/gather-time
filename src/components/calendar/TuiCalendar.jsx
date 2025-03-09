import Calendar from "@toast-ui/calendar"
import "@toast-ui/calendar/dist/toastui-calendar.min.css"
import { useEffect, useRef, useState } from "react"

export default function TuiCalendar() {
  const calendarRef = useRef(null)
  const instanceRef = useRef(null)
  const [view, setView] = useState("week") // 현재 뷰 상태 관리

  useEffect(() => {
    if (calendarRef.current) {
      instanceRef.current = new Calendar(calendarRef.current, {
        defaultView: view, // 주간 보기
        usageStatistics: false,
        isReadOnly: false, // 읽기 전용 여부
        week: {
          startDayOfWeek: 1, // 월요일 시작
          hourStart: 8, // 시작 시간 (08:00)
          hourEnd: 20, // 종료 시간 (20:00)
        },
        milestone: false, // 마일스톤 기능 활성화
        taskView: false, // 태스크 뷰 활성화
      })
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy()
      }
    }
  }, [view]) // 뷰 변경 시 업데이트

  // 📌 오늘 / 이전 주 / 다음 주 이동 함수
  const moveToday = () => instanceRef.current?.today()
  const moveNextWeek = () => instanceRef.current?.next()
  const movePrevWeek = () => instanceRef.current?.prev()

  return (
    <div>
      {/* 상단 버튼 UI */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setView("day")}>일간 보기</button>
        <button onClick={() => setView("week")}>주간 보기</button>
        <button onClick={movePrevWeek}>저번 주</button>
        <button onClick={moveToday}>오늘</button>
        <button onClick={moveNextWeek}>다음 주</button>
      </div>

      {/* 캘린더 */}
      <div ref={calendarRef} style={{ height: "800px" }} />
    </div>
  )
}
