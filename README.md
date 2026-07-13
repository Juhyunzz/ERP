# Handoff: 한울생약 ERP 교육 가이드 — 약액 코드 발번 및 처방 등록

## Overview

한울생약 R&D 연구소의 신입 연구원을 위한 **인터랙티브 웹 ERP 교육 가이드**입니다.
실제 ERP 스크린샷 위에 클릭 가능한 번호 마커(핫스팟)를 얹어, 사용자가
순서대로 클릭하며 확대 설명을 읽고 다음 단계로 진행하는 튜토리얼 형태.

**주제**: 약액 코드 발번 및 처방 등록 (12스텝 · 45핫스팟)
**대상**: 연구소 신입 연구원, ERP 초심자
**소요시간**: 약 20 – 25분

동일한 구조로 **BOM 등록편** 등 다른 코스를 확장할 수 있게 컴포넌트형/데이터 분리형으로 설계됨.

---

## About the Design Files

이 번들 안의 파일들은 **HTML로 만든 디자인 레퍼런스**입니다. React + Babel(브라우저 트랜스파일) 기반의 프로토타입으로, **최종 룩 앤 필과 인터랙션을 보여주기 위한 참고 자료**이지 그대로 프로덕션에 배포할 코드는 아닙니다.

구현 시 접근 방식:

- **기존 코드베이스가 있는 경우** — 그 코드베이스의 프레임워크·라이브러리·디자인 시스템 관례를 따라 화면을 재구현하세요 (React SPA, Next.js, Vue, Django templates 등). HTML/CSS는 시각적 명세로만 참고.
- **코드베이스가 없는 경우** — 이 프로토타입 그대로 배포해도 무방하나, 프로덕션급 앱으로 발전시키려면 **Next.js + Tailwind** 또는 **Vite + React**를 권장. 상태 관리는 React 로컬 state로 충분(외부 상태 라이브러리 불필요).

번들된 HTML 파일들을 그대로 서비스로 올리는 것도 가능하지만, 다음 이유로 **재구현을 권장**합니다:
- Babel in-browser 트랜스파일은 프로덕션 성능 나쁨 (사전 컴파일 필요)
- 코스 데이터가 JSX 안에 있어서 CMS 연동 시 데이터 분리 필요
- 이미지 최적화, 라우팅, SEO 대응이 안 되어 있음

---

## Fidelity

**High-fidelity (hifi)** — 픽셀 퍼펙트 목업입니다.

- 실제 한울생약 ERP 화면 스크린샷 14장을 사용
- 최종 컬러(oklch 기반 청록 브랜드), 타이포그래피(Pretendard, JetBrains Mono), 스페이싱, 라운드, 그림자, 인터랙션까지 확정
- 45개 핫스팟의 이미지 위 좌표(%)를 실측 · 재조정 완료
- 개발자는 이 스크린을 **픽셀 단위로 재현**해야 합니다

---

## Screens / Views

### 전역 셸 (App shell)

```
┌────────────────────────────────────────────────────────────────┐
│  TOPBAR (60px)                                                 │
│  [로고+브랜드] │ [제목+태그칩] │ [진행률·초기화]                  │
├──────────────┬─────────────────────────────────────────────────┤
│              │  MAIN                                           │
│  SIDEBAR     │  ┌────────────────────────────────────────┐    │
│  (300px)     │  │  Step Header (eyebrow + h1 + lead)    │    │
│              │  ├────────────────────────────────────────┤    │
│  · 스텝 리스트  │  │  Instructions grid (auto-fit 240px+)  │    │
│  · 진행률 도트  │  ├────────────────────────────────────────┤    │
│  · 단축키 안내  │  │  ERP Stage (image + hotspots)         │    │
│              │  ├────────────────────────────────────────┤    │
│              │  │  Tip Box (경고/팁 카드)                │    │
│              │  ├────────────────────────────────────────┤    │
│              │  │  Step Nav (이전 / 진행률 / 다음)       │    │
│              │  └────────────────────────────────────────┘    │
└──────────────┴─────────────────────────────────────────────────┘
```

레이아웃 A(기본): 좌측 사이드바 + 메인 캔버스. `grid-template-columns: 300px 1fr`
레이아웃 B(tweak): 사이드바를 오프캔버스로 숨김. `grid-template-columns: 1fr`

---

