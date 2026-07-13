<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>한울생약 ERP 교육 · 약액 코드 발번 및 처방 등록</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
:root{
  /* Brand — 한울생약 청록 계열 */
  --brand-900: oklch(38% 0.06 195);
  --brand-800: oklch(43% 0.08 195);
  --brand-700: oklch(50% 0.10 195);
  --brand-600: oklch(58% 0.11 195);
  --brand-500: oklch(66% 0.11 195);
  --brand-300: oklch(82% 0.07 195);
  --brand-100: oklch(94% 0.03 195);
  --brand-50:  oklch(97.5% 0.015 195);

  /* 7색 물방울 */
  --drop-1: oklch(70% 0.14 220);
  --drop-2: oklch(72% 0.13 195);
  --drop-3: oklch(74% 0.14 160);
  --drop-4: oklch(78% 0.14 130);
  --drop-5: oklch(80% 0.14 90);
  --drop-6: oklch(72% 0.15 45);
  --drop-7: oklch(68% 0.16 15);

  /* Neutrals */
  --bg: oklch(98.5% 0.005 195);
  --bg-2: oklch(96.5% 0.008 195);
  --surface: #ffffff;
  --surface-2: oklch(96.5% 0.008 195);
  --border: oklch(90% 0.012 195);
  --border-strong: oklch(82% 0.02 195);
  --ink-900: oklch(22% 0.02 220);
  --ink-800: oklch(30% 0.02 220);
  --ink-700: oklch(40% 0.02 220);
  --ink-500: oklch(55% 0.015 220);
  --ink-400: oklch(68% 0.012 220);
  --ink-300: oklch(80% 0.008 220);

  --warn: oklch(72% 0.15 60);
  --warn-bg: oklch(97% 0.035 75);
  --warn-border: oklch(88% 0.055 75);
  --warn-ink: oklch(42% 0.11 60);
  --ok: oklch(62% 0.14 155);
  --ok-bg: oklch(96% 0.04 155);

  --shadow-1: 0 1px 2px rgba(15, 40, 60, .04), 0 1px 3px rgba(15, 40, 60, .05);
  --shadow-2: 0 4px 12px rgba(15, 40, 60, .06), 0 2px 6px rgba(15, 40, 60, .04);
  --shadow-3: 0 20px 40px -12px rgba(15, 40, 60, .18), 0 8px 20px rgba(15, 40, 60, .08);
  --shadow-4: 0 32px 64px -16px rgba(15, 40, 60, .3), 0 12px 24px rgba(15, 40, 60, .12);

  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  --font-sans: "Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
}

*{ box-sizing: border-box; }
html, body{ margin:0; padding:0; }
body{
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--ink-900);
  font-size: 14.5px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  height: 100vh;
  letter-spacing: -0.005em;
}

button{
  font-family: inherit;
  color: inherit;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.code, code{
  font-family: var(--font-mono);
  font-size: 0.92em;
  background: var(--brand-100);
  color: var(--brand-800);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0;
}

.kbd{
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 10.5px; font-weight: 500;
  padding: 2px 6px 1px; border-radius: 4px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--ink-700);
  box-shadow: 0 1px 0 var(--border);
  vertical-align: 1px;
  margin: 0 1px;
}

/* ===================================
   APP SHELL
   =================================== */
.app{
  display: grid;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  width: 100vw;
}

/* ===================================
   TOPBAR
   =================================== */
.topbar{
  display: grid;
  grid-template-columns: 300px 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  z-index: 10;
}

.brand{
  display: flex; align-items: center; gap: 12px;
}
.brand-mark{
  height: 34px;
  width: auto;
  display: block;
  object-fit: contain;
}
.brand-text{ display:flex; flex-direction:column; line-height: 1.15;}
.brand-text b{ font-weight: 700; font-size: 14px; letter-spacing: -0.02em; color: var(--ink-900);}
.brand-text small{ font-size: 11px; color: var(--ink-500); font-weight: 500; white-space: nowrap;}

.topbar-title{
  display:flex; align-items:center; gap: 12px;
  min-width: 0;
}
.topbar-title h1{
  margin: 0; font-size: 14.5px; font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink-800);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.topbar-title .chip{
  font-family: var(--font-mono);
  font-size: 10.5px; font-weight: 700;
  color: var(--brand-800);
  background: var(--brand-100);
  padding: 4px 9px; border-radius: 999px;
  letter-spacing: 0.03em;
  flex-shrink: 0;
}

