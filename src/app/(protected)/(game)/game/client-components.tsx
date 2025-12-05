'use client';

import * as BABYLON from '@babylonjs/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import '@babylonjs/loaders';
import { useRouter } from 'next/navigation';
import { useSocket } from '~/socket';

interface ClientComponentsProps {
  server: string;
  tid: string;
  mid: string;
  playerType: 'player1' | 'player2';
}

interface GameState {
  player1Score: number;
  player2Score: number;
  statusMessage: string | null;
  countdown: number | string | null;
  winner: { name: string; id: string | number } | null;
  isConnected: boolean;
}

export const ClientComponents = ({ server, tid: _tid, mid, playerType }: ClientComponentsProps) => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    player1Score: 0,
    player2Score: 0,
    statusMessage: null,
    countdown: null,
    winner: null,
    isConnected: false,
  });

  const matchSocket = useSocket({
    path: '/ws/match-game',
    namespace: '',
    query: { server, matchId: mid },
    withAuth: true,
    forceNew: true,
  });
  const { socket, on } = matchSocket;

  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showStatusMessage = useCallback((message: string, duration = 3000) => {
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    setGameState(prev => ({ ...prev, statusMessage: message }));
    if (duration > 0) {
      statusTimeoutRef.current = setTimeout(() => {
        setGameState(prev => ({ ...prev, statusMessage: null }));
      }, duration);
    }
  }, []);

  const socketRef = useRef(matchSocket);
  const cameraTargetRadiusRef = useRef(3.2);
  const ballTargetRef = useRef<BABYLON.Vector3 | null>(null);
  const r1TargetRef = useRef<BABYLON.Vector3 | null>(null);
  const r2TargetRef = useRef<BABYLON.Vector3 | null>(null);

  useEffect(() => {
    socketRef.current = matchSocket;
  }, [matchSocket]);

  useEffect(() => {
    if (!canvasRef.current || !socket) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    const identityMatrix = BABYLON.Matrix.Identity();
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const isPlayer2 = playerType === 'player2';
    const cameraAlpha = isPlayer2 ? Math.PI : Math.PI * 2;
    const cameraBeta = Math.PI / 2.5;
    const cameraRadius = 3.2;
    const cameraTarget = new BABYLON.Vector3(0, 0.76, 0);

    const camera = new BABYLON.ArcRotateCamera(
      'camera1',
      cameraAlpha,
      cameraBeta,
      cameraRadius,
      cameraTarget,
      scene,
    );

    camera.attachControl(canvasRef.current, false);
    camera.inputs.clear();

    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    const table = BABYLON.MeshBuilder.CreateBox(
      'table',
      { width: 3, height: 0.03, depth: 1.5 },
      scene,
    );
    table.position.y = 0.76;

    const texSize = { width: 1024, height: 512 };
    const dynamicTex = new BABYLON.DynamicTexture('dynamicTexture', texSize, scene, false);
    const ctx = dynamicTex.getContext();

    ctx.fillStyle = '#00AA33';
    ctx.fillRect(0, 0, texSize.width, texSize.height);

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 8;

    ctx.beginPath();
    ctx.moveTo(0, texSize.height / 2);
    ctx.lineTo(texSize.width, texSize.height / 2);
    ctx.stroke();

    ctx.lineWidth = 12;
    ctx.strokeRect(0, 0, texSize.width, texSize.height);
    dynamicTex.update();

    const mat = new BABYLON.StandardMaterial('tableMat', scene);
    mat.diffuseTexture = dynamicTex;
    mat.specularColor = new BABYLON.Color3(0, 0, 0);
    table.material = mat;

    const ballMesh = BABYLON.MeshBuilder.CreateSphere('ball', { diameter: 0.1 }, scene);
    ballMesh.material = new BABYLON.StandardMaterial('ballMat', scene);
    (ballMesh.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(1, 0.8, 0.2);

    const racket1 = BABYLON.MeshBuilder.CreateBox(
      'r1',
      { width: 0.05, height: 0.3, depth: 0.3 },
      scene,
    );
    const racket2 = BABYLON.MeshBuilder.CreateBox(
      'r2',
      { width: 0.05, height: 0.3, depth: 0.3 },
      scene,
    );

    const racketMat1 = new BABYLON.StandardMaterial('racketMat1', scene);
    racketMat1.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);

    const racketMat2 = new BABYLON.StandardMaterial('racketMat2', scene);
    racketMat2.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);

    racket1.material = racketMat1;
    racket2.material = racketMat2;

    const racketPlaneY = 0.9;
    racket1.position.y = racketPlaneY;
    racket2.position.y = racketPlaneY;

    racket1.position.x = 1.35;
    racket1.position.z = 0;

    racket2.position.x = -1.35;
    racket2.position.z = 0;

    r2TargetRef.current = racket2.position.clone();

    const plane = new BABYLON.Plane(0, 1, 0, -racketPlaneY);
    const ray = new BABYLON.Ray(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());

    scene.onBeforeRenderObservable.add(() => {
      if (!scene.activeCamera) return;

      scene.createPickingRayToRef(
        scene.pointerX,
        scene.pointerY,
        identityMatrix,
        ray,
        scene.activeCamera,
      );
      const distance = ray.intersectsPlane(plane);

      if (distance !== null) {
        const hitPoint = ray.origin.add(ray.direction.scale(distance));
        socketRef.current.emit('match-racket-update', {
          x: hitPoint.x,
          y: hitPoint.y,
          z: hitPoint.z,
        });
      }
    });

    engine.runRenderLoop(() => {
      if (camera) {
        camera.radius = BABYLON.Scalar.Lerp(camera.radius, cameraTargetRadiusRef.current, 0.1);
      }

      if (ballTargetRef.current) {
        ballMesh.position = BABYLON.Vector3.Lerp(ballMesh.position, ballTargetRef.current, 0.3);
      }
      if (r1TargetRef.current) {
        racket1.position = BABYLON.Vector3.Lerp(racket1.position, r1TargetRef.current, 0.3);
      }
      if (r2TargetRef.current) {
        racket2.position = BABYLON.Vector3.Lerp(racket2.position, r2TargetRef.current, 0.3);
      }

      scene.render();
    });

    const handleResize = () => engine.resize();
    window.addEventListener('resize', handleResize);

    const unsubs: (() => void)[] = [];

    if (!socket) return;

    unsubs.push(
      on('connect', () => {
        showStatusMessage('서버에 연결되었습니다.');
        setGameState(prev => ({ ...prev, isConnected: true }));
      }),
    );

    unsubs.push(
      on('player-connected', data => {
        showStatusMessage(`Player ${data.playerId}님이 접속했습니다.`);
      }),
    );

    unsubs.push(
      on('waiting-for-player', data => {
        const { waitingForPlayerId, currentWaitingTimeInSeconds, timeoutInSeconds } = data;
        if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
        setGameState(prev => ({
          ...prev,
          statusMessage: `Player ${waitingForPlayerId}님을 기다리는 중… (${currentWaitingTimeInSeconds}s / ${timeoutInSeconds}s)`,
        }));
      }),
    );

    unsubs.push(
      on('match-timeout', data => {
        showStatusMessage(
          `매치 타임아웃: ${data.reason} (대기 ${data.waitingTimeInSeconds}s)`,
          5000,
        );
      }),
    );

    unsubs.push(
      on('countdown-cancelled', () => {
        setGameState(prev => ({ ...prev, countdown: null }));
        showStatusMessage('카운트다운이 취소되었습니다.');
      }),
    );

    unsubs.push(
      on('game-start', () => {
        showStatusMessage('게임이 시작되었습니다!');
      }),
    );

    unsubs.push(
      on('game-state-update', data => {
        const { ball, racket1: r1, racket2: r2 } = data;

        ballTargetRef.current = new BABYLON.Vector3(ball.x, ball.y, ball.z);
        r1TargetRef.current = new BABYLON.Vector3(r1.x, r1.y, r1.z);
        r2TargetRef.current = new BABYLON.Vector3(r2.x, r2.y, r2.z);

        const { x } = ball;
        const minRadius = 2.8;
        const baseRadius = 3.2;
        const maxRadius = 4.5;
        const limitX = 0.75;

        let newRadius: number;
        const isPlayer2 = playerType === 'player2';

        // Symmetric logic:
        // If Ball is CLOSE to player -> Zoom OUT (radius gets larger)
        // If Ball is FAR from player -> Zoom IN (radius gets smaller)

        if (isPlayer2) {
          // Player 2 is at -X side.
          // Ball x < 0 is Close. Ball x > 0 is Far.
          if (x > 0) {
            // Far
            const d = Math.min(x, limitX);
            newRadius = baseRadius - (d / limitX) * (baseRadius - minRadius);
          } else {
            // Close
            const d = Math.min(Math.abs(x), limitX);
            newRadius = baseRadius + (d / limitX) * 2.0;
          }
        } else {
          // Player 1 is at +X side.
          // Ball x > 0 is Close. Ball x < 0 is Far.
          if (x < 0) {
            // Far
            const d = Math.min(Math.abs(x), limitX);
            newRadius = baseRadius - (d / limitX) * (baseRadius - minRadius);
          } else {
            // Close
            const d = Math.min(x, limitX);
            newRadius = baseRadius + (d / limitX) * 2.0;
          }
        }
        // Update the TARGET radius, not the actual radius (interpolate in render loop)
        cameraTargetRadiusRef.current = Math.min(Math.max(minRadius, newRadius), maxRadius);
      }),
    );

    unsubs.push(
      on('game-end', data => {
        const { winner, winnerId } = data;
        const winnerText = winner === 'PLAYER1' ? '플레이어 1' : '플레이어 2';
        showStatusMessage(`${winnerText}님이 승리했습니다! 🎉`, 5000);

        setGameState(prev => ({
          ...prev,
          winner: { name: winnerText, id: winnerId },
        }));

        setTimeout(() => {
          router.push('/');
        }, 5000);
      }),
    );

    unsubs.push(
      on('disconnect', () => {
        showStatusMessage('게임에서 나갑니다...', 2000);
      }),
    );

    unsubs.push(
      on('game-countdown', data => {
        const { count } = data;
        const text = count > 0 ? count : 'SERVE!';
        setGameState(prev => ({ ...prev, countdown: text }));
        if (count === 0) {
          setTimeout(() => {
            setGameState(prev => ({ ...prev, countdown: null }));
          }, 1000);
        }
      }),
    );

    unsubs.push(
      on('match-score', data => {
        const { player1Score, player2Score } = data;
        setGameState(prev => ({ ...prev, player1Score, player2Score }));
      }),
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
      unsubs.forEach(unsub => {
        unsub();
      });
    };
  }, [socket, on, playerType, showStatusMessage, router]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#333]">
      <canvas
        ref={canvasRef}
        className="touch-action-none block h-[600px] w-[800px] focus:outline-none"
      />

      {gameState.statusMessage && (
        <div className="-translate-x-1/2 absolute top-[15%] left-1/2 z-10 whitespace-nowrap rounded-full bg-black/50 px-6 py-2.5 text-white text-xl opacity-100 transition-opacity">
          {gameState.statusMessage}
        </div>
      )}

      {gameState.countdown !== null && (
        <div
          key={gameState.countdown}
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 z-10 font-bold text-[150px] text-transparent"
          style={{ WebkitTextStroke: '3px white' }}
        >
          {gameState.countdown}
        </div>
      )}

      <div className="pointer-events-none absolute top-5 right-5 left-5 z-10 font-bold">
        <div className="absolute left-0 flex flex-col items-center bg-neutral-900 px-5 py-2.5">
          <span className="text-base text-gray-300">PLAYER 1</span>
          <span className="mt-1 text-5xl text-[#ff6b6b] leading-none">
            {gameState.player1Score}
          </span>
        </div>

        <div className="absolute right-0 flex flex-col items-center bg-neutral-900 px-5 py-2.5">
          <span className="text-base text-gray-300">PLAYER 2</span>
          <span className="mt-1 text-5xl text-[#6b6bff] leading-none">
            {gameState.player2Score}
          </span>
        </div>
      </div>

      {gameState.winner && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <h1 className="m-0 font-bold text-[#ffd700] text-[72px]">
            {gameState.winner.name} WINS!
          </h1>
          <p className="mt-5 text-2xl text-white tracking-widest opacity-0">
            잠시 후 메인 화면으로 이동합니다.
          </p>
        </div>
      )}
    </div>
  );
};