### 스텝별 화면 (14개)

전체 스텝 배열 (`data/course-yakaek.jsx`의 `steps`):

| # | id                    | kind         | tag        | 제목                                              |
|---|-----------------------|--------------|------------|--------------------------------------------------|
| 0 | intro                 | intro        | START      | 시작하기                                          |
| 1 | overview              | flow         | STEP 1     | 전체 흐름 — 요청 접수부터 처방 확정까지            |
| 2 | main-menu             | (interactive)| STEP 2     | 메인메뉴에서 [품목정보조회v1] 실행                |
| 3 | item-query            | (interactive)| STEP 3     | 품목정보조회 — [내용물] 검색                      |
| 4 | right-click           | (interactive)| STEP 4     | 내용물 목록에서 우클릭 → [품목기본정보]           |
| 5 | item-basic-detail     | (interactive)| STEP 5     | [품목기본정보관리] — [상세] 탭 입력               |
| 6 | design-change-empty   | (interactive)| STEP 6     | [설계변경관리(제조처방)] 열기                     |
| 7 | item-code-help        | (interactive)| STEP 7     | [품목코드HELP]에서 약액 검색                      |
| 8 | design-change-history | (interactive)| STEP 8     | 조회 결과 & 설계변경 이력 확인                    |
| 9 | design-register       | (interactive)| STEP 9     | [설계변경등록] — 처방공정도 & 투입원료            |
| 10| ingredient-table      | (interactive)| STEP 10    | [투입원료] 탭 — 상세 테이블 관리                  |
| 11| special-notes         | (interactive)| STEP 11    | [특이사항] 탭 — 제조 유의사항 기록                |
| 12| inspection-spec       | (interactive)| STEP 12    | [검사SPEC] 탭 — 성상·pH 기준 등록                |
| 13| complete              | complete     | COMPLETE   | 완료 & 체크리스트                                 |

각 interactive 스텝의 데이터 구조 (예: STEP 5):

```js
{
  id: 'item-basic-detail',
  tag: 'STEP 5',
  title: '[품목기본정보관리] — [상세] 탭 입력',
  lead: '발번받은 코드를 붙여넣고 관리유형·명칭·약칭·담당·전광판품명을 입력합니다.',
  image: 'assets/erp/05_item_basic_info.png',
  imageAspect: 1024 / 835,   // 렌더링 시 컨테이너 aspect-ratio
  hotspots: [
    {
      id: 'a', num: 1,
      top: '18.5%', left: '15.7%', width: '14.2%', height: '3%',
      title: '품목코드 붙여넣기',
      body: (<>발번받은 코드를 <span className="code">Ctrl+V</span>로 붙여넣습니다.<br/><br/>
        뒤의 <span className="code">-3-01</span>은 ERP가 <b>자동 부여</b>합니다.</>)
    },
    // ... 6개 총
  ],
  tip: {
    title: '주의사항',
    body: (<><ul><li>...</li></ul></>)
  }
}
```

**핫스팟 좌표는 이미지 픽셀 대비 %.** 모든 스텝의 45개 좌표는 실제 스크린샷에 격자를 얹어 실측한 값 — 재현 시 그대로 사용하세요.

---

### 인트로 화면 (`kind: 'intro'`)

- 상단 중앙: **한울생약 로고**(`assets/hanul-logo.png`, 높이 84px, 페이드인 애니메이션)
- 이하 순서: eyebrow → 제목(42px, 800 weight, 청록 accent) → lead → 3열 메타 카드 → 6장 preview 그리드 → "가이드 시작하기 →" CTA
- 미리보기 카드는 코스의 image 있는 스텝 중 앞 6개 자동 표시 (`steps.filter(s => s.image).slice(0, 6)`)

### Flow 화면 (`kind: 'flow'`, STEP 1)

- 세로 스택된 5개 노드 카드: `[번호 뱃지 52px] [태그 + 제목 + 설명]`
- 각 노드 사이에 `↓` 화살표
- 하단에 Tip 박스

### Interactive 화면 (일반 스텝)

