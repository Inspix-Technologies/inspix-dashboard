import preprocessBoundingBox from "./bbox-offset-creator";
// import preprocessBoundingBox from "./bbox-preprocessor";

const colorMap = {
  0: "#fff719",
  1: "#0bde00",
  2: "#ff1717",
};

const drawBoundingBox = (imgRef, canvasRef, predictions) => {
  const ctx = canvasRef.current.getContext("2d");
  ctx.clearRect(0, 0, 2000, 2000);

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  canvasRef.current.width = imgRef.current.width;
  canvasRef.current.height = imgRef.current.height;
  predictions.map((detection) => {
    if (detection["confidence"] < 0.5) return;

    const {xmin, ymin, xmax, ymax} = detection;
    const yminRelative = ymin / imgRef.current.naturalHeight;
    const xminRelative = xmin / imgRef.current.naturalWidth;
    const ymaxRelative = ymax / imgRef.current.naturalHeight;
    const xmaxRelative = xmax / imgRef.current.naturalWidth;

    const {x, y, width, height} = preprocessBoundingBox(
      [yminRelative, xminRelative, ymaxRelative, xmaxRelative],
      imgRef
    );

    // console.log(yminRelative, xminRelative, ymaxRelative, xmaxRelative);

    const color = colorMap[detection["class"]];
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = color;
    const textWidth = ctx.measureText(
      detection["name"] + " " + (100 * detection["confidence"]).toFixed(2) + "%"
    ).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    ctx.fillStyle = "#fff";
    ctx.fillText(
      detection["name"] +
        " " +
        (100 * detection["confidence"]).toFixed(2) +
        "%",
      x,
      y + 10
    );
  });
};

export default drawBoundingBox;
