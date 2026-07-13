/**
 * App — 최상위. 현재 코스, 진행 상태, 줌 오버레이, 레이아웃 관리.
 *
 * 다른 코스(BOM 등록편 등)를 추가하려면:
 *  1. data/course-xxx.jsx 를 course-yakaek.jsx와 같은 구조로 만들기
 *  2. window.COURSES 배열에 등록하면 상단 코스 선택기에 자동 표시
 */

const { useState: useAppS, useEffect: useAppE, useCallback: useAppC, useMemo: useAppM } = React;

const LS_KEY_PREFIX = 'hanul-erp-course-';

function loadState(courseId){
  try{
    const raw = localStorage.getItem(LS_KEY_PREFIX + courseId);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function saveState(courseId, state){
  try{ localStorage.setItem(LS_KEY_PREFIX + courseId, JSON.stringify(state)); }catch(e){}
}

function App(){
  // Course registry — extensible
  const COURSES = [window.COURSE_YAKAEK].filter(Boolean);
  const [courseId, setCourseId] = useAppS(COURSES[0]?.id);
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];

  const initial = loadState(course.id);
  const [currentIdx, setCurrentIdx] = useAppS(initial?.currentIdx ?? 0);
  const [doneHotspots, setDoneHotspots] = useAppS(initial?.doneHotspots ?? {});
  const [sidebarOpen, setSidebarOpen] = useAppS(false);

  // Zoom overlay state
  const [zoomHsIdx, setZoomHsIdx] = useAppS(-1);

  // Tweaks
  const [t, setTweak] = window.useTweaks({
    layout: 'sidebar',
    showTips: true,
    pulseMarkers: true,
    showThumbs: true,
  });

  // Persist
  useAppE(() => {
    saveState(course.id, { currentIdx, doneHotspots });
  }, [course.id, currentIdx, doneHotspots]);

  useAppE(() => {
    document.body.classList.toggle('no-tips', !t.showTips);
    document.body.classList.toggle('no-pulse', !t.pulseMarkers);
    document.body.classList.toggle('no-thumbs', !t.showThumbs);
  }, [t.showTips, t.pulseMarkers, t.showThumbs]);

  const steps = course.steps;
  const step = steps[currentIdx];
  const total = steps.length;
  const totalDisplaySteps = total - 2; // exclude intro + complete

  // Progress
  const [progressPct, totalHotspots, doneHotspotsCount] = useAppM(() => {
    let done = 0, all = 0;
    for(const s of steps){
      if(s.hotspots){
        all += s.hotspots.length;
        const dm = doneHotspots[s.id] || {};
        done += s.hotspots.filter(h => dm[h.id]).length;
      }
    }
    return [all ? (done/all)*100 : 0, all, done];
  }, [doneHotspots, steps]);

  const setDone = useAppC((stepId, hsId, val) => {
    setDoneHotspots(prev => ({
      ...prev,
      [stepId]: { ...(prev[stepId]||{}), [hsId]: val }
    }));
  }, []);

  const goNext = useAppC(() => {
    if(currentIdx < total - 1){
      // Mark all hotspots of current step done + mark as visited when advancing
      setDoneHotspots(prev => {
        const dm = { ...(prev[step.id] || {}) };
        if(step.hotspots){
          step.hotspots.forEach(h => { dm[h.id] = true; });
        }
        dm.__visited = true;
        return { ...prev, [step.id]: dm };
      });
      setCurrentIdx(i => i + 1);
      scrollMainTop();
    }
  }, [currentIdx, total, step]);

  const goPrev = useAppC(() => {
    if(currentIdx > 0){
      setCurrentIdx(i => i - 1);
      scrollMainTop();
    }
  }, [currentIdx]);

  const goTo = useAppC((idx) => {
    if(idx >= 0 && idx < total){
      setCurrentIdx(idx);
      setSidebarOpen(false);
      scrollMainTop();
    }
  }, [total]);

  const doReset = useAppC(() => {
    if(!confirm('진행 상황을 모두 초기화하시겠습니까?')) return;
    setCurrentIdx(0);
    setDoneHotspots({});
  }, []);

  const onZoom = useAppC((hsIdx) => {
    setZoomHsIdx(hsIdx);
  }, []);

  const closeZoom = useAppC(() => setZoomHsIdx(-1), []);

  // Keyboard nav
  useAppE(() => {
    function onKey(e){
      if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      if(document.querySelector('.zoom-overlay')) return; // overlay handles its own keys
      if(e.key === 'ArrowRight'){ goNext(); }
      else if(e.key === 'ArrowLeft'){ goPrev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const bodyCls = ['body', `layout-${t.layout === 'topbar' ? 'b' : 'a'}`, sidebarOpen && 'sidebar-open'].filter(Boolean).join(' ');

  const stepDisplayIdx = step.kind === 'intro' ? 0 : step.kind === 'complete' ? totalDisplaySteps + 1 : currentIdx;

  return (
    <div className="app">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="brand">
          <img src="assets/hanul-logo.png" alt="한울생약 로고" className="brand-mark"/>
          <div className="brand-text">
            <b>한울생약</b>
            <small>연구소 실무 교육</small>
          </div>
        </div>
        <div className="topbar-title">
          <h1>{course.title}</h1>
          <span className="chip">{step.tag}</span>
        </div>
        <div className="topbar-right">
          <div className="progress-text">
            <span className="progress-text-num">{doneHotspotsCount}<span className="progress-text-sep">/</span>{totalHotspots}</span>
            <span className="progress-text-pct">{Math.round(progressPct)}%</span>
          </div>
          <button className="reset" onClick={doReset} title="처음부터 다시">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            <span>초기화</span>
          </button>
        </div>
      </header>

      {/* Top progress bar */}
      <div className="progress-track" aria-hidden>
        <div className="progress-fill" style={{ width: `${progressPct}%` }}/>
      </div>

      {/* BODY */}
      <div className={bodyCls}>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? '✕' : '☰'} 스텝
        </button>

        <Sidebar
          course={course}
          currentIdx={currentIdx}
          doneHotspots={doneHotspots}
          onSelect={goTo}
        />

        <main className="main">
          <div className="main-inner">
            <StepView
              step={step}
              stepIdx={stepDisplayIdx}
              totalDisplaySteps={totalDisplaySteps}
              doneMap={doneHotspots[step.id] || {}}
              setDone={setDone}
              onZoom={onZoom}
              activeHsIdx={zoomHsIdx}
              onPrev={goPrev}
              onNext={goNext}
              onStart={() => goTo(1)}
              onRestart={doReset}
              course={course}
              doneCount={doneHotspotsCount}
              totalHotspots={totalHotspots}
            />
          </div>
        </main>
      </div>

      {/* Zoom overlay */}
      {zoomHsIdx >= 0 && step.hotspots && zoomHsIdx < step.hotspots.length && (
        <ZoomOverlay
          step={step}
          hsIdx={zoomHsIdx}
          onClose={closeZoom}
          onGoto={setZoomHsIdx}
        />
      )}

      {/* Tweaks */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="레이아웃">
          <window.TweakRadio
            label="구성"
            value={t.layout}
            onChange={v => setTweak('layout', v)}
            options={[
              {value:'sidebar', label:'사이드바'},
              {value:'topbar', label:'풀스크린'},
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="표시 옵션">
          <window.TweakToggle label="Tip 박스 표시" value={t.showTips} onChange={v => setTweak('showTips', v)}/>
          <window.TweakToggle label="마커 애니메이션" value={t.pulseMarkers} onChange={v => setTweak('pulseMarkers', v)}/>
          <window.TweakToggle label="인트로 썸네일" value={t.showThumbs} onChange={v => setTweak('showThumbs', v)}/>
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

function scrollMainTop(){
  requestAnimationFrame(() => {
    const main = document.querySelector('.main');
    if(main) main.scrollTop = 0;
  });
}

// Mount
const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<App/>);
