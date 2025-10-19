import { useEffect, useMemo, useRef } from 'react';

type Props = {
  src: string;
  size?: number;
  pixelSize?: number;
  borderPixels?: number;
  borderColor?: string;
  backgroundColor?: string;
  alt?: string;
};

export default function PixelAvatar({
  src,
  size = 160,
  pixelSize = 6,
  borderPixels = 2,
  borderColor = '#000',
  backgroundColor,
  alt = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dpr =
    typeof window !== 'undefined' ? Math.max(1, Math.min(2, window.devicePixelRatio || 1)) : 1;
  const logical = useMemo(() => {
    const s = Math.max(size, pixelSize * 8); // 최소 안전값
    const grid = pixelSize;
    const cols = Math.floor(s / grid);
    const snapSize = cols * grid; // 픽셀 그리드에 딱 맞추기
    return { s: snapSize, grid };
  }, [size, pixelSize]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const { s, grid } = logical;

    // 캔버스 해상도 세팅
    canvas.width = s * dpr;
    canvas.height = s * dpr;
    canvas.style.width = `${s}px`;
    canvas.style.height = `${s}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, s, s);

    const cx = s / 2;
    const cy = s / 2;

    // 원 반지름: 테두리가 안쪽으로 들어오도록 여유
    const outerR = Math.floor((s / 2 - grid) / grid) * grid;
    const innerR = outerR - borderPixels * grid;

    // 픽셀(정사각) 중심 좌표를 그리드에 스냅해서 도트 테두리 생성
    // 행(y)을 한 줄씩 훑으며, 원의 경계 x를 계산해 블록을 채웁니다.
    ctx.fillStyle = borderColor;

    for (let y = -outerR; y <= outerR; y += grid) {
      // 해당 y에서의 원의 경계 x (원의 방정식 x = sqrt(r^2 - y^2))
      const absY = Math.abs(y);
      const outerX =
        Math.floor(Math.sqrt(Math.max(0, outerR * outerR - absY * absY)) / grid) * grid;
      const innerX =
        Math.floor(Math.sqrt(Math.max(0, innerR * innerR - absY * absY)) / grid) * grid;

      // [innerX, outerX] 사이가 테두리 구간
      for (let x = innerX + grid; x <= outerX; x += grid) {
        // 좌우 대칭으로 두 개 찍기
        // 오른쪽
        ctx.fillRect(cx + x - grid / 2, cy + y - grid / 2, grid, grid);
        // 왼쪽
        ctx.fillRect(cx - x - grid / 2, cy + y - grid / 2, grid, grid);
      }
    }
  }, [logical, borderPixels, borderColor, dpr]);

  return (
    <div
      style={{
        position: 'relative',
        width: logical.s,
        height: logical.s,
        display: 'inline-block',
        imageRendering: 'pixelated', // 픽셀 맛 살리기
      }}
    >
      {/* 배경색(옵션) */}
      {backgroundColor && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: backgroundColor,
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          imageRendering: 'pixelated',
        }}
      />

      {/* 픽셀 테두리 오버레이 */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
