/**
 * ZoomOverlay — 핫스팟 클릭 시 열리는 확대 오버레이.
 *
 * 왼쪽: 이미지의 해당 영역을 확대한 미리보기 (background-image + scale)
 * 오른쪽: 번호 · 제목 · 상세 설명 · 다음 버튼
 *
 * 키보드: Esc 닫기, Enter/→ 다음, ← 이전
 */

const { useEffect: useEffectZ, useRef: useRefZ, useState: useStateZ } = React;

function ZoomOverlay({ step, hsIdx, onClose, onGoto }){
  const hs = step.hotspots[hsIdx];
  const total = step.hotspots.length;
  const hasPrev = hsIdx > 0;
  const hasNext = hsIdx < total - 1;

  const zoomRef = useRefZ(null);
  const [imgReady, setImgReady] = useStateZ(false);

  // Preload image so zoom rendering has natural size
  useEffectZ(() => {
    const img = new Image();
    img.src = step.image;
    img.onload = () => setImgReady(true);
  }, [step.image]);

  useEffectZ(() => {
    function onKey(e){
      if(e.key === 'Escape'){ e.preventDefault(); onClose(); }
      else if(e.key === 'Enter' || e.key === 'ArrowRight'){
        e.preventDefault();
        if(hasNext) onGoto(hsIdx+1); else onClose();
      }
      else if(e.key === 'ArrowLeft'){
        e.preventDefault();
        if(hasPrev) onGoto(hsIdx-1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hsIdx, hasNext, hasPrev, onClose, onGoto]);

  // Zoom preview: render an <img> scaled up and offset so the hotspot lands
  // at the center of the preview container. This is more reliable than
  // background-position percentages (which have tricky % semantics).
  const pctToNum = (s) => parseFloat(String(s).replace('%',''));
  const hsLeft = pctToNum(hs.left);
  const hsTop = pctToNum(hs.top);
  const hsWidth = pctToNum(hs.width);
  const hsHeight = pctToNum(hs.height);
  const hsCenterXpct = hsLeft + hsWidth/2;   // % from left of image
  const hsCenterYpct = hsTop + hsHeight/2;   // % from top of image

  const previewW = 480, previewH = 300;
  const imageAspect = step.imageAspect || (1024/768);

  // 1) Base displayed image size at scale=1 (fit width of preview)
  const baseW = previewW;
  const baseH = previewW / imageAspect;

  // 2) Choose scale so hotspot area is ~55% of preview
  const targetFillPct = 0.55;
  const scaleX = Math.max(1.5, targetFillPct * 100 / Math.max(hsWidth, 6));
  const scaleY = Math.max(1.5, targetFillPct * 100 / Math.max(hsHeight, 3));
  const scale = Math.min(scaleX, scaleY, 8);

  // 3) Displayed image size
  const imgW = baseW * scale;
  const imgH = baseH * scale;

  // 4) Hotspot center in displayed image pixels
  const hsCenterX = (hsCenterXpct/100) * imgW;
  const hsCenterY = (hsCenterYpct/100) * imgH;

  // 5) Position image so hotspot center is at preview center
  const imgOffsetX = previewW/2 - hsCenterX;
  const imgOffsetY = previewH/2 - hsCenterY;

  // Hotspot rectangle within preview
  const hsDispW = (hsWidth/100) * imgW;
  const hsDispH = (hsHeight/100) * imgH;
  const hsRectLeft = previewW/2 - hsDispW/2;
  const hsRectTop = previewH/2 - hsDispH/2;

  return (
    <div className="zoom-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="zoom-card" onClick={e=>e.stopPropagation()}>
        {/* Close button */}
        <button className="zoom-close" onClick={onClose} aria-label="닫기">×</button>

        <div className="zoom-layout">
          {/* Left: zoom preview */}
          <div className="zoom-preview" style={{ width: previewW, height: previewH }}>
            {imgReady ? (
              <>
                <img
                  src={step.image}
                  alt=""
                  className="zoom-preview-img"
                  style={{
                    position: 'absolute',
                    width: imgW, height: imgH,
                    left: imgOffsetX, top: imgOffsetY,
                    maxWidth: 'none',
                  }}
                  draggable={false}
                />
                <div className="zoom-preview-rect"
                  style={{
                    left: hsRectLeft, top: hsRectTop,
                    width: hsDispW, height: hsDispH,
                  }}
                />
              </>
            ) : (
              <div className="zoom-preview-loading">이미지 로드 중…</div>
            )}
          </div>

          {/* Right: text */}
          <div className="zoom-body">
            <div className="zoom-eyebrow">
              <span className="zoom-eyebrow-num">{hs.num}</span>
              <span className="zoom-eyebrow-tag">{step.tag} · 핫스팟 {hsIdx+1} / {total}</span>
            </div>
            <h3 className="zoom-title">{hs.title}</h3>
            <div className="zoom-desc">{hs.body}</div>

            {/* Dots indicator */}
            <div className="zoom-dots">
              {step.hotspots.map((_, i) => (
                <button
                  key={i}
                  className={['zoom-dot', i === hsIdx && 'active'].filter(Boolean).join(' ')}
                  onClick={() => onGoto(i)}
                  aria-label={`핫스팟 ${i+1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="zoom-actions">
          <span className="zoom-hint">
            <span className="kbd">Esc</span> 닫기
            <span className="hint-sep">·</span>
            <span className="kbd">←</span><span className="kbd">→</span> 이동
            <span className="hint-sep">·</span>
            <span className="kbd">Enter</span> 다음
          </span>
          <div className="zoom-btns">
            <button className="zoom-btn secondary" onClick={() => hasPrev && onGoto(hsIdx-1)} disabled={!hasPrev}>
              ← 이전
            </button>
            <button className="zoom-btn" onClick={() => hasNext ? onGoto(hsIdx+1) : onClose()}>
              {hasNext ? '다음 →' : '닫기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ZoomOverlay = ZoomOverlay;
