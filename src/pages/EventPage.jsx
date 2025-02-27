import { useEffect, useState } from "react"
import toast from "react-hot-toast"
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
  // ! mock data
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

  // 이벤트 uuid
  const { uuid } = useParams()

  const [currentTab, setCurrentTab] = useState(tabs[0].id)

  const [participantName, setParticipantName] = useState("")
  const [password, setPassword] = useState("")
  const [eventInfo, setEventInfo] = useState({
    id: null,
    title: null,
  })
  const [participantInfo, setParticipantInfo] = useState({
    id: null,
    participantName: null,
  })

  const fetchEventInfo = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("uuid", uuid)
      .single()

    setEventInfo({
      id: data.id,
      title: data.title,
    })
  }

  // 링크 복사하기
  const copyUrlLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      toast("링크를 복사했어요.", {
        icon: "✅",
      })
    } catch (err) {
      console.error("링크 복사 실패: ", err)
    }
  }

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault()

    if (!eventInfo.id) {
      toast("오류가 발생했어요. 새로고침을 해주세요.", {
        icon: "⚠️",
      })
      return
    }

    if (!participantName) {
      toast("이름을 입력해주세요.", {
        icon: "⚠️",
      })
      return
    }
    if (!password) {
      toast("비밀번호를 입력해주세요.", {
        icon: "⚠️",
      })
      return
    }

    // 중복값 체크
    const { data: existUser } = await supabase
      .from("participants")
      .select("id, participant_name, password")
      .eq("participant_name", participantName)
      .eq("event_id", eventInfo.id)
      .single()

    if (existUser) {
      // * 로그인
      // 비밀번호 확인
      if (existUser.password != password) {
        // 실패
        toast("비밀번호를 다시 입력하세요.", {
          icon: "❌",
        })
        return
      }

      // 기존 유저 아이디 저장
      setParticipantInfo({
        id: existUser.id,
        participantName: existUser.participant_name,
      })
    } else {
      // * 회원가입
      const { data: newUser } = await supabase
        .from("participants")
        .insert({
          event_id: eventInfo.id,
          participant_name: participantName,
          password: password,
        })
        .select("id, participant_name")
        .single()

      // 신규 유저 아이디 저장
      setParticipantInfo({
        id: newUser.id,
        participantName: newUser.participant_name,
      })
    }

    // 폼 데이터 초기화
    setParticipantName("")
    setPassword("")
  }

  useEffect(() => {
    fetchEventInfo()
  }, [uuid])

  return participantInfo.id ? (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">{eventInfo.title}</h2>

      <Tab tabs={tabs} currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  ) : (
    <>
      <div className="flex h-[calc(100vh-96px)] flex-col justify-center gap-8">
        <section className="text-center">
          <h2 className="text-lg font-bold">{eventInfo.title}</h2>
          <p className="text-sm text-stone-500">
            로그인 안내와 이름, 비밀번호 찾기 불가능한점 안내
          </p>
        </section>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="이름"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            type="text"
            placeholder="이름을 입력해주세요."
          />
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

      <FixedBottomButton onClick={() => copyUrlLink()}>
        링크 복사하기
      </FixedBottomButton>
    </>
  )
}
