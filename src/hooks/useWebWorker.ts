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

function useWebWorker<T>({ url, initialData }: Props<T>): Result<T> {
  const worker = useRef<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<T | null>(initialData ?? null);

  const sendMessage = useCallback((message?: string) => {
    if (worker.current) {
      setLoading(true);
      worker.current.postMessage(message);
    }
  }, []);

  useEffect(() => {
    worker.current = new Worker(new URL(url, import.meta.url));

    worker.current.onmessage = (event: MessageEvent<string>) => {
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

    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, [url]);

  return {
    message,
    loading,
    sendMessage,
  };
}

export default useWebWorker;
