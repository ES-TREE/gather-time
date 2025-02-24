# GatherTime (게더타임) 🕒

**GatherTime**은 **모임 일정 조율**을 쉽게 할 수 있도록 도와주는 **모바일 웹 서비스**입니다.  
<b>[When2Meet](https://www.when2meet.com/)의 모바일 사용성을 개선</b>하기 위해 시작되었으며, 사용자가 간단한 링크 공유만으로 참석 가능 일자를 조율할 수 있습니다.

## 🛠 기술 스택

- **Frontend**: JavaScript, React, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## 📌 주요 기능

### 1. 이벤트 생성 ✨
- 사용자가 행사(이벤트)를 생성하고, 제목 및 일정 범위를 설정할 수 있습니다.
- 행사마다 고유한 **UUID**가 부여되어 쉽게 공유할 수 있습니다.

### 2. 참석자 등록 👥
- 행사에 참여할 참석자가 **이름과 비밀번호**를 입력하여 참석을 등록할 수 있습니다.
- 비밀번호는 **해시 암호화**되어 저장됩니다.

### 3. 참석 가능 날짜 선택 📆
- 참석자는 일정 범위 내에서 가능한 날짜를 선택할 수 있습니다.
- 선택한 날짜는 데이터베이스에 저장되며, 모두가 확인할 수 있습니다.

### 4. 모임 일정 조율 📊
- 모든 참석자의 참석 가능 일정을 한눈에 확인할 수 있는 UI 제공
- 참석 가능한 날짜가 가장 많은 일정을 추천

## ✅ 기능 목록 (2025.02.22 기준)
### 1. 이벤트 생성 페이지
- 달력 내 일자 선택: 드래그 또는 클릭하여 선택
- 이벤트 제목 입력
- 생성 버튼을 눌러 이벤트 생성 완료
### 2. 로그인 페이지 (이벤트 접속 후)
- 사용자 등록: 이름 중복 체크 기능 제공
### 4. 입력 페이지
- 달력 일자 선택 기능: 드래그 또는 클릭하여 선택 가능
- 이벤트 공유하기/링크 복사 버튼 제공
### 5. 조회 페이지
- 참석 가능한 인원이 존재하는 일자에 참석 가능한 인원 비율을 백분율과 분수로 모두 표시하고, 백분율에 따라 불투명도 조절
- 예: 참석 가능 최대 인원 수 / 총 입력 수 형식으로 참석 가능 여부를 직관적으로 확인
- 특정 일자를 클릭하면 모달을 띄우고, 모달 내에 해당 일자에 참석 가능한 인원 목록을 표시
- 이벤트 공유하기/링크 복사 버튼 제공

## 🗂 데이터베이스 모델링

### **1. events (행사)**
| 컬럼명         | 데이터 타입      | 설명                  |
|---------------|---------------|----------------------|
| id           | BIGINT (PK)   | 행사 ID |
| uuid         | CHAR(36)      | 행사 고유 식별자 (UUID) |
| title        | VARCHAR(255)  | 행사 제목 |
| start_date   | DATE          | 행사 시작일자 |
| end_date     | DATE          | 행사 종료일자 |
| created_at   | TIMESTAMP     | 생성 시간 |
| updated_at   | TIMESTAMP     | 수정 시간 |

### **2. participants (참석자)**
| 컬럼명         | 데이터 타입      | 설명                  |
|---------------|---------------|----------------------|
| id           | BIGINT (PK)   | 참석자 ID |
| event_id     | BIGINT (FK)   | 행사 ID (참조) |
| name         | VARCHAR(100)  | 참석자 이름 |
| password_hash | VARCHAR(255) | 비밀번호 (해시 암호화) |
| created_at   | TIMESTAMP     | 생성 시간 |
| updated_at   | TIMESTAMP     | 수정 시간 |

### **3. availabilities (참석 가능 일자)**
| 컬럼명         | 데이터 타입      | 설명                  |
|---------------|---------------|----------------------|
| id           | BIGINT (PK)   | 참석 가능 일자 ID |
| event_id     | BIGINT (FK)   | 행사 ID (참조) |
| participant_id | BIGINT (FK) | 참석자 ID (참조) |
| selected_date | DATE          | 참석자가 선택한 가능 날짜 |
| created_at   | TIMESTAMP     | 생성 시간 |
| updated_at   | TIMESTAMP     | 수정 시간 |

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

## 🏗 향후 개발 계획 (사용자 요청 시)
- 🛠 사용자 자동 로그인 및 로그아웃
- ✅ 시간별 행사 참여 시간 표시