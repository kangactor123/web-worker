import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  url: string;
};

type Result<T> = {
  message: T | null;
  loading: boolean;
  sendMessage: (message?: T) => void;
};

function useWebWorker<T>({ url }: Props): Result<T> {
  const worker = useRef<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<T | null>(null);

  const sendMessage = useCallback((message?: T) => {
    if (worker.current) {
      setLoading(true);
      worker.current.postMessage(message);
    }
  }, []);

  useEffect(() => {
    worker.current = new Worker(new URL(url, import.meta.url));

    worker.current.onmessage = (event: MessageEvent<T>) => {
      setLoading(false);
      setMessage(event.data);
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