.topbar-right{
  display: flex; align-items: center; gap: 14px;
}
.progress-text{
  display: flex; align-items: baseline; gap: 8px;
  font-family: var(--font-mono);
  white-space: nowrap;
}
.progress-text-num{
  font-size: 14px; font-weight: 600; color: var(--ink-800);
  letter-spacing: -0.01em;
}
.progress-text-sep{ opacity: 0.35; padding: 0 1px;}
.progress-text-pct{
  font-size: 11px; font-weight: 600;
  color: var(--brand-700);
  background: var(--brand-100);
  padding: 2px 7px; border-radius: 4px;
}

.reset{
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink-700);
  border-radius: var(--radius-sm);
  padding: 6px 11px;
  font-size: 12px; font-weight: 500;
  transition: all .15s;
  white-space: nowrap;
}
.reset span{ white-space: nowrap; }
.reset:hover{ border-color: var(--border-strong); color: var(--ink-900); background: var(--bg-2);}
.reset svg{ color: var(--ink-500);}

/* progress bar under topbar */
.progress-track{
  position: absolute;
  left: 0; right: 0; top: 59px;
  height: 3px;
  z-index: 11;
  pointer-events: none;
  background: transparent;
}
.progress-fill{
  height: 100%;
  background: linear-gradient(90deg, var(--drop-2), var(--drop-3), var(--drop-4));
  width: 0%;
  transition: width .4s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 12px rgba(30, 160, 180, .3);
}

/* ===================================
   BODY LAYOUT
   =================================== */
.body{
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 0;
  overflow: hidden;
}
.body.layout-b{ grid-template-columns: 1fr; }
.body.layout-b .sidebar{
  position: fixed;
  top: 60px; bottom: 0; left: 0;
  width: 300px;
  transform: translateX(-100%);
  transition: transform .3s cubic-bezier(.4,0,.2,1);
  z-index: 20;
  box-shadow: var(--shadow-3);
}
.body.layout-b.sidebar-open .sidebar{ transform: translateX(0); }
.body.layout-b .sidebar-toggle{ display: inline-flex; }

.sidebar-toggle{
  display: none;
  position: fixed; top: 76px; left: 20px;
  z-index: 15;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 14px; font-size: 13px; font-weight: 600;
  color: var(--ink-800);
  box-shadow: var(--shadow-1);
  align-items: center; gap: 6px;
}
.sidebar-toggle:hover{ background: var(--bg-2); }

/* ===================================
   SIDEBAR
   =================================== */
.sidebar{
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 22px 0 24px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.sidebar::-webkit-scrollbar{ width: 8px;}
.sidebar::-webkit-scrollbar-thumb{ background: var(--border-strong); border-radius: 4px;}

.sidebar-header{
  padding: 0 22px 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}
.sidebar-header .eyebrow{
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-mono);
  font-size: 10.5px; letter-spacing: 0.08em;
  color: var(--ink-400); font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.eyebrow-dot{
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--drop-3);
  display: inline-block;
}
.sidebar-header h2{
  margin: 0; font-size: 16px; font-weight: 700;
  letter-spacing: -0.025em; color: var(--ink-900);
  line-height: 1.3;
}

.step-list{
  list-style: none; padding: 0; margin: 0;
}
.step-item{
  position: relative;
  display: grid;
  grid-template-columns: 46px 1fr;
  align-items: start;
  padding: 11px 22px;
  cursor: pointer;
  transition: background .15s;
  gap: 2px;
}
.step-item:hover{ background: var(--brand-50); }
.step-item.active{ background: var(--brand-100); }
.step-item.active::before{
  content: ""; position: absolute; left: 0; top: 8px; bottom: 8px;
  width: 3px; background: var(--brand-700); border-radius: 0 3px 3px 0;
}

/* Intro and complete sidebar rows */
.step-item.step-intro, .step-item.step-complete{
  background: linear-gradient(90deg, transparent, var(--brand-50), transparent);
  border-block: 1px dashed var(--border);
  margin: 4px 0;
}
.step-item.step-intro.active, .step-item.step-complete.active{
  background: var(--brand-100);
}

