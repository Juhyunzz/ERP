/**
 * Hotspot — 이미지 위에 배치되는 클릭 가능한 번호 마커.
 * 마커 = 번호 뱃지, 좌표는 이미지 영역 대비 %.
 * 클릭 시 상위 컴포넌트로 이벤트 전달.
 */

function Hotspot({ hs, done, isNext, onClick }){
  // 마커 배치 방향 결정
  // - hotspot이 이미지 왼쪽에서 5% 이내면: 마커를 오른쪽에 (marker-right)
  // - hotspot이 매우 넓거나(>60%) 세로로 얇으면 위에 (marker-top)
  // - 기본: 왼쪽에
  const leftPct = parseFloat(String(hs.left).replace('%',''));
  const widthPct = parseFloat(String(hs.width).replace('%',''));
  let markerPos = '';
  if(widthPct >= 60){
    markerPos = 'marker-top';
  } else if(leftPct < 5){
    markerPos = 'marker-right';
  }

  const cls = ['hotspot', markerPos, done && 'is-done', isNext && !done && 'is-next'].filter(Boolean).join(' ');
  return (
    <button
      className={cls}
      style={{
        position:'absolute',
        top: hs.top, left: hs.left, width: hs.width, height: hs.height,
      }}
      onClick={onClick}
      aria-label={`핫스팟 ${hs.num}: ${hs.title}`}
    >
      <span className="hotspot-area"/>
      <span className="hotspot-marker">
        <span className="hotspot-marker-num">{hs.num}</span>
      </span>
    </button>
  );
}

window.Hotspot = Hotspot;