- **Step Header**: eyebrow chip(STEP N · N/12) + h1 (28px, 700, -0.03em letter-spacing) + lead (15px, 780px max-width)
- **Instructions grid**: 카드 리스트. `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`. 카드마다 번호 뱃지 + 짧은 라벨. 클릭 시 해당 hotspot 줌 열림.
- **ERP Stage**:
  - 6px 패딩의 white surface에 border-radius 14px
  - 내부 image-wrap은 `aspect-ratio: <imageAspect>` — 이미지 크기 유지
  - Hotspot은 `<button>` 절대 배치. hotspot 자체는 투명 (테두리 hover 시 dashed), hotspot 내부에 `.hotspot-marker` (28px 원형 청록 뱃지)
  - 마커 위치는 hotspot 좌상단 모서리 중심 (transform: translate(-50%, -50%))
  - 이미지 왼쪽 가장자리(<5% left) hotspot은 `.marker-right` 클래스 → 마커를 hotspot 안쪽으로 이동
  - 넓은 hotspot(>60% width)은 `.marker-top` 클래스 → 좌상단 안쪽 배치
- **Tip Box**: `--warn-bg` 배경, ⓘ 아이콘, 제목 + 본문
- **Step Nav**: 좌측 [← 이전], 중앙 진행률 pill (`5 / 12`), 우측 [다음 →] (모든 hotspot 완료 시 pulse 애니메이션)

### Zoom Overlay

핫스팟 클릭 시 뜨는 모달. 좌측 480×300 이미지 확대 프리뷰 + 우측 상세 설명.
- 이미지는 hotspot 중심이 프리뷰 정중앙에 오도록 scale·translate 계산 (`components/ZoomOverlay.jsx` 참조)
- 하이라이트 사각형: 청록 테두리 2.5px + 화이트 outer-glow (box-shadow: 0 0 0 9999px rgba(255,255,255,.35))
- 하단 dots + [이전/다음] 버튼
- 키보드: Esc 닫기 · ← → 이동 · Enter 다음

### 완료 화면 (`kind: 'complete'`)

- 96px 원형 그라디언트 배지 + ✓ 아이콘 (pop-in 애니메이션)
- Confetti (60조각, 7개 브랜드 컬러 랜덤, 3s 낙하)
- 실무 체크리스트 (13항목, 초록 체크 원)
- [이전] · [🖨 체크리스트 인쇄] · [처음부터 다시]

---

## Interactions & Behavior

### 스텝 이동
- **키보드**: ←/→ 스텝 이동 (입력 필드 포커스 중이나 zoom overlay 열려있을 땐 비활성)
- **사이드바 클릭**: 자유롭게 스텝 점프 (`onSelect(idx)`)
- **[다음] 버튼**: 현재 스텝의 모든 hotspot을 done 처리 + `__visited` 마크 + 다음 스텝으로 이동
- 이동 시 `.main` 스크롤 top으로 리셋

### 핫스팟 클릭
- 클릭 → 해당 hotspot을 done 처리 → ZoomOverlay 오픈
- ZoomOverlay 내부에서 이전/다음으로 다른 hotspot 순회 가능
- 마지막 hotspot의 [다음] 버튼은 overlay 닫힘

### 진행률 계산
- 전체 hotspot 수 대비 완료 수 (%)
- 상단 progress bar에 그라디언트 fill (drop-2 → drop-3 → drop-4)
- 각 스텝 사이드바 항목마다 mini progress bar (`<step>/<total>`)

### 애니메이션 (지속시간·이징)
- **pulse-ring** (hotspot 마커): 2s cubic-bezier(.4,0,.4,1) infinite
- **bounce-marker** (다음 대상 hotspot): 1.6s ease-in-out infinite
- **pulse-num** (다음 대상 instruction 뱃지): 1.8s infinite
- **pulse-btn** (모든 hotspot 완료 후 다음 버튼): 1.8s infinite
- **zoom-in** (overlay 오픈): .3s cubic-bezier(.2,.9,.3,1.15)
- **rect-pulse** (overlay 하이라이트 박스): 2s ease-in-out infinite
- **intro-logo-in**: .6s cubic-bezier(.2,.9,.3,1.4) 0.1s
- **preview-in** (인트로 카드): .5s cubic-bezier(.2,.9,.3,1), 순차 delay 0.07s
- **confetti-fall**: 2.5~4.5s linear (랜덤)

### 상태 저장 (localStorage)
- 키: `hanul-erp-course-<courseId>`
- 저장 값: `{ currentIdx, doneHotspots }`
- 저장 시점: currentIdx 또는 doneHotspots 변경 시
- 로드: 앱 마운트 시 초기 state로 사용
- 초기화 버튼: 확인 → `localStorage.removeItem(...)` + state 리셋

