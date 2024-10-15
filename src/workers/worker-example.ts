type MessageData = {
  type: string;
};

self.onmessage = (event: MessageEvent<string>) => {
  const { data } = event;

  const response = JSON.parse(data);

  setTimeout(() => {
    if (typeof response === "object") {
      const obj: MessageData = {
        type: `${response?.type} - ${Math.floor(Math.random() * 100)}`,
      };

      postMessage(JSON.stringify(obj));
    }
  }, 1500);
};
