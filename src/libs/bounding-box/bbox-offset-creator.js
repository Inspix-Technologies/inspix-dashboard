const preprocessBoundingBox = (bbox, imgRef) => {
  const minY = bbox[0] * imgRef.current.offsetHeight;
  const minX = bbox[1] * imgRef.current.offsetWidth;
  const maxY = bbox[2] * imgRef.current.offsetHeight;
  const maxX = bbox[3] * imgRef.current.offsetWidth;
  console.log({
    1: [minY, minX, maxY, maxX],
    2: bbox,
  });
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

export default preprocessBoundingBox;
