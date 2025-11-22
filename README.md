# PingPong Gang 🏓

42 서울 학생들을 위한 실시간 멀티플레이어 탁구 게임 플랫폼입니다.

## 프로젝트 소개 (Project Overview)

**PingPong Gang**은 웹 브라우저에서 즐길 수 있는 실시간 탁구 게임입니다. 친구들과 함께 플레이하거나 자동 매칭을 통해 다른 플레이어와 대결할 수 있으며, 토너먼트 시스템을 통해 경쟁할 수 있습니다.

A real-time multiplayer ping-pong game platform for 42 Seoul students. Play table tennis in your web browser, compete with friends, or join tournaments.

## 주요 기능 (Features)

### 🎮 게임 (Game)
- **실시간 멀티플레이어**: WebSocket 기반 실시간 게임 플레이
- **자동 매칭**: 빠른 게임을 위한 자동 플레이어 매칭
- **커스텀 매칭**: 친구와 함께하는 사용자 정의 게임
- **토너먼트**: 경쟁적인 토너먼트 시스템

### 👥 소셜 (Social)
- **친구 시스템**: 친구 추가, 수락/거절 기능
- **실시간 채팅**: 친구와의 실시간 채팅방
- **사용자 프로필**: 아바타 업로드 및 프로필 관리

### 📊 통계 (Statistics)
- **게임 히스토리**: 과거 게임 기록 조회
- **게임 통계**: 개인 게임 통계 및 성과 추적

### 🔐 인증 (Authentication)
- **OAuth 로그인**: 42 OAuth 인증 지원
- **이메일 로그인**: 이메일 기반 회원가입 및 로그인
- **이메일 인증**: 안전한 회원가입을 위한 이메일 검증

## 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **UI Library**: React 19
- **Styling**: TailwindCSS 4.1
- **State Management**: Jotai, TanStack Query
- **Forms**: React Hook Form
- **Real-time**: Socket.io Client

### Development Tools
- **Package Manager**: pnpm 10.20.0
- **Linter/Formatter**: Biome
- **Build Tool**: Turbopack (Next.js)

## 시작하기 (Getting Started)

### 필수 요구사항 (Prerequisites)
- Node.js 18.17 이상
- pnpm 10.20.0

### 설치 (Installation)

```bash
# 저장소 클론
git clone https://github.com/42-Gang/web.git
cd web

# 의존성 설치
pnpm install
```

### 개발 서버 실행 (Development)

```bash
# 개발 서버 시작 (포트 4242)
pnpm dev
```

개발 서버가 실행되면 http://localhost:4242 에서 애플리케이션에 접속할 수 있습니다.

### 빌드 (Build)

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

### 코드 품질 (Code Quality)

```bash
# 린트 검사
pnpm lint

# 코드 포맷팅
pnpm format
```

## 프로젝트 구조 (Project Structure)

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── (protected)/    # 인증 필요 페이지
│   │   ├── lobby/      # 게임 로비 (매칭)
│   │   ├── game/       # 게임 플레이
│   │   ├── tournament/ # 토너먼트
│   │   ├── friend/     # 친구 관리
│   │   ├── history/    # 게임 히스토리
│   │   └── profile/    # 사용자 프로필
│   └── auth/           # 인증 페이지
├── api/                # API 클라이언트 및 타입
│   ├── queries/        # TanStack Query hooks
│   ├── mutations/      # Mutation hooks
│   └── types/          # API 타입 정의
├── components/         # 재사용 가능한 컴포넌트
├── constants/          # 상수 및 환경 변수
├── socket/             # WebSocket 관련 코드
├── stores/             # 전역 상태 관리
└── styles/             # 글로벌 스타일

```

## 개발 포트 (Development Port)

이 프로젝트는 포트 **4242**를 사용합니다 (42 Seoul의 42를 의미).

## 라이선스 (License)

이 프로젝트는 42 Seoul의 교육 프로젝트입니다.

---

Made with ❤️ by 42-Gang