.step-num-icon{
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--brand-50);
  border: 1.5px solid var(--brand-300);
  color: var(--brand-700);
  display: flex; align-items: center; justify-content: center;
  margin-top: 1px;
}
.step-item.step-intro.active .step-num-icon{
  background: var(--brand-700);
  border-color: var(--brand-700);
  color: white;
}
.step-num-icon.complete-icon{
  background: var(--ok-bg);
  border-color: var(--ok);
  color: var(--ok);
}
.step-item.step-complete.active .step-num-icon.complete-icon{
  background: var(--ok);
  color: white;
}

.step-num{
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--surface);
  border: 1.5px solid var(--border-strong);
  font-family: var(--font-mono);
  font-size: 12px; font-weight: 700;
  color: var(--ink-500);
  transition: all .2s;
  margin-top: 1px;
  display: flex; align-items: center; justify-content: center;
}
.step-item.active .step-num{
  background: var(--brand-700);
  border-color: var(--brand-700);
  color: white;
  box-shadow: 0 0 0 3px var(--brand-100);
}
.step-item.is-done .step-num{
  background: var(--ok);
  border-color: var(--ok);
  color: white;
}

.step-meta{ min-width: 0;}
.step-title{
  font-size: 13px; font-weight: 600; color: var(--ink-800);
  letter-spacing: -0.015em;
  line-height: 1.35;
  margin-bottom: 4px;
}
.step-item.active .step-title{ color: var(--brand-900); }
.step-item.is-done .step-title{ color: var(--ink-700); }

.step-row{
  display: flex; align-items: center; gap: 8px;
  flex-wrap: wrap;
}
.step-tag{
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9.5px; font-weight: 600;
  color: var(--ink-500);
  background: var(--surface-2);
  padding: 2px 6px; border-radius: 4px;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.step-item.active .step-tag{ background: var(--brand-600); color: white;}
.step-item.is-done .step-tag{ background: var(--ok-bg); color: var(--ok);}

.step-progress{
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono);
  font-size: 10px; color: var(--ink-500);
  font-weight: 500;
}
.step-progress-track{
  width: 44px; height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.step-progress-fill{
  height: 100%;
  background: var(--brand-500);
  border-radius: 2px;
  transition: width .3s;
}
.step-item.is-done .step-progress-fill{ background: var(--ok);}

.sidebar-footer{
  padding: 16px 22px;
  margin-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 11.5px; color: var(--ink-500);
  line-height: 1.7;
}
.sidebar-footer-title{
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.08em;
  color: var(--ink-400); font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.sidebar-footer-row{
  display: flex; align-items: center; gap: 4px;
}

/* ===================================
   MAIN
   =================================== */
.main{
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg);
  position: relative;
}
.main::-webkit-scrollbar{ width: 10px;}
.main::-webkit-scrollbar-thumb{ background: var(--border-strong); border-radius: 5px;}
.main-inner{
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 40px 120px;
}
.body.layout-b .main-inner{
  padding-top: 60px;
  max-width: 1240px;
}

/* Step header */
.step-header{ margin-bottom: 24px; }
.step-header .eyebrow{
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px; color: var(--brand-800);
  font-weight: 600;
  background: var(--brand-100);
  padding: 5px 11px 5px 10px;
  border-radius: 999px;
  letter-spacing: 0.03em;
  margin-bottom: 14px;
  white-space: nowrap;
}
.step-header .eyebrow .eyebrow-dot{
  background: var(--brand-600);
}
.eyebrow-sep{ opacity: .4; }
.step-header h1{
  margin: 0 0 10px;
  font-size: 28px; font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--ink-900);
  line-height: 1.2;
  text-wrap: balance;
}
.step-header .lead{
  font-size: 15px; color: var(--ink-700);
  max-width: 780px;
  line-height: 1.6;
  text-wrap: pretty;
  margin: 0;
}
.step-header .lead b{ color: var(--ink-900);}

