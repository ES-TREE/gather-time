export const getMonday = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

// 한국 시간(UTC+9)으로 변환 후 yy.mm.dd 형식으로 포맷
export const formatToYYMMDD = (date) => {
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  const yy = String(koreaTime.getFullYear()).slice(2) // 연도 두 자리
  const mm = String(koreaTime.getMonth() + 1).padStart(2, "0") // 월
  const dd = String(koreaTime.getDate()).padStart(2, "0") // 일

  return `${yy}.${mm}.${dd}`
}
