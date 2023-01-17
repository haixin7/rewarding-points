const handleGetAllTransData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};
export default handleGetAllTransData;