/* Instructions list */
.instructions{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
  margin-bottom: 22px;
}
.instruction{
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 14px 10px 12px;
  font-size: 13px;
  text-align: left;
  transition: all .18s;
  cursor: pointer;
}
.instruction:hover{
  border-color: var(--brand-500);
  transform: translateY(-1px);
  box-shadow: var(--shadow-1);
}
.instruction.is-done{
  border-color: var(--ok);
  background: linear-gradient(180deg, var(--ok-bg), var(--surface));
}
.instruction.is-next{
  border-color: var(--brand-600);
  background: var(--brand-50);
  box-shadow: 0 0 0 3px var(--brand-100);
}
.instruction-num{
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 11.5px; font-weight: 700;
  background: var(--surface-2);
  color: var(--ink-500);
  border: 1.5px solid var(--border-strong);
  flex-shrink: 0;
}
.instruction.is-done .instruction-num{
  background: var(--ok); color: white; border-color: var(--ok);
}
.instruction.is-next .instruction-num{
  background: var(--brand-700); color: white; border-color: var(--brand-700);
  animation: pulse-num 1.8s infinite;
}
@keyframes pulse-num{
  0%,100%{ box-shadow: 0 0 0 0 rgba(30,140,160,.35);}
  50%{ box-shadow: 0 0 0 6px rgba(30,140,160,0);}
}
.instruction-text{
  color: var(--ink-900); font-weight: 500;
  line-height: 1.4;
}
.instruction.is-done .instruction-text{ color: var(--ink-700);}

/* ===================================
   ERP STAGE
   =================================== */
.erp-stage{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2);
  overflow: hidden;
  margin-bottom: 24px;
  padding: 6px;
  background-image:
    linear-gradient(180deg, var(--bg-2) 0%, var(--surface) 60px);
}

.erp-image-wrap{
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #e6ecef;
  box-shadow: 0 1px 2px rgba(0,0,0,.06), inset 0 0 0 1px rgba(0,0,0,.04);
}
.erp-image{
  width: 100%;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

/* Hotspot */
.hotspot{
  position: absolute;
  cursor: pointer;
  padding: 0;
  background: none;
  border: none;
  z-index: 3;
}
.hotspot-area{
  position: absolute; inset: 0;
  border: 2px dashed transparent;
  border-radius: 6px;
  transition: all .18s;
  background: transparent;
}
.hotspot:hover .hotspot-area{
  border-color: var(--brand-600);
  background: rgba(30, 140, 160, 0.10);
  box-shadow: 0 0 0 3px rgba(30,140,160,.08);
}
.hotspot.is-done .hotspot-area{
  border: 2px solid rgba(80, 170, 100, .35);
  background: rgba(80, 170, 100, 0.06);
  border-style: solid;
}

.hotspot-marker{
  position: absolute;
  /* 마커를 hotspot 영역의 왼쪽 위 모서리에 걸치도록 배치.
     translate로 마커 중심을 정확히 hotspot 좌상단 꼭지점에 맞춘다. */
  left: 0; top: 0;
  transform: translate(-50%, -50%);
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--brand-700);
  color: white;
  display: flex; align-items: center; justify-content: center;
  box-shadow:
    0 4px 12px rgba(30,140,160,.45),
    0 0 0 3px rgba(255,255,255,.98);
  transition: transform .2s;
  z-index: 4;
}
/* hotspot이 이미지 왼쪽 가장자리에 있으면 마커가 잘리므로 hotspot 안쪽 좌측 상단에 배치. */
.hotspot.marker-right .hotspot-marker{
  left: 8px; top: 8px;
  transform: none;
}
/* 아주 넓은 hotspot(>60% width)은 왼쪽 위 모서리 안쪽에 배치. */
.hotspot.marker-top .hotspot-marker{
  left: 8px; top: 8px;
  transform: none;
}
.hotspot-marker-num{
  font-family: var(--font-mono);
  font-weight: 700; font-size: 14px;
  line-height: 1;
}
.hotspot-marker::before{
  content: ""; position: absolute; inset: -3px;
  border-radius: 50%;
  border: 2px solid var(--brand-700);
  opacity: .5;
  animation: pulse-ring 2s cubic-bezier(.4,0,.4,1) infinite;
  transform-origin: center;
}
@keyframes pulse-ring{
  0%{ transform: scale(.85); opacity: .6;}
  70%{ transform: scale(1.7); opacity: 0;}
  100%{ transform: scale(1.7); opacity: 0;}
}
.hotspot:hover .hotspot-marker{
  transform: translate(-50%, -50%) scale(1.15);
}
.hotspot.marker-right:hover .hotspot-marker,
.hotspot.marker-top:hover .hotspot-marker{
  transform: scale(1.15);
}
.hotspot.is-next .hotspot-marker{
  animation: bounce-marker 1.6s ease-in-out infinite;
}
@keyframes bounce-marker{
  0%,100%{ transform: translate(-50%, -50%);}
  50%{ transform: translate(-50%, -58%);}
}
.hotspot.marker-right.is-next .hotspot-marker,
.hotspot.marker-top.is-next .hotspot-marker{
  animation: bounce-marker-inner 1.6s ease-in-out infinite;
}
@keyframes bounce-marker-inner{
  0%,100%{ transform: translateY(0);}
  50%{ transform: translateY(-4px);}
}
.hotspot.is-done .hotspot-marker{
  background: var(--ok);
  box-shadow:
    0 3px 10px rgba(60,150,80,.35),
    0 0 0 3px rgba(255,255,255,.98);
}
.hotspot.is-done .hotspot-marker::before{ display: none; }
.hotspot.is-done .hotspot-marker-num{
  display: none;
}
.hotspot.is-done .hotspot-marker::after{
  content: "";
  display: block;
  width: 14px; height: 14px;
  background: no-repeat center / contain
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>");
}