### 반응형
- **최대 1100px**: zoom overlay가 세로로 변경 (grid-template-columns: 1fr). 프리뷰 높이 240px.
- **최대 800px**: 사이드바가 오프캔버스, `.sidebar-toggle` 버튼 표시. 브랜드 텍스트 숨김.

---

## State Management

전역 state (App 컴포넌트 안, `useState`):

```ts
{
  courseId: string,                // 현재 코스 (기본 yakaek-prescription)
  currentIdx: number,              // 현재 스텝 인덱스 (0 ~ steps.length-1)
  doneHotspots: {                  // 스텝별 완료 hotspot 맵
    [stepId: string]: {
      [hotspotId: string]: true,
      __visited?: true             // flow/intro 스텝용 방문 플래그
    }
  },
  zoomHsIdx: number,               // 현재 오픈된 zoom hotspot 인덱스 (-1이면 닫힘)
  sidebarOpen: boolean,            // 모바일 사이드바
  // Tweaks
  t: {
    layout: 'sidebar' | 'topbar',
    showTips: boolean,
    pulseMarkers: boolean,
    showThumbs: boolean,
  }
}
```

**데이터 소스**: 없음 (모든 코스 데이터는 정적 JSX)
**API 통신**: 없음
**인증**: 없음

프로덕션 확장 시 고려사항:
- 코스 데이터를 CMS(예: Sanity, Contentful) 또는 백엔드 JSON API로 분리
- 진행률을 서버에 저장하여 여러 기기에서 이어보기 가능하게
- 학습 완료 인증서 발급 로직

---

## Design Tokens

### 컬러 (oklch 기반)

```css
/* 브랜드 청록 */
--brand-900: oklch(38% 0.06 195);
--brand-800: oklch(43% 0.08 195);   /* CTA 버튼 배경 */
--brand-700: oklch(50% 0.10 195);   /* 마커, 액티브 상태 */
--brand-600: oklch(58% 0.11 195);   /* 하이라이트 */
--brand-500: oklch(66% 0.11 195);
--brand-300: oklch(82% 0.07 195);
--brand-100: oklch(94% 0.03 195);   /* chip 배경, code 배경 */
--brand-50:  oklch(97.5% 0.015 195); /* hover 배경 */

/* 7색 물방울 (한울생약 홈페이지 오마주) */
--drop-1: oklch(70% 0.14 220);  /* 파랑 */
--drop-2: oklch(72% 0.13 195);  /* 청록 */
--drop-3: oklch(74% 0.14 160);  /* 초록-청 */
--drop-4: oklch(78% 0.14 130);  /* 라임 */
--drop-5: oklch(80% 0.14 90);   /* 골드 */
--drop-6: oklch(72% 0.15 45);   /* 오렌지 */
--drop-7: oklch(68% 0.16 15);   /* 코랄 */

/* 뉴트럴 */
--bg:            oklch(98.5% 0.005 195);   /* 앱 배경 */
--bg-2:          oklch(96.5% 0.008 195);
--surface:       #ffffff;
--surface-2:     oklch(96.5% 0.008 195);
--border:        oklch(90% 0.012 195);
--border-strong: oklch(82% 0.02 195);
--ink-900:       oklch(22% 0.02 220);      /* 본문 */
--ink-800:       oklch(30% 0.02 220);
--ink-700:       oklch(40% 0.02 220);
--ink-500:       oklch(55% 0.015 220);
--ink-400:       oklch(68% 0.012 220);
--ink-300:       oklch(80% 0.008 220);

/* 액센트 */
--warn:        oklch(72% 0.15 60);   /* Tip 아이콘 */
--warn-bg:     oklch(97% 0.035 75);
--warn-border: oklch(88% 0.055 75);
--warn-ink:    oklch(42% 0.11 60);
--ok:          oklch(62% 0.14 155);  /* 완료 체크 */
--ok-bg:       oklch(96% 0.04 155);
```

RGB/HEX 근사값 (oklch를 지원 안 하는 도구용):
- brand-700 ≈ `#2E7B87`
- brand-800 ≈ `#256671`
- brand-100 ≈ `#DFEDEF`
- ok ≈ `#42A65C`
- warn ≈ `#D9924D`
- ink-900 ≈ `#1A2530`

