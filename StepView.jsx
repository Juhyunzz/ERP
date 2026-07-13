/**
 * Sidebar — 좌측 스텝 목록. 자유 이동 가능.
 * 각 항목은 완료/현재/미완료 상태를 시각화.
 */

function Sidebar({ course, currentIdx, doneHotspots, onSelect }){
  const steps = course.steps;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="eyebrow">
          <span className="eyebrow-dot"/>
          ERP TUTORIAL
        </div>
        <h2>{course.title}</h2>
      </div>

      <ul className="step-list">
        {steps.map((s, i) => {
          if(s.kind === 'intro'){
            return (
              <li key={s.id}
                className={['step-item step-intro', i === currentIdx && 'active'].filter(Boolean).join(' ')}
                onClick={() => onSelect(i)}>
                <div className="step-num-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <div className="step-meta">
                  <div className="step-title">시작하기</div>
                  <div className="step-tag">인트로</div>
                </div>
              </li>
            );
          }
          if(s.kind === 'complete'){
            return (
              <li key={s.id}
                className={['step-item step-complete', i === currentIdx && 'active'].filter(Boolean).join(' ')}
                onClick={() => onSelect(i)}>
                <div className="step-num-icon complete-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="step-meta">
                  <div className="step-title">완료 & 체크리스트</div>
                  <div className="step-tag">완주</div>
                </div>
              </li>
            );
          }

          const dm = doneHotspots[s.id] || {};
          const total = s.hotspots ? s.hotspots.length : 0;
          const done = s.hotspots ? s.hotspots.filter(h => dm[h.id]).length : 0;
          // For flow/hotspot-less steps, mark done only if user has visited (via doneHotspots flag)
          const visited = !!doneHotspots[s.id]?.__visited;
          const isDone = total > 0 ? done === total : visited;
          const isActive = i === currentIdx;
          // Step number (excluding intro)
          const stepNum = i; // intro is 0, so step index 1 = STEP 1

          return (
            <li
              key={s.id}
              className={['step-item', isActive && 'active', isDone && 'is-done'].filter(Boolean).join(' ')}
              onClick={() => onSelect(i)}
            >
              <div className="step-num">
                {isDone
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span>{stepNum}</span>
                }
              </div>
              <div className="step-meta">
                <div className="step-title">{s.title.split(' — ')[0].split(' - ')[0]}</div>
                <div className="step-row">
                  <span className="step-tag">{s.tag}</span>
                  {total > 0 && (
                    <span className="step-progress">
                      <span className="step-progress-track">
                        <span className="step-progress-fill" style={{width: `${(done/total)*100}%`}}/>
                      </span>
                      <span className="step-progress-text">{done}/{total}</span>
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-footer-title">단축키</div>
        <div className="sidebar-footer-row"><span className="kbd">←</span><span className="kbd">→</span> 스텝 이동</div>
        <div className="sidebar-footer-row"><span className="kbd">Esc</span> 오버레이 닫기</div>
        <div className="sidebar-footer-row"><span className="kbd">Enter</span> 다음 핫스팟</div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
