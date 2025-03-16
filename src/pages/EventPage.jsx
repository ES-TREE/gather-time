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
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  })
  const [participantInfo, setParticipantInfo] = useState({
    id: null,
    participantName: null,
  })
  const [availabilitiesInfo, setAvailabilitiesInfo] = useState({
    eventId: null,
    participantId: null,
  })
  const [loading, setLoading] = useState(true)

  // 이벤트 정보 가져오기
  const fetchEventInfo = async () => {
    try {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("uuid", uuid)
        .single()

      if (!data) {
        return
      }

      setEventInfo({
        id: data?.id,
        title: data?.title,
        startDate: data?.start_date,
        endDate: data?.end_date,
        startTime: data?.start_time,
        endTime: data?.end_time,
      })
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventInfo()
  }, [uuid])

  return participantInfo.id ? (
    <CalendarView eventInfo={eventInfo} participantId={participantInfo.id} />
  ) : (
    <LoginView
      loading={loading}
      eventInfo={eventInfo}
      setParticipantInfo={setParticipantInfo}
    />
  )
}
