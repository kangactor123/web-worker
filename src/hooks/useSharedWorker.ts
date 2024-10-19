import { useCallback, useEffect, useRef, useState } from "react";

type Props<T> = {
  url: string;
  initialData?: T;
};

type Result<T> = {
  message: T | null;
  loading: boolean;
  sendMessage: (message?: string) => void;
};

function useSharedWorker<T>({ url, initialData }: Props<T>): Result<T> {
  const worker = useRef<SharedWorker | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<T | null>(initialData ?? null);

  const sendMessage = useCallback((message?: string) => {
    if (worker.current) {
      setLoading(true);
      worker.current.port.postMessage(message);
    }
  }, []);

  useEffect(() => {
    worker.current = new SharedWorker(new URL(url, import.meta.url));

    worker.current.port.onmessage = (event: MessageEvent<string>) => {
      let messageData = null;
      const { data } = event;

      try {
        messageData = JSON.parse(data);
      } catch {
        messageData = data;
      }

      setLoading(false);
      setMessage(messageData);
    };

    if (worker.current) {
      worker.current.port.start();
    }

    return () => {
      if (worker.current) {
        worker.current.port.close();
      }
    };
  }, [url]);

  return {
    message,
    loading,
    sendMessage,
  };
}

export default useSharedWorker;
