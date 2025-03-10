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

    const result = await supabase
      .from("events")
      .insert({
        title: eventName,
        start_date: dateRange[0],
        end_date: dateRange[1],
      })
      .select()
      .single()
    const eventUuid = result.data.uuid
    toast("이벤트를 생성했어요.", {
      icon: "✅",
    })
    navigate(`/${eventUuid}`)
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
