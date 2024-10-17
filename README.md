# Web Worker

## Tech

- Pnpm
- React, TypeScript, Vite

### Web Socket 서버 구동

- 해당 예제들은 node.js 환경의 간단한 웹 소켓과 함께 통신합니다.
- 웹 소켓 코드는 `server/server.js` 에서 확인 가능합니다.

```
cd server
pnpm install
node server.js
```

### Component

#### SharedWorkerExample.tsx

- SharedWorker에 WebSocket을 얹어서 사용하는 예제입니다

#### WebSocketExmaple.tsx

- Web Socket을 테스트한 컴포넌트 예제 입니다.

#### WorkerExample.tsx

- DedicatedWorker에 WebSocket을 얹어서 사용하는 예제입니다.

### Worker

```
src
ㄴworkers
  ㄴshared-worker.ts
  ㄴsocket-worker.ts
  ㄴworker-example.ts
```

#### shared-worker.ts

- WebSocket을 얹은 shared worker 스크립트 입니다.
- TypeScript와 함께 활용하기 위해 다음의 패키지를 설치해주세요.

```
pnpm add @types/sharedworker -D
```

- 메모리 누수를 방지하기 위해 WeakRef를 활용해 워커 커넥션을 관리합니다.
- WeafRef을 타입스크립트에서 사용하기 위해 tsconfig의 lib에 다음의 속성을 추가해주세요.

```
// ESNext를 추가합니다.
"lib": ["ESNext", ...],
```

#### socket-worker.ts

- WebSocket을 얹은 dedicated worker 스크립트 입니다.

#### worker-example.ts

- 단순히 dedicated worker을 사용하는 스크립트 입니다.
