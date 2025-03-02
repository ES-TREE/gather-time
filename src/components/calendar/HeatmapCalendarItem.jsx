import PropTypes from "prop-types"
import { useState } from "react"
import Calendar from "react-calendar"
import Button from "../common/Button"
import Modal from "../common/Modal"
import "./calendar.css"

HeatmapCalendarItem.propTypes = {
  date: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  totalVotes: PropTypes.number,
  selectedDates: PropTypes.array,
}

export default function HeatmapCalendarItem({
  date,
  startDate,
  endDate,
  selectedDates,
  totalVotes,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <h2 className="py-5 text-center text-base font-bold text-gray-700">
        {date.getFullYear()}년 {date.getMonth()}월
      </h2>
      <Calendar
        value={date}
        calendarType="gregory"
        allowPartialRange={true}
        minDate={startDate}
        maxDate={endDate}
        formatDay={(locale, date) => date.getDate().toString()}
        tileClassName={({ date }) =>
          getCellClassName({ date, selectedDates, totalVotes })
        }
        tileContent={({ date }) =>
          getCellDetail({ date, selectedDates, totalVotes })
        }
        onClickDay={(date) => {
          setIsModalOpen(true)
        }}
      />

      <Modal open={isModalOpen} className="space-y-1">
        <h2 className="text-base font-bold">2025년 2월 15일</h2>
        <p className="text-stone-500">참석예정자:</p>
        <p className="pb-3">{["서은파", "서나무"].join(", ")}</p>
        <Button onClick={() => setIsModalOpen(false)} fill={false}>
          닫기
        </Button>
      </Modal>
    </>
  )
}

function getCellClassName({ date, selectedDates, totalVotes }) {
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
    if (ratio >= 0.8) return `${baseClass} bg-primary-400 text-white`
    if (ratio >= 0.6) return `${baseClass} bg-primary-300`
    if (ratio >= 0.4) return `${baseClass} bg-primary-200`
    if (ratio >= 0.2) return `${baseClass} bg-primary-100`
    return `${baseClass}`
  }

  return baseClass
}

function getCellDetail({ date, selectedDates, totalVotes }) {
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
        <p>{`${selected.votes}/${totalVotes}`}</p> {/* 참여자/총인원 표시 */}
        <p>{`${Math.round(ratio)}%`}</p> {/* 퍼센티지 표시 */}
      </div>
    )
  }
  return null // 선택된 날짜가 아니면 null 반환
}