/* ===================================
   ZOOM OVERLAY
   =================================== */
.zoom-overlay{
  position: fixed; inset: 0;
  background: rgba(15, 30, 45, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
  animation: fade-in .22s;
  padding: 30px;
}
@keyframes fade-in{ from{opacity:0;} to{opacity:1;}}

.zoom-card{
  position: relative;
  background: var(--surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-4);
  width: 100%; max-width: 900px;
  overflow: hidden;
  animation: zoom-in .3s cubic-bezier(.2,.9,.3,1.15);
}
@keyframes zoom-in{
  from{ opacity: 0; transform: scale(.92);}
  to{ opacity: 1; transform: scale(1);}
}

.zoom-close{
  position: absolute; top: 12px; right: 12px;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,.05);
  color: var(--ink-700);
  font-size: 22px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  z-index: 5;
  transition: all .15s;
}
.zoom-close:hover{ background: rgba(0,0,0,.1); color: var(--ink-900);}

.zoom-layout{
  display: grid;
  grid-template-columns: 480px 1fr;
  min-height: 340px;
}
.zoom-preview{
  background: #e6ecef;
  position: relative;
  overflow: hidden;
  border-right: 1px solid var(--border);
}
.zoom-preview-img{
  transition: left .35s cubic-bezier(.2,.9,.3,1),
              top .35s cubic-bezier(.2,.9,.3,1),
              width .35s cubic-bezier(.2,.9,.3,1),
              height .35s cubic-bezier(.2,.9,.3,1);
  user-select: none;
  -webkit-user-drag: none;
}
.zoom-preview-rect{
  position: absolute;
  border: 2.5px solid var(--brand-600);
  border-radius: 4px;
  box-shadow:
    0 0 0 9999px rgba(255,255,255,0.35),
    0 0 20px rgba(30,140,160,.45);
  pointer-events: none;
  animation: rect-pulse 2s ease-in-out infinite;
}
@keyframes rect-pulse{
  0%,100%{ box-shadow: 0 0 0 9999px rgba(255,255,255,0.35), 0 0 20px rgba(30,140,160,.45);}
  50%{ box-shadow: 0 0 0 9999px rgba(255,255,255,0.4), 0 0 30px rgba(30,140,160,.65);}
}
.zoom-preview-loading{
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-500); font-size: 13px;
}

.zoom-body{
  padding: 28px 32px 24px;
  display: flex; flex-direction: column;
  min-height: 340px;
}
.zoom-eyebrow{
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 12px;
}
.zoom-eyebrow-num{
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--brand-700); color: white;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-weight: 700; font-size: 15px;
  box-shadow: 0 2px 8px rgba(30,140,160,.35);
}
.zoom-eyebrow-tag{
  font-family: var(--font-mono);
  font-size: 11px; color: var(--brand-800);
  font-weight: 600; letter-spacing: 0.04em;
  text-transform: uppercase;
}
.zoom-title{
  margin: 0 0 10px; font-size: 20px; font-weight: 700;
  letter-spacing: -0.025em; color: var(--ink-900);
  line-height: 1.3;
  text-wrap: balance;
}
.zoom-desc{
  font-size: 14px; color: var(--ink-700);
  line-height: 1.65; text-wrap: pretty;
  flex: 1;
}
.zoom-desc b{ color: var(--ink-900);}
.zoom-desc ul, .zoom-desc ol{ margin: 8px 0 0; padding-left: 20px;}
.zoom-desc li{ margin-bottom: 4px;}

