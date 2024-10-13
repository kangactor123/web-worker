self.onmessage = (event) => {
  let result;
  const { data } = event;

  setTimeout(() => {
    if (data) {
      result = data * Math.random();
    }
    result = Math.random();
    postMessage(result);
  }, 2000);
};
