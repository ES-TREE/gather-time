import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CalendarView from "../components/view/CalendarView"
import LoginView from "../components/view/LoginView"
import supabase from "../libs/supabase"

/**
 * 구현 로직
 * - 이벤트 조회 실패시 오류 대응
 */
export default function EventPage() {
  // 이벤트 uuid
  const { uuid } = useParams()

  const [eventInfo, setEventInfo] = useState({
    id: null,
    title: null,
  })
  const [participantInfo, setParticipantInfo] = useState({
    id: null,
    participantName: null,
  })

  // 이벤트 정보 가져오기
  const fetchEventInfo = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("uuid", uuid)
      .single()

    setEventInfo({
      id: data.id,
      title: data.title,
      endDate: data.end_date,
      endTime: data.end_time
    })
  }

  useEffect(() => {
    fetchEventInfo()
  }, [uuid])

  return participantInfo.id ? (
    <CalendarView eventInfo={eventInfo} />
  ) : (
    <LoginView eventInfo={eventInfo} setParticipantInfo={setParticipantInfo} />
  )
}
