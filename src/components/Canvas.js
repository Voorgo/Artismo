import { useEffect, useRef } from "react";

const Canvas = ({ color }) => {
  const c = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    console.log(color);
    if (firstRender.current) {
      const canvas = c.current;
      const ctx = canvas.getContext("2d");

      const maxLevel = Math.floor(Math.random() * 2 + 3);
      const branches = Math.floor(Math.random() * 2 + 2);
      const sides = Math.floor(Math.random() * 14 + 3);
      const spread = Math.random() * 0.4 + 0.55;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      const angle = Math.PI * 2 * spread;
      function drawLine(level, color) {
        if (level > maxLevel) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(50, 0);
        ctx.stroke();

        for (let i = 1; i < branches + 1; i++) {
          ctx.save();
          ctx.translate((150 * i) / (branches + 1), 0);
          ctx.scale(0.5, 0.5);
          ctx.save();

          ctx.rotate(angle);
          drawLine(level + 1);
          ctx.restore();
          ctx.save();
          ctx.rotate(-angle);
          drawLine(level + 1);
          ctx.restore();
          ctx.restore();
        }
      }
      const Randomcolor = `rgb(${Math.random() * 255 + 1},${
        Math.random() * 255
      },${Math.random() * 255})`;

      for (let i = 0; i < sides; i++) {
        drawLine(0, color || Randomcolor);
        ctx.rotate((Math.PI * 2) / sides);
      }

      firstRender.current = false;
    }
  }, [color]);
  return (
    <canvas
      ref={c}
      width="418"
      height="418"
      className="w-full bg-black"
    ></canvas>
  );
};

export default Canvas;