export const convertToBase64 = (imageRef) => {
  const canvas = document.createElement("canvas");
  canvas.width = imageRef.current.width;
  canvas.height = imageRef.current.height;
  canvas.getContext("2d").drawImage(imageRef.current, 0, 0);
  const data = canvas.toDataURL("image/png");
  return data;
};

export default {
  convertToBase64: convertToBase64,
};
