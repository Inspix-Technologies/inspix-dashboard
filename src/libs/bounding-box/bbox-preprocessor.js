const preprocessBoundingBox = ([ymin, xmin, ymax, xmax]) => {
  const width = xmax - xmin;
  const height = ymax - ymin;
  const x = xmin;
  const y = ymin;
  return {width, height, x, y};
};

export default preprocessBoundingBox;
