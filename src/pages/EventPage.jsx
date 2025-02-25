import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FixedBottomButton from "../components/button/FixedBottomButton"
import DateRangeCalendar from "../components/calendar/DateRangeCalendar"
import HeatmapCalendar from "../components/calendar/HeatmapCalendar"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import Tab from "../components/common/Tab"
import supabase from "../libs/supabase"

/**
 * 구현 로직
 * - 이벤트 조회 실패시 오류 대응
 */

export default function EventPage() {
  const [participantName, setParticipantName] = useState("");
  const [password, setPassword] = useState("");
  // ! mock data
  // 로그인 여부
  const isLoggedIn = false
  // 참여 가능 날짜
  const startDate = new Date(2025, 2, 1)
  const endDate = new Date(2025, 4, 31)
  // 전체 참여자
  const totalVotes = 5
  // 참여자들이 선택한 날짜와 선택한 인원 수
  const selectedDates = [
    {
      date: new Date(2025, 2, 5),
      votes: 2,
    },
    {
      date: new Date(2025, 2, 15),
      votes: 4,
    },
    {
      date: new Date(2025, 3, 2),
      votes: 1,
    },
    {
      date: new Date(2025, 4, 22),
      votes: 5,
    },
  ]

  const tabs = [
    {
      id: "input",
      label: "입력",
      jsx: (
        <>
          <section>
            <div className="space-y-1">
              <h2 className="font-bold">일정 선택</h2>
              <p className="text-sm text-stone-500">
                참여 가능한 일정을 선택해주세요.
              </p>
            </div>

            <DateRangeCalendar />
          </section>

          <FixedBottomButton>초기화</FixedBottomButton>
        </>
      ),
    },
    {
      id: "view",
      label: "조회",
      jsx: (
        <>
          <HeatmapCalendar
            startDate={startDate}
            endDate={endDate}
            totalVotes={totalVotes}
            selectedDates={selectedDates}
          />
        </>
      ),
    },
  ]

  const { uid } = useParams()
  const [currentTab, setCurrentTab] = useState(tabs[0].id)
  const [eventName, setEventName] = useState("")

  const fetchEventName = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("uuid", uid)
      .single()

    setEventName(data?.title)
  }

  // 링크 복사하기
  const copyUrlLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("링크 복사 실패: ", err);
    }
  };

  useEffect(() => {
    fetchEventName()
  }, [uid])

  return isLoggedIn ? (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">{eventName}</h2>

      <Tab tabs={tabs} currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  ) : (
    <>
      <div className="flex h-[calc(100vh-96px)] flex-col justify-center gap-8">
        <section className="text-center">
          <h2 className="text-lg font-bold">{eventName}</h2>
          <p className="text-sm text-stone-500">
            로그인 안내와 이름, 비밀번호 찾기 불가능한점 안내
          </p>
        </section>

        <form 
          onSubmit={(e) => 
            e.preventDefault()
          }
          className="space-y-5">
          <Input label="이름" 
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            type="text" 
            placeholder="이름을 입력해주세요." />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="비밀번호 "
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <Button fill={false}>로그인</Button>
        </form>
      </div>

      <FixedBottomButton
        onClick={() => copyUrlLink()}
      >
        링크 복사하기
      </FixedBottomButton>
    </>
  )
}
