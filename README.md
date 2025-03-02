# GatherTime (게더타임) 🕒

**GatherTime**은 **모임 일정 조율**을 쉽게 할 수 있도록 도와주는 **모바일 웹 서비스**입니다.  
<b>[When2Meet](https://www.when2meet.com/)의 모바일 사용성을 개선</b>하기 위해 시작되었으며, 사용자가 간단한 링크 공유만으로 참석 가능 일자를 조율할 수 있습니다.

## 🛠 기술 스택

- **Frontend**: JavaScript, React, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## 📌 주요 기능

### 1. 이벤트 생성 ✨
- 사용자가 이벤트를 생성할 수 있습니다.
- 이벤트 제목, 일자 범위, 시간 범위를 설정할 수 있습니다.
- 행사마다 고유한 **UUID**가 부여되어 이벤트를 쉽게 공유할 수 있습니다.

### 2. 참석자 등록 👥
- 행사에 참여할 참석자가 **이름과 비밀번호**를 입력하여 참석을 등록할 수 있습니다.

### 3. 참석 가능 날짜 선택 📆
- 참석자는 일정 범위 내에서 참석 가능한 시간을 입력할 수 있습니다.
- 입력한 시간은 데이터베이스에 저장되며, 참석자 모두가 확인할 수 있습니다.

### 4. 모임 일정 조율 📊
- 일자별 참석자가 가장 많은 시간 및 참석자 정보를 확인할 수 있는 UI 제공

## ✅ 기능 목록
### 1. 이벤트 생성 페이지
- 이벤트 제목 입력
- 달력 내 이벤트 드래그 또는 클릭하여 시작 일자 및 종료 일자 선택
- 이벤트 자동 종료 조건 추가: 이벤트 종료 시 수정 불가
- 생성 버튼을 눌러 이벤트 생성 완료

### 2. 로그인 페이지 (이벤트 접속 후)
- 사용자 등록: 이름 중복 체크 기능 제공
- 이벤트 공유하기/링크 복사 버튼 제공

### 4. 참석 일정 입력 페이지
- 참석 가능한 일자별 시간 범위를 드래그하여 등록하는 기능
- 이벤트 공유하기/링크 복사 버튼 제공

### 5. 참석 일정 조회 페이지
- 참가자 조회 시 모달 -> 달력에 MAX(시작 시간, 최대 참가자 수/총 참가자 수), 참가자 정보 표시
- 이벤트 공유하기/링크 복사 버튼 제공

## 🗂 데이터베이스 모델링

### **1. events (행사)**
| column_name      | data_type                   | is_nullable | column_default                             |
| ---------------- | --------------------------- | ----------- | ------------------------------------------ |
| id               | bigint                      | NO          | nextval('events_id_seq'::regclass)         |
| uuid             | uuid                        | NO          | gen_random_uuid()                          |
| title            | character varying           | NO          | null                                       |
| start_date       | date                        | NO          | null                                       |
| end_date         | date                        | NO          | null                                       |
| start_time       | time without time zone      | NO          | '00:00:00'::time without time zone         |
| end_time         | time without time zone      | NO          | '23:59:00'::time without time zone         |
| created_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |
| updated_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |


### **2. participants (참석자)**
| column_name      | data_type                   | is_nullable | column_default                             |
| ---------------- | --------------------------- | ----------- | ------------------------------------------ |
| id               | bigint                      | NO          | nextval('participants_id_seq'::regclass)   |
| event_id         | bigint                      | NO          | null                                       |
| participant_name | character varying           | NO          | null                                       |
| password         | character varying           | NO          | null                                       |
| created_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |
| updated_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |


### **3. availabilities (참석 가능 일정)**
| id               | bigint                      | NO          | nextval('availabilities_id_seq'::regclass) |
| event_id         | bigint                      | NO          | null                                       |
| participant_id   | bigint                      | NO          | null                                       |
| selected_date    | date                        | NO          | null                                       |
| start_time       | time without time zone      | NO          | '00:00:00'::time without time zone         |
| end_time         | time without time zone      | NO          | '23:59:00'::time without time zone         |
| created_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |
| updated_at       | timestamp without time zone | YES         | CURRENT_TIMESTAMP                          |


## 🚀 프로젝트 실행 방법

### 1️⃣ 프론트엔드 실행
```bash
git clone https://github.com/ES-TREE/gather-time.git
npm install
npm run dev
```

### 2️⃣ Supabase 설정
1. Supabase 계정을 생성하고 새 프로젝트를 만듭니다.
2. PostgreSQL 데이터베이스를 설정하고 위의 테이블 모델링을 적용합니다.
3. .env.local 파일을 생성하고 Supabase URL 및 API 키를 설정합니다.
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3️⃣ 배포 (Vercel 사용)
```bash
npm run build
vercel
```

## 🏗 향후 개발 계획
- 이벤트 url 링크 생성 방식 보안 고려하여 개선 uuid -> ??
- 이벤트 생성 전 회원가입 기능 추가
- 조회 UI 개선
- 사용자 자동 로그인 및 로그아웃