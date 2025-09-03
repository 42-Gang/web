/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ArcRotateCamera,
  Color3,
  DynamicTexture,
  Engine,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  Plane,
  Ray,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useSocket } from '@/api/socket';

import * as styles from './styles.css';

type ScoreState = { player1: number; player2: number };

export const GamePage = () => {
  const [searchParams] = useSearchParams();

  const serverName = searchParams.get('serverName');
  const matchId = searchParams.get('matchId');
  const playerType = (searchParams.get('playerType') || 'player1').toLowerCase();

  const isPlayer2 = useMemo(() => playerType === 'player2', [playerType]);

  const { socket, connect, disconnect } = useSocket({
    path: `?matchId=${matchId}&server=${serverName}`,
    handshake: '/ws/match-game',
    withToken: true,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const ballRef = useRef<import('@babylonjs/core').Mesh | null>(null);
  const racket1Ref = useRef<import('@babylonjs/core').Mesh | null>(null);
  const racket2Ref = useRef<import('@babylonjs/core').Mesh | null>(null);
  const pointerPlaneRef = useRef<Plane | null>(null);
  const rayRef = useRef<Ray | null>(null);

  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [countdownText, setCountdownText] = useState<string>('');
  const [countdownKey, setCountdownKey] = useState<number>(0);

  const [scores, setScores] = useState<ScoreState>({ player1: 0, player2: 0 });

  const [winnerText, setWinnerText] = useState<string>('');
  const [showWinnerOverlay, setShowWinnerOverlay] = useState<boolean>(false);

  useEffect(() => {
    if (!matchId || !serverName) return;
    connect();
    return () => disconnect();
  }, [connect, disconnect, matchId, serverName]);

  const showStatus = useCallback((message: string, durationMs: number | null = 3000) => {
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }
    setStatusMessage(message);
    setStatusVisible(true);
    if (durationMs !== null) {
      statusTimeoutRef.current = setTimeout(() => {
        setStatusVisible(false);
      }, durationMs);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    engineRef.current = engine;
    sceneRef.current = scene;

    const cameraAlpha = isPlayer2 ? Math.PI : Math.PI * 2;
    const cameraBeta = Math.PI / 2.5;
    const cameraRadius = 3.2;
    const cameraTargetY = 0.76;
    const camera = new ArcRotateCamera(
      'cam',
      cameraAlpha,
      cameraBeta,
      cameraRadius,
      new Vector3(0, cameraTargetY, 0),
      scene,
    );
    camera.attachControl(canvas, false);
    camera.inputs.clear();
    cameraRef.current = camera;

    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    const table = MeshBuilder.CreateBox('table', { width: 3, height: 0.03, depth: 1.5 }, scene);
    table.position.y = cameraTargetY;
    const texSize = { width: 1024, height: 512 } as const;
    const dynamicTex = new DynamicTexture('tableTex', texSize, scene, false);
    const ctx = dynamicTex.getContext();
    ctx.fillStyle = '#0A3';
    ctx.fillRect(0, 0, texSize.width, texSize.height);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, texSize.height / 2);
    ctx.lineTo(texSize.width, texSize.height / 2);
    ctx.stroke();
    ctx.lineWidth = 12;
    ctx.strokeRect(0, 0, texSize.width, texSize.height);
    dynamicTex.update();
    const tableMat = new StandardMaterial('tableMat', scene);
    tableMat.diffuseTexture = dynamicTex;
    tableMat.specularColor = new Color3(0, 0, 0);
    table.material = tableMat;

    const ballMesh = MeshBuilder.CreateSphere('ball', { diameter: 0.1 }, scene);
    const ballMat = new StandardMaterial('ballMat', scene);
    ballMat.diffuseColor = new Color3(1, 0.8, 0.2);
    ballMesh.material = ballMat;
    ballRef.current = ballMesh;

    const racketPlaneY = 0.9;
    const racketMat1 = new StandardMaterial('racketMat1', scene);
    racketMat1.diffuseColor = new Color3(0.8, 0.2, 0.2);
    const racketMat2 = new StandardMaterial('racketMat2', scene);
    racketMat2.diffuseColor = new Color3(0.2, 0.2, 0.8);
    const racket1 = MeshBuilder.CreateBox('r1', { width: 0.05, height: 0.3, depth: 0.3 }, scene);
    const racket2 = MeshBuilder.CreateBox('r2', { width: 0.05, height: 0.3, depth: 0.3 }, scene);
    racket1.material = racketMat1;
    racket2.material = racketMat2;
    racket1.position.y = racketPlaneY;
    racket2.position.y = racketPlaneY;
    racket1Ref.current = racket1;
    racket2Ref.current = racket2;

    pointerPlaneRef.current = new Plane(0, 1, 0, -racketPlaneY);
    rayRef.current = Ray.Zero();

    scene.onBeforeRenderObservable.add(() => {
      if (!rayRef.current || !pointerPlaneRef.current) return;
      scene.createPickingRayToRef(
        scene.pointerX,
        scene.pointerY,
        Matrix.Identity(),
        rayRef.current,
        camera,
      );
      const distance = rayRef.current.intersectsPlane(pointerPlaneRef.current);
      if (distance !== null) {
        const hitPoint = rayRef.current.origin.add(rayRef.current.direction.scale(distance));
        if (socket) {
          socket.emit('match-racket-update', {
            x: hitPoint.x,
            y: hitPoint.y,
            z: hitPoint.z,
          } as unknown as any);
        }
      }
    });

    canvas.addEventListener('click', () => {
      canvas.requestPointerLock();
    });

    ['pointerdown', 'pointerup', 'click', 'dblclick'].forEach((evtName) => {
      canvas.addEventListener(
        evtName,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        { capture: true },
      );
    });

    engine.runRenderLoop(() => scene.render());
    const handleResize = () => engine.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
      engineRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      ballRef.current = null;
      racket1Ref.current = null;
      racket2Ref.current = null;
      pointerPlaneRef.current = null;
      rayRef.current = null;
    };
  }, [socket, isPlayer2]);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      showStatus('서버에 연결되었습니다.');
    };
    const handlePlayerConnected = ({ playerId }: { playerId: number | string }) => {
      toast.message(`플레이어 ${playerId}님이 접속했습니다.`);
      showStatus(`Player ${playerId}님이 접속했습니다.`);
    };
    const handleWaitingForPlayer = ({
      waitingForPlayerId,
      currentWaitingTimeInSeconds,
      timeoutInSeconds,
    }: {
      waitingForPlayerId: string | number;
      currentWaitingTimeInSeconds: number;
      timeoutInSeconds: number;
    }) => {
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
      setStatusMessage(
        `Player ${waitingForPlayerId}님을 기다리는 중… (${currentWaitingTimeInSeconds}s / ${timeoutInSeconds}s)`,
      );
      setStatusVisible(true);
    };

    const handleMatchTimeout = ({
      reason,
      waitingTimeInSeconds,
    }: {
      reason: string;
      waitingTimeInSeconds: number;
    }) => {
      showStatus(`매치 타임아웃: ${reason} (대기 ${waitingTimeInSeconds}s)`, 5000);
    };

    const handleCountdownCancelled = () => {
      setCountdownText('');
      setCountdownKey((k) => k + 1);
      showStatus('카운트다운이 취소되었습니다.');
    };

    const handleGameStart = () => {
      showStatus('게임이 시작되었습니다!');
    };

    const handleGameStateUpdate = ({
      ball,
      racket1,
      racket2,
    }: {
      ball: { x: number; y: number; z: number };
      racket1: { x: number; y: number; z: number };
      racket2: { x: number; y: number; z: number };
    }) => {
      if (ballRef.current) ballRef.current.position.set(ball.x, ball.y, ball.z);
      if (racket1Ref.current) racket1Ref.current.position.set(racket1.x, racket1.y, racket1.z);
      if (racket2Ref.current) racket2Ref.current.position.set(racket2.x, racket2.y, racket2.z);

      const cam = cameraRef.current;
      const x = ball?.x ?? 0;
      if (cam) {
        const minRadius = 2.8;
        const baseRadius = 3.2;
        const maxRadius = 4.5;
        const limitX = 0.75;

        let newRadius: number;
        if (isPlayer2) {
          if (x > 0) {
            const d = Math.min(x, limitX);
            newRadius = baseRadius - (d / limitX) * (baseRadius - minRadius);
          } else {
            const d = Math.min(Math.abs(x), limitX);
            newRadius = baseRadius + (d / limitX) * 2.0;
          }
        } else {
          if (x < 0) {
            const d = Math.min(Math.abs(x), limitX);
            newRadius = baseRadius - (d / limitX) * (baseRadius - minRadius);
          } else {
            const d = Math.min(x, limitX);
            newRadius = baseRadius + (d / limitX) * 2.0;
          }
        }
        cam.radius = Math.min(Math.max(minRadius, newRadius), maxRadius);
      }
    };

    const handleGameEnd = ({
      winner,
    }: {
      winner: 'PLAYER1' | 'PLAYER2';
      winnerId?: string | number;
    }) => {
      const text = winner === 'PLAYER1' ? '플레이어 1' : '플레이어 2';
      showStatus(`${text}님이 승리했습니다! 🎉`, 5000);
      setWinnerText(`${text} WINS!`);
      setShowWinnerOverlay(true);
    };

    const handleDisconnect = () => {
      const dotPattern = [3, 2, 1, 2, 3];
      let step = 0;
      const id = setInterval(() => {
        const dots = '.'.repeat(dotPattern[step]);
        showStatus(`게임에서 나갑니다 ${dots}`, 400);
        step += 1;
        if (step >= dotPattern.length) clearInterval(id);
      }, 500);
    };

    const handleCountdown = ({ count }: { count: number }) => {
      const text = count > 0 ? String(count) : 'SERVE!';
      setCountdownText(text);
      setCountdownKey((k) => k + 1);
    };
    const handleMatchScore = ({
      player1Score,
      player2Score,
    }: {
      player1Score: number;
      player2Score: number;
    }) => {
      setScores({ player1: player1Score, player2: player2Score });
    };

    socket.on('connect', handleConnect);
    socket.on('player-connected', handlePlayerConnected as unknown as any);
    socket.on('waiting-for-player', handleWaitingForPlayer as unknown as any);
    socket.on('match-timeout', handleMatchTimeout as unknown as any);
    socket.on('countdown-cancelled', handleCountdownCancelled as unknown as any);
    socket.on('game-start', handleGameStart as unknown as any);
    socket.on('game-state-update', handleGameStateUpdate as unknown as any);
    socket.on('game-end', handleGameEnd as unknown as any);
    socket.on('disconnect', handleDisconnect as unknown as any);
    socket.on('game-countdown', handleCountdown as unknown as any);
    socket.on('match-score', handleMatchScore as unknown as any);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('player-connected', handlePlayerConnected as unknown as any);
      socket.off('waiting-for-player', handleWaitingForPlayer as unknown as any);
      socket.off('match-timeout', handleMatchTimeout as unknown as any);
      socket.off('countdown-cancelled', handleCountdownCancelled as unknown as any);
      socket.off('game-start', handleGameStart as unknown as any);
      socket.off('game-state-update', handleGameStateUpdate as unknown as any);
      socket.off('game-end', handleGameEnd as unknown as any);
      socket.off('disconnect', handleDisconnect as unknown as any);
      socket.off('game-countdown', handleCountdown as unknown as any);
      socket.off('match-score', handleMatchScore as unknown as any);
    };
  }, [socket, showStatus, isPlayer2]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.overlayBase} ${styles.status} ${statusVisible ? styles.statusVisible : ''}`}
      >
        {statusMessage}
      </div>

      <div
        key={countdownKey}
        className={`${styles.overlayBase} ${styles.countdown} ${countdownText ? styles.countdownVisible : ''}`}
      >
        {countdownText}
      </div>

      <div className={styles.scoreOverlay}>
        <div className={`${styles.scoreBoxBase} ${styles.scoreBoxLeft}`}>
          <span className={styles.scoreLabel}>PLAYER 1</span>
          <span className={`${styles.scoreValue} ${styles.scoreValuePlayer1}`}>
            {scores.player1}
          </span>
        </div>
        <div className={`${styles.scoreBoxBase} ${styles.scoreBoxRight}`}>
          <span className={styles.scoreLabel}>PLAYER 2</span>
          <span className={`${styles.scoreValue} ${styles.scoreValuePlayer2}`}>
            {scores.player2}
          </span>
        </div>
      </div>

      <canvas ref={canvasRef} width={800} height={600} className={styles.canvas} />

      <div
        className={`${styles.winnerOverlay} ${showWinnerOverlay ? styles.winnerOverlayVisible : ''}`}
      >
        <h1 className={styles.winnerText}>{winnerText}</h1>
        <p className={styles.winnerSubText}>잠시 후 메인 화면으로 이동합니다.</p>
      </div>
    </div>
  );
};
