/**
 * StepView — 스텝 종류별 렌더링을 위임하는 라우터.
 *
 * 스텝 종류:
 *   'intro'    → IntroView
 *   'flow'     → FlowView (프로세스 다이어그램)
 *   'complete' → CompleteView (체크리스트)
 *   default    → InteractiveView (이미지 + 핫스팟)
 */

const { useState: useSV, useEffect: useEV, useMemo: useMV, useRef: useRV } = React;

// =====================================================
// INTRO
// =====================================================
function IntroView({ course, onStart, totalHotspots }){
  return (
    <div className="intro">
      <img src="assets/hanul-logo.png" alt="한울생약" className="intro-logo"/>
      <div className="intro-eyebrow">한울생약 · 연구소 실무 교육</div>
      <h1>{course.title.split(' 및 ')[0]} 및<br/><span className="accent">{course.title.split(' 및 ')[1]}</span></h1>
      <p className="intro-lead">
        ERP에서 신제품 약액 코드를 발번받고 처방을 등록하는 전 과정을,<br/>
        <b>실제 화면을 클릭하며</b> 단계별로 익힙니다.
      </p>
      <div className="intro-meta">
        <div className="intro-meta-card">
          <div className="k">대상</div>
          <div className="v">{course.audience}</div>
        </div>
        <div className="intro-meta-card">
          <div className="k">소요시간</div>
          <div className="v">{course.duration}</div>
        </div>
        <div className="intro-meta-card">
          <div className="k">구성</div>
          <div className="v">{course.steps.length - 2}개 스텝 · {totalHotspots}개 핫스팟</div>
        </div>
      </div>

      {/* Preview cards */}
      <div className="intro-preview">
        {course.steps.filter(s => s.image).slice(0,6).map((s, i) => (
          <div key={s.id} className="intro-preview-card" style={{animationDelay: `${0.4 + i*0.07}s`}}>
            <div className="intro-preview-img" style={{backgroundImage:`url("${s.image}")`}}/>
            <div className="intro-preview-label">
              <span className="intro-preview-tag">{s.tag}</span>
              <span className="intro-preview-title">{s.title.split(' — ')[0].split(' - ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="intro-start" onClick={onStart}>
        가이드 시작하기
        <span className="intro-start-arrow">→</span>
      </button>
    </div>
  );
}

// =====================================================
// FLOW (프로세스 다이어그램)
// =====================================================
function FlowView({ step }){
  return (
    <>
      <StepHeader step={step} idx={1}/>
      <div className="flow-grid">
        {step.flow.map((f, i) => (
          <React.Fragment key={f.n}>
            <div className="flow-node">
              <div className="flow-num">{f.n}</div>
              <div className="flow-content">
                <div className="flow-tag">{f.tag}</div>
                <div className="flow-title">{f.title}</div>
                <div className="flow-desc">{f.desc}</div>
              </div>
            </div>
            {i < step.flow.length - 1 && <div className="flow-arrow">↓</div>}
          </React.Fragment>
        ))}
      </div>
      {step.tip && <TipBox tip={step.tip}/>}
    </>
  );
}

// =====================================================
// COMPLETE
// =====================================================
function CompleteView({ course, step, onRestart, onPrev }){
  const [showConfetti, setShowConfetti] = useSV(true);
  useEV(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="complete">
      {showConfetti && <Confetti/>}
      <div className="complete-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h1>수고하셨습니다!</h1>
      <p className="complete-lead">
        <b>{course.title}</b>의 전 과정을 완주하셨습니다.<br/>
        이제 실제 ERP에서 동일한 순서로 진행해 보세요.
      </p>

      <div className="complete-summary">
        <div className="complete-summary-head">
          <h3>실무 체크리스트</h3>
          <span className="complete-summary-sub">인쇄해서 옆에 두고 사용하세요</span>
        </div>
        <ul className="checklist">
          {step.checklist.map((item, i) => (
            <li key={i} className="checklist-item">
              <span className="checklist-check">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="complete-actions">
        <button className="nav-btn" onClick={onPrev}>← 이전 스텝</button>
        <button className="nav-btn" onClick={() => window.print()}>🖨 체크리스트 인쇄</button>
        <button className="nav-btn primary" onClick={onRestart}>처음부터 다시</button>
      </div>
    </div>
  );
}

function Confetti(){
  const colors = ['var(--drop-1)','var(--drop-2)','var(--drop-3)','var(--drop-4)','var(--drop-5)','var(--drop-6)','var(--drop-7)'];
  const pieces = React.useMemo(() => Array.from({length: 60}, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2.5 + Math.random() * 2,
    color: colors[i % colors.length],
    rot: Math.random() * 360,
  })), []);
  return (
    <div className="confetti">
      {pieces.map((p, i) => (
        <span key={i} style={{
          left: `${p.left}%`,
          background: p.color,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          transform: `rotate(${p.rot}deg)`,
        }}/>
      ))}
    </div>
  );
}

// =====================================================
// TIP BOX
// =====================================================
function TipBox({ tip }){
  return (
    <div className="tip-box">
      <div className="tip-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div>
        <div className="tip-title">{tip.title}</div>
        <div className="tip-content">{tip.body}</div>
      </div>
    </div>
  );
}

// =====================================================
// STEP HEADER
// =====================================================
function StepHeader({ step, idx, totalSteps }){
  return (
    <div className="step-header">
      <div className="eyebrow">
        <span className="eyebrow-dot"/>
        <span>{step.tag}</span>
        {totalSteps && (
          <>
            <span className="eyebrow-sep">·</span>
            <span>{idx} / {totalSteps}</span>
          </>
        )}
      </div>
      <h1>{step.title}</h1>
      {step.lead && (
        <p className="lead" dangerouslySetInnerHTML={{__html: step.lead}}/>
      )}
    </div>
  );
}

// =====================================================
// INTERACTIVE VIEW (image + hotspots)
// =====================================================
function InteractiveView({ step, stepIdx, totalDisplaySteps, doneMap, setDone, onZoom, activeHsIdx }){
  const stageRef = useRV(null);

  const nextHsIdx = useMV(() => {
    if(!step.hotspots) return -1;
    return step.hotspots.findIndex(h => !doneMap[h.id]);
  }, [step, doneMap]);

  function openHotspot(idx){
    const hs = step.hotspots[idx];
    setDone(step.id, hs.id, true);
    onZoom(idx);
  }

  const aspect = step.imageAspect || (1024/768);

  return (
    <>
      <StepHeader step={step} idx={stepIdx} totalSteps={totalDisplaySteps}/>

      {/* Instruction list */}
      <div className="instructions">
        {step.hotspots.map((h, i) => {
          const isDone = doneMap[h.id];
          const isNext = i === nextHsIdx;
          return (
            <button
              key={h.id}
              className={['instruction', isDone && 'is-done', isNext && !isDone && 'is-next'].filter(Boolean).join(' ')}
              onClick={() => openHotspot(i)}
            >
              <span className="instruction-num">
                {isDone ? '✓' : h.num}
              </span>
              <span className="instruction-text">{h.title}</span>
            </button>
          );
        })}
      </div>

      {/* ERP stage */}
      <div className="erp-stage" ref={stageRef}>
        <div
          className="erp-image-wrap"
          style={{aspectRatio: `${aspect}`}}
        >
          <img
            src={step.image}
            alt={step.title}
            className="erp-image"
            draggable={false}
          />
          {step.hotspots.map((h, i) => (
            <Hotspot
              key={h.id}
              hs={h}
              done={doneMap[h.id]}
              isNext={i === nextHsIdx}
              onClick={() => openHotspot(i)}
            />
          ))}
        </div>
      </div>

      {/* Tip */}
      {step.tip && <TipBox tip={step.tip}/>}
    </>
  );
}

// =====================================================
// STEP VIEW (router)
// =====================================================
function StepView({ step, stepIdx, totalDisplaySteps, doneMap, setDone, onZoom, activeHsIdx, onPrev, onNext, onStart, onRestart, course, doneCount, totalHotspots }){
  if(step.kind === 'intro'){
    return <IntroView course={course} onStart={onStart} totalHotspots={totalHotspots}/>;
  }
  if(step.kind === 'complete'){
    return <CompleteView course={course} step={step} onRestart={onRestart} onPrev={onPrev}/>;
  }
  if(step.kind === 'flow'){
    return (
      <>
        <FlowView step={step}/>
        <StepNav
          onPrev={onPrev} onNext={onNext}
          stepIdx={stepIdx} totalDisplaySteps={totalDisplaySteps}
          allDone={true}
        />
      </>
    );
  }
  // interactive
  const allDone = step.hotspots && step.hotspots.every(h => doneMap[h.id]);
  return (
    <>
      <InteractiveView
        step={step}
        stepIdx={stepIdx}
        totalDisplaySteps={totalDisplaySteps}
        doneMap={doneMap}
        setDone={setDone}
        onZoom={onZoom}
        activeHsIdx={activeHsIdx}
      />
      <StepNav
        onPrev={onPrev} onNext={onNext}
        stepIdx={stepIdx} totalDisplaySteps={totalDisplaySteps}
        allDone={allDone}
        doneCount={step.hotspots ? step.hotspots.filter(h => doneMap[h.id]).length : 0}
        totalHotspots={step.hotspots ? step.hotspots.length : 0}
      />
    </>
  );
}

function StepNav({ onPrev, onNext, stepIdx, totalDisplaySteps, allDone, doneCount, totalHotspots }){
  const showProgress = typeof doneCount === 'number' && totalHotspots > 0 && !allDone;
  return (
    <div className="step-nav">
      <button className="nav-btn" onClick={onPrev}>
        <span aria-hidden>←</span> 이전
      </button>
      <div className="step-nav-center">
        <span className="step-nav-idx">{stepIdx} / {totalDisplaySteps}</span>
      </div>
      <button
        className={['nav-btn', 'primary', allDone && 'pulse'].filter(Boolean).join(' ')}
        onClick={onNext}
      >
        {showProgress ? `다음 (${doneCount}/${totalHotspots})` : '다음 스텝'}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

window.StepView = StepView;