### 타이포그래피

```css
--font-sans: "Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

폰트 로드:
- Pretendard: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`
- JetBrains Mono: Google Fonts `family=JetBrains+Mono:wght@400;500;600;700`

타입 스케일:
| 용도                | size    | weight | letter-spacing |
|---------------------|---------|--------|----------------|
| Intro 제목          | 42px    | 800    | -0.035em       |
| Complete 제목       | 34px    | 800    | -0.03em        |
| Step 제목 (h1)      | 28px    | 700    | -0.03em        |
| Zoom 카드 제목      | 20px    | 700    | -0.025em       |
| Complete 요약 h3    | 16px    | 700    | -0.02em        |
| 사이드바 h2         | 16px    | 700    | -0.025em       |
| Flow 노드 제목      | 16px    | 700    | -0.02em        |
| 본문 (lead)         | 15~16.5px | 400  | -0.005em       |
| Step 카드 라벨      | 13px    | 500    | 기본           |
| Chip / Tag          | 10~11px | 600~700| 0.03~0.05em    |
| Kbd                 | 10.5px  | 500    | mono           |
| Code                | 12~13px | 500    | mono           |

### 스페이싱 (관례)

- 컨테이너 padding: 32px 40px (main-inner)
- 카드 padding: 10~16px
- 카드 간 gap: 8~12px
- 섹션 마진: 22~32px

### 라운드

```css
--radius-sm: 6px;   /* 버튼, 태그 */
--radius:    10px;  /* 카드 */
--radius-lg: 14px;  /* 스테이지, 완료 요약 */
--radius-xl: 20px;  /* 줌 오버레이 카드 */
```

### 그림자

```css
--shadow-1: 0 1px 2px rgba(15, 40, 60, .04), 0 1px 3px rgba(15, 40, 60, .05);
--shadow-2: 0 4px 12px rgba(15, 40, 60, .06), 0 2px 6px rgba(15, 40, 60, .04);
--shadow-3: 0 20px 40px -12px rgba(15, 40, 60, .18), 0 8px 20px rgba(15, 40, 60, .08);
--shadow-4: 0 32px 64px -16px rgba(15, 40, 60, .3), 0 12px 24px rgba(15, 40, 60, .12);
```

---

## Assets

### 로고
- `assets/hanul-logo.png` (80×66, PNG, alpha 채널) — 7개 물방울 로고
  - 흰색 배경 누끼 처리 완료 (완전 투명 + 경계 알파 부드럽게)
  - 헤더에 34px 높이, 인트로에 84px 높이로 사용

### ERP 스크린샷 (14장, 모두 PNG, alpha)
`assets/erp/` 디렉토리:

| 파일명                          | 크기        | 용도                                    |
|---------------------------------|-------------|----------------------------------------|
| 01_main_menu.png                | 1024×775    | STEP 2 — 메인메뉴 iEMenu               |
| 02_item_query_empty.png         | 1024×768    | STEP 3 — 품목정보조회 (빈 조회창)      |
| 03_item_query_result.png        | 1024×768    | (인트로 preview용, 스텝엔 미사용)      |
| 04_rightclick_menu.png          | 1024×770    | STEP 4 — 우클릭 컨텍스트 메뉴          |
| 05_item_basic_info.png          | 1024×835    | STEP 5 — 품목기본정보관리              |
| 06_design_change_empty.png      | 1024×695    | STEP 6 — 설계변경관리(제조처방)        |
| 07_item_code_help.png           | 1024×697    | (참고용, 스텝엔 08 사용)               |
| 08_content_search_result.png    | 1024×697    | STEP 7 — 품목코드HELP 검색결과         |
| 09_design_change_result.png     | 1024×696    | (참고용)                               |
| 10_design_history.png           | 1024×695    | STEP 8 — 설계변경 이력                 |
| 11_design_register.png          | 1024×717    | STEP 9 — 설계변경등록 처방공정도       |
| 12_process_diagram.png          | 1024×718    | STEP 10 — 투입원료 탭                  |
| 13_special_notes.png            | 1024×717    | STEP 11 — 특이사항 탭                  |
| 14_inspection_spec.png          | 1024×719    | STEP 12 — 검사SPEC 탭                  |