.zoom-dots{
  display: flex; gap: 6px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
}
.zoom-dot{
  width: 24px; height: 4px;
  background: var(--border-strong);
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: all .15s;
  padding: 0;
}
.zoom-dot:hover{ background: var(--brand-500);}
.zoom-dot.active{
  background: var(--brand-700);
  width: 32px;
}

.zoom-actions{
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 32px;
  background: var(--bg-2);
  border-top: 1px solid var(--border);
}
.zoom-hint{
  font-size: 11.5px; color: var(--ink-500);
  display: flex; align-items: center; gap: 2px;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
}
.hint-sep{ opacity: .35; padding: 0 3px;}
.zoom-btns{ display: flex; gap: 8px;}
.zoom-btn{
  background: var(--brand-700); color: white;
  border-radius: var(--radius-sm);
  padding: 8px 16px; font-size: 13px; font-weight: 600;
  letter-spacing: -0.01em;
  transition: all .15s;
  border: 1px solid var(--brand-700);
}
.zoom-btn:hover:not(:disabled){ background: var(--brand-800); border-color: var(--brand-800);}
.zoom-btn.secondary{
  background: var(--surface); color: var(--ink-700);
  border: 1px solid var(--border);
}
.zoom-btn.secondary:hover:not(:disabled){ background: var(--bg-2); color: var(--ink-900); border-color: var(--border-strong);}
.zoom-btn:disabled{ opacity: .4; cursor: not-allowed;}

/* ===================================
   TIP BOX
   =================================== */
.tip-box{
  background: var(--warn-bg);
  border: 1px solid var(--warn-border);
  border-radius: var(--radius);
  padding: 14px 18px 14px 16px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
}
.tip-icon{
  width: 24px; height: 24px;
  color: var(--warn);
  margin-top: 1px;
}
.tip-title{
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 700;
  color: var(--warn-ink);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.tip-content{
  font-size: 13.5px; color: var(--ink-900); line-height: 1.65;
  text-wrap: pretty;
}
.tip-content ul, .tip-content ol{ margin: 4px 0 0; padding-left: 20px;}
.tip-content li{ margin-bottom: 3px;}
.tip-content b{ color: var(--ink-900);}

/* ===================================
   FLOW VIEW (process diagram)
   =================================== */
.flow-grid{
  display: flex; flex-direction: column; align-items: center;
  gap: 10px;
  margin: 24px 0 32px;
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
}
.flow-node{
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 18px;
  align-items: center;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  width: 100%;
  max-width: 640px;
  transition: all .18s;
}
.flow-node:hover{
  border-color: var(--brand-500);
  box-shadow: var(--shadow-1);
}
.flow-num{
  width: 52px; height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-600), var(--brand-800));
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 20px; font-weight: 700;
  box-shadow: 0 4px 12px rgba(30,140,160,.25);
}
.flow-tag{
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 600;
  color: var(--brand-800);
  background: var(--brand-100);
  padding: 2px 8px; border-radius: 4px;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
  white-space: nowrap;
}
.flow-title{
  font-size: 16px; font-weight: 700;
  color: var(--ink-900);
  letter-spacing: -0.02em;
  margin-bottom: 3px;
}
.flow-desc{
  font-size: 13px; color: var(--ink-700);
  line-height: 1.5;
}
.flow-arrow{
  color: var(--brand-500);
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  opacity: .6;
}

/* ===================================
   INTRO
   =================================== */
.intro{
  padding: 40px 20px 80px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}
.intro-logo{
  display: block;
  height: 84px; width: auto;
  margin: 0 auto 28px;
  object-fit: contain;
  opacity: 0;
  transform: translateY(-8px);
  animation: intro-logo-in .6s cubic-bezier(.2,.9,.3,1.4) 0.1s forwards;
}
@keyframes intro-logo-in{
  from{ opacity: 0; transform: translateY(-12px) scale(.92);}
  to{ opacity: 1; transform: translateY(0) scale(1);}
}

