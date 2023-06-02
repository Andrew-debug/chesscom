import { forwardRef, useState } from "react";

const CustomSquareRenderer = forwardRef((props, ref) => {
  const { children, style } = props;
  const [clicked, setclicked] = useState(false);
  const [mouseDown, setmouseDown] = useState(false);
  const st = clicked
    ? {
        ...style,
        position: "relative",
        backgroundColor: "rgba(203, 5, 2, 0.5)",
      }
    : { ...style, position: "relative" };

  return (
    <div
      ref={ref}
      style={st}
      onContextMenu={() => {
        if (mouseDown) {
          setclicked(!clicked);
          setmouseDown(false);
        }
      }}
      onMouseDown={() => setmouseDown(true)}
      onMouseLeave={() => setmouseDown(false)}
    >
      {children}
    </div>
  );
});

export default CustomSquareRenderer;