**모든 이미지에 자동 감지·마스킹 처리 적용됨**:
- 우측 하단의 사용자 이름 ("윤주현") 완전 제거 → 상태바 배경색으로 덮음
- 07·08번은 팝업 내부의 두 번째 사용자 이름까지 이중 제거

---

## Interaction Sub-components 참고 위치

- **Hotspot** — `components/Hotspot.jsx`
  - Props: `{ hs, done, isNext, onClick }`
  - hotspot의 left · width 값으로 자동으로 `.marker-right` / `.marker-top` 클래스 부여

- **ZoomOverlay** — `components/ZoomOverlay.jsx`
  - Props: `{ step, hsIdx, onClose, onGoto }`
  - hotspot 좌표 → 480×300 프리뷰에 scale·translate 계산 (line 60~90)
  - 키보드 핸들러(Esc, ←/→, Enter) 자체 관리

- **StepView (라우터)** — `components/StepView.jsx`
  - kind별로 IntroView / FlowView / CompleteView / InteractiveView 렌더
  - IntroView는 로고 + 메타 + preview 카드
  - InteractiveView는 헤더 + instruction 리스트 + ERP stage + tip + nav

- **Sidebar** — `components/Sidebar.jsx`
  - 스텝 리스트 + 각 스텝 progress mini bar
  - intro/complete 스텝은 특수 스타일 (`.step-intro`, `.step-complete`)

- **App** — `components/App.jsx`
  - 최상위 상태·라우팅·키보드 핸들러
  - `window.COURSES` 배열에 코스 추가 시 자동으로 인식되도록 확장 여지 있음 (현재는 `[window.COURSE_YAKAEK]` 하드코딩)

- **Course data** — `data/course-yakaek.jsx`
  - **BOM 등록편 등 새 코스 추가 시 이 파일과 동일 구조로 새 파일 만들면 됨**
  - 스텝 종류: `intro` / `flow` / `interactive(기본)` / `complete`
  - 인터랙티브 스텝 필드: `id, tag, title, lead, image, imageAspect, hotspots[], tip`

- **Tweaks 패널** — `tweaks_panel.jsx` (참고용, 프로덕션에선 제거 가능)
  - 개발 중 레이아웃/애니메이션 토글용

---

## Files

번들에 포함된 파일:

```
design_handoff_erp_tutorial/
├── README.md                          (이 문서)
├── index.html                         (앱 셸 + 전체 CSS + React/Babel 로드)
├── tweaks_panel.jsx                   (개발용 tweaks 스타터 — 프로덕션 제거 가능)
├── data/
│   └── course-yakaek.jsx              (코스 데이터 · 스텝 · 핫스팟 좌표)
└── components/
    ├── App.jsx                        (최상위)
    ├── Sidebar.jsx                    (좌측 스텝 리스트)
    ├── StepView.jsx                   (스텝 라우터 + Intro/Flow/Interactive/Complete)
    ├── Hotspot.jsx                    (번호 마커)
    └── ZoomOverlay.jsx                (핫스팟 확대 모달)
```

**이미지 자산은 용량 관계로 이 번들에 포함하지 않았습니다.**
Design 프로젝트의 `assets/` 폴더에서 별도로 받으세요 (총 15개 PNG, 합계 ~2.3MB).

---

## 재구현 체크리스트

프로덕션 코드베이스로 옮길 때 반드시 확인:

- [ ] Babel in-browser 대신 build-time transpile (Vite / Next.js 등)
- [ ] JSX 안의 코스 데이터를 JSON/MDX 등으로 분리
- [ ] 이미지 최적화 (Next Image, `<picture>` + WebP)
- [ ] localStorage 키 네임스페이싱 (`hanul-erp-course-<courseId>`)
- [ ] 접근성 검토: hotspot이 `<button>` 이므로 aria-label 확인 · 키보드 탭 순서 · zoom overlay `role="dialog"` + focus trap
- [ ] Progress bar를 `<progress>` 시맨틱 요소로 (선택)
- [ ] 반응형: 800px 이하에서 사이드바 오프캔버스 · 마커 크기 축소 검토
- [ ] 인쇄 스타일 검증 (Complete 화면 체크리스트 인쇄 기능)
- [ ] BOM 등록편 등 다른 코스 확장 시 App.jsx의 `COURSES` 배열 데이터 소스 유연화
