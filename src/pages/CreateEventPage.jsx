import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FixedBottomButton from "../components/button/FixedBottomButton"
import DateRangeCalendar from "../components/calendar/DateRangeCalendar"
import Input from "../components/common/Input"
import supabase from "../libs/supabase"

export default function CreateEventPage() {
  const navigate = useNavigate()

  // 이벤트 이름
  const [eventName, setEventName] = useState("")
  // 이벤트 시작 시간
  const [startTime, setStartTime] = useState("08:00")
  // 이벤트 종료 시간
  const [endTime, setEndTime] = useState("23:59")
  // 캘린더 시작 날짜, 종료 날짜
  const [dateRange, setDateRange] = useState([])

  const handleCreateEvent = async (e) => {
    e.preventDefault()

    if (!eventName) {
      toast("이벤트 이름을 입력해주세요.", {
        icon: "⚠️",
      })
      return
    }
    if (!dateRange.length) {
      toast("이벤트 기간을 지정해주세요.", {
        icon: "⚠️",
      })
      return
    }
    if (!startTime || !endTime) {
      toast("이벤트 시작 시간과 종료 시간을 입력해주세요.", {
        icon: "⚠️",
      })
      return
    }
    if (startTime >= endTime) {
      toast("이벤트 종료 시간은 시작 시간보다 늦어야 합니다.", {
        icon: "⚠️",
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from("events")
        .insert({
          title: eventName,
          start_date: dateRange[0],
          end_date: dateRange[1],
          start_time: startTime,
          end_time: endTime,
        })
        .select()
        .single()

      if (error) throw error

      toast.success("이벤트를 생성했어요!")
      navigate(`/${data.uuid}`)
    } catch (err) {
      toast.error("이벤트 생성에 실패했어요. 다시 시도해주세요.")
      console.error("Supabase Insert Error:", err)
    }
  }

  return (
    <>
      <form className="flex flex-col space-y-5" onSubmit={handleCreateEvent}>
        <Input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          label="이벤트 이름"
          placeholder="이벤트 이름을 입력해주세요."
        />

        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          label="이벤트 시작 시간"
          placeholder="이벤트 시작 시간을 입력해주세요."
        />

        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          label="이벤트 종료 시간"
          placeholder="이벤트 종료 시간을 입력해주세요."
        />

        <section>
          <div className="space-y-1">
            <h2 className="font-bold">일정 선택</h2>
            <p className="text-sm text-stone-500">
              이벤트를 생성할 일정을 선택해주세요.
            </p>
          </div>

          <DateRangeCalendar
            value={dateRange}
            onChange={setDateRange}
            selectRange={true}
          />
        </section>

        <FixedBottomButton>이벤트 생성하기</FixedBottomButton>
      </form>
    </>
  )
}
