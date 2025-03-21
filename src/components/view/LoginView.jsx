import PropTypes from "prop-types"
import { useState } from "react"
import toast from "react-hot-toast"
import supabase from "../../libs/supabase"
import FixedBottomButton from "../button/FixedBottomButton"
import Button from "../common/Button"
import Input from "../common/Input"
import Loader from "../common/Loader"
import NotFoundView from "./NotFoundView"

LoginView.propTypes = {
  loading: PropTypes.bool,
  eventInfo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string,
  }),
  setParticipantInfo: PropTypes.func.isRequired,
}

export default function LoginView({ loading, eventInfo, setParticipantInfo }) {
  const [participantName, setParticipantName] = useState("")
  const [password, setPassword] = useState("")
  const eventEndDate = new Date(`${eventInfo.endDate}T${eventInfo.endTime}`)

  if (loading) {
    return <Loader />
  }

  if (!eventInfo || !eventInfo?.id) {
    return <NotFoundView />
  }

  // 링크 복사하기
  const copyUrlLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      toast.success("링크를 복사했어요.")
    } catch (err) {
      console.error("링크 복사 실패: ", err)
    }
  }

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault()

    if (!eventInfo.id) {
      toast.error("오류가 발생했어요. 새로고침을 해주세요.")
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
        toast.error("비밀번호를 다시 입력하세요.")
        return
      }

      // 기존 유저 아이디 저장
      setParticipantInfo({
        id: existUser.id,
        participantName: existUser.participant_name,
      })
    } else {
      // 신규 유저는 종료 이벤트 로그인 불가
      if (eventEndDate < Date.now()) {
        // 실패
        toast.error("종료된 이벤트이므로 신규 유저는 로그인할 수 없습니다.")
        return
      }

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
  }

  return (
    <>
      <div className="flex h-[calc(100vh-96px)] flex-col justify-center gap-8">
        <section className="text-center">
          <h2 className="text-lg font-bold">{eventInfo.title}</h2>
          <p className="text-sm text-stone-500">
            1. 로그인 이름, 비밀번호 찾기 불가능한점 안내
          </p>
          <p className="text-sm text-stone-500">
            2. 종료된 이벤트는 기존 참가 등록자만 조회 가능하다는 안내
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
