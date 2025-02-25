import Calendar from "react-calendar"
import "./calendar.css"

export default function DateRangeCalendar({ ...props }) {
  return (
    <div className="overflow-y-auto rounded-lg text-sm">
      <Calendar
        calendarType="gregory"
        allowPartialRange={true}
        formatDay={(locale, date) => date.getDate().toString()} // 숫자만 표시
        tileClassName={({ date }) =>
          date.getDay() === 0 ? "text-red-500" : ""
        }
        {...props}
      />
    </div>
  )
}