.intro-eyebrow{
  font-family: var(--font-mono);
  font-size: 12px; font-weight: 600;
  color: var(--brand-700);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.intro h1{
  margin: 0 0 16px;
  font-size: 42px; font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.1;
  color: var(--ink-900);
  text-wrap: balance;
}
.intro h1 .accent{
  color: var(--brand-700);
}
.intro-lead{
  font-size: 16.5px; color: var(--ink-700);
  line-height: 1.65; max-width: 620px; margin: 0 auto 36px;
  text-wrap: pretty;
}
.intro-lead b{ color: var(--ink-900);}

.intro-meta{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 36px;
  text-align: left;
  max-width: 700px; margin-left: auto; margin-right: auto;
}
.intro-meta-card{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 18px;
}
.intro-meta-card .k{
  font-family: var(--font-mono); font-size: 10.5px;
  color: var(--ink-500); font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
  margin-bottom: 5px;
}
.intro-meta-card .v{
  font-size: 15px; font-weight: 600; color: var(--ink-900);
  letter-spacing: -0.015em;
}

.intro-preview{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin: 0 auto 40px;
  max-width: 960px;
}
body.no-thumbs .intro-preview{ display: none;}
.intro-preview-card{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  animation: preview-in .5s cubic-bezier(.2,.9,.3,1) forwards;
  transition: transform .18s, box-shadow .18s;
}
.intro-preview-card:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow-2);
}
@keyframes preview-in{
  to{ opacity: 1; transform: translateY(0);}
}
.intro-preview-img{
  width: 100%; aspect-ratio: 1024/768;
  background: no-repeat center / cover var(--bg-2);
  border-bottom: 1px solid var(--border);
}
.intro-preview-label{
  padding: 8px 12px;
  text-align: left;
}
.intro-preview-tag{
  display: block;
  font-family: var(--font-mono);
  font-size: 9.5px; font-weight: 600;
  color: var(--brand-700);
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.intro-preview-title{
  display: block;
  font-size: 11.5px; font-weight: 600; color: var(--ink-800);
  line-height: 1.35;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.intro-start{
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--brand-800);
  color: white;
  border-radius: var(--radius);
  padding: 16px 32px;
  font-size: 16px; font-weight: 600;
  letter-spacing: -0.015em;
  transition: all .2s;
  box-shadow: 0 6px 18px rgba(30,120,140,.28);
}
.intro-start:hover{
  background: var(--brand-900);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(30,120,140,.36);
}
.intro-start-arrow{
  transition: transform .2s;
}
.intro-start:hover .intro-start-arrow{ transform: translateX(3px);}

/* ===================================
   COMPLETE
   =================================== */
.complete{
  padding: 40px 20px 80px;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}
.complete-badge{
  width: 96px; height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--drop-2), var(--drop-3));
  color: white;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 28px;
  box-shadow:
    0 16px 40px rgba(30,160,180,.35),
    0 0 0 8px rgba(30,160,180,.08);
  animation: pop-in .6s cubic-bezier(.2,.9,.3,1.4);
}
.complete-badge svg{
  width: 48px; height: 48px;
}
@keyframes pop-in{
  from{ opacity: 0; transform: scale(.3);}
  to{ opacity: 1; transform: scale(1);}
}
.complete h1{
  margin: 0 0 14px;
  font-size: 34px; font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--ink-900);
}
.complete-lead{
  font-size: 15.5px; color: var(--ink-700);
  line-height: 1.65; max-width: 520px; margin: 0 auto 36px;
}
.complete-lead b{ color: var(--ink-900);}

.complete-summary{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  text-align: left;
  margin-bottom: 28px;
  box-shadow: var(--shadow-1);
}
.complete-summary-head{
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}
.complete-summary h3{
  margin: 0; font-size: 16px; font-weight: 700;
  color: var(--ink-900);
  letter-spacing: -0.02em;
}
.complete-summary-sub{
  font-size: 11.5px; color: var(--ink-500);
  font-weight: 500;
}
.checklist{
  list-style: none; padding: 0; margin: 0;
  display: grid; gap: 8px;
}
.checklist-item{
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  align-items: start;
  font-size: 13.5px; color: var(--ink-900);
  line-height: 1.5;
}
.checklist-check{
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--ok-bg);
  color: var(--ok);
  border: 1.5px solid var(--ok);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  margin-top: 1px;
}

.complete-actions{
  display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;
}

/* Confetti */
.confetti{
  position: fixed; inset: 0; pointer-events: none;
  z-index: 200; overflow: hidden;
}
.confetti span{
  position: absolute; top: -20px;
  width: 8px; height: 14px;
  border-radius: 2px;
  animation: confetti-fall linear forwards;
}
@keyframes confetti-fall{
  0%{ transform: translateY(0) rotate(0);}
  100%{ transform: translateY(110vh) rotate(720deg); opacity: 0;}
}

