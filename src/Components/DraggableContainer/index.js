import React,{useRef} from "react";
import Draggable from "react-draggable";
import DragIndicatorRoundedIcon from "@material-ui/icons/DragIndicatorRounded";
import screenfull from "screenfull"
export default function DragabbleContainer({ children }) {
  const PlayerContainerRef  = useRef(null);
  const toggleFullScreen = () => {
    screenfull.toggle(PlayerContainerRef.current);
  }
  return (
    <div>
      <Draggable handle=".handle">
        <div>
          <div
            style={{
              backgroundColor: "white",
              width: "300px",
              height: "30px",
              cursor: "pointer",
              textAlign: "left",
              padding: "5px",
            }}
            className="handle"
          >
            <DragIndicatorRoundedIcon />
            <button onClick={toggleFullScreen}>Fullscreen</button>
            <div ref={PlayerContainerRef}>{children}</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