/* ===================================
   STEP NAV
   =================================== */
.step-nav{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}
.step-nav-center{
  display: flex; justify-content: center;
}
.step-nav-idx{
  font-family: var(--font-mono);
  font-size: 12px; color: var(--ink-500);
  padding: 4px 10px;
  background: var(--surface-2);
  border-radius: 999px;
  font-weight: 500;
  letter-spacing: 0.03em;
}
.nav-btn{
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-sm);
  font-size: 13.5px; font-weight: 600;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink-700);
  transition: all .15s;
  letter-spacing: -0.015em;
}
.nav-btn:not(.primary){ justify-self: start;}
.nav-btn.primary{ justify-self: end;}
.nav-btn:hover:not(:disabled){
  border-color: var(--border-strong);
  color: var(--ink-900);
  background: var(--bg-2);
}
.nav-btn:disabled{ opacity: .35; cursor: not-allowed;}
.nav-btn.primary{
  background: var(--brand-700); color: white; border-color: var(--brand-700);
}
.nav-btn.primary:hover:not(:disabled){
  background: var(--brand-800); border-color: var(--brand-800);
}
.nav-btn.primary.pulse{ animation: pulse-btn 1.8s infinite;}
@keyframes pulse-btn{
  0%,100%{ box-shadow: 0 0 0 0 rgba(30,140,160,.35);}
  50%{ box-shadow: 0 0 0 8px rgba(30,140,160,0);}
}

/* ===================================
   TWEAK OVERRIDES
   =================================== */
body.no-tips .tip-box{ display: none; }
body.no-pulse .hotspot-marker::before{ animation: none; opacity: 0; }
body.no-pulse .hotspot.is-next .hotspot-marker{ animation: none; }
body.no-pulse .instruction.is-next .instruction-num{ animation: none; }
body.no-pulse .nav-btn.primary.pulse{ animation: none; }
body.no-pulse .zoom-preview-rect{ animation: none; }
body.no-pulse .complete-badge{ animation: none; }

/* Print */
@media print{
  .app > *:not(main), .sidebar, .step-nav, .complete-badge, .complete-actions, .confetti, .zoom-overlay{ display: none !important; }
  .main{ overflow: visible; height: auto; }
  .main-inner{ padding: 20px 0;}
  .complete-summary{ box-shadow: none; }
}

/* Responsive: smaller screens */
@media (max-width: 1100px){
  .zoom-layout{ grid-template-columns: 1fr; }
  .zoom-preview{ width: 100% !important; height: 240px !important; }
  .intro-preview{ grid-template-columns: repeat(2, 1fr);}
}
@media (max-width: 800px){
  .body{ grid-template-columns: 1fr;}
  .sidebar{
    position: fixed; top: 60px; bottom: 0; left: 0;
    width: 280px;
    transform: translateX(-100%);
    z-index: 20;
  }
  .body.sidebar-open .sidebar{ transform: translateX(0);}
  .sidebar-toggle{ display: inline-flex;}
  .main-inner{ padding: 60px 20px 100px;}
  .step-header h1{ font-size: 22px;}
  .topbar{ grid-template-columns: auto 1fr auto; padding: 0 14px; gap: 12px;}
  .topbar-title h1{ display: none;}
  .brand-text{ display: none;}
  .intro h1{ font-size: 30px;}
  .intro-preview{ grid-template-columns: repeat(2, 1fr);}
  .intro-meta{ grid-template-columns: 1fr;}
}
</style>
</head>
<body>

<div id="root"></div>

<script>
window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "sidebar",
  "showTips": true,
  "pulseMarkers": true,
  "showThumbs": true
}/*EDITMODE-END*/;
</script>

<!-- React + Babel (pinned) -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<script type="text/babel" src="tweaks_panel.jsx"></script>
<script type="text/babel" src="data/course-yakaek.jsx"></script>
<script type="text/babel" src="components/Hotspot.jsx"></script>
<script type="text/babel" src="components/ZoomOverlay.jsx"></script>
<script type="text/babel" src="components/StepView.jsx"></script>
<script type="text/babel" src="components/Sidebar.jsx"></script>
<script type="text/babel" src="components/App.jsx"></script>

</body>
</html>
