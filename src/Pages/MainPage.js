// import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Header from "../Components/Header";
// import ChatBox from "../Components/ChatBox";
// import logo from "../assets/images/tatcha-name-logo.png";
// import ImageButton from "../Components/IconButton";
// import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
// import CallRoundedIcon from "@material-ui/icons/CallRounded";
// import MicRoundedIcon from "@material-ui/icons/MicRounded";
// import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
// import useChat from "../Hooks/useChat";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     position: "absolute",
//     top: "60px",
//     bottom: 0,
//   },
//   paper: {
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     height: "100%",
//     bottom: "0px",
//     top: "0px",
//     border: "1px solid #ddd",
//     backgroundColor: "#000",
//     position: "relative",
//     overflow: "hidden",
//   },
//   chatButton: {
//     float: "right",
//     marginRight: "1rem",
//   },
//   buttonContainer: {
//     width: "100%",
//     bottom: 0,
//     position: "absolute",
//     marginBottom: "1rem",
//   },
// }));
// export default function MainPage() {
//   const classes = useStyles();
//   const { message } = useChat("room_6077e21a2ab80e74b36bb9d2");
//   const [data, setData] = useState();
//   const [isChatVisible, setIsChatVisible] = useState(true);
//   const handleChatClick = () => {
//     setIsChatVisible(!isChatVisible);
//   };

//   useEffect(() => {
//     setData(message[message.length - 1]);
//   }, [message]);

//   return (
//     <div>
//       <Header title={""} logo={logo} />
//       <Grid container className={classes.root} spacing={0}>
//         <Grid item xs={12} sm md xl>
//           <Paper className={classes.paper}>
//             {data &&
//             data.type === "image" &&
//             data.message.event === "trigger-image" ? (
//               <Draggable
//                 handle=".handle"
//                 defaultPosition={{ x: 0, y: 0 }}
//                 position={null}
//                 grid={[25, 25]}
//                 scale={1}
//               >
//                 <div>
//                   <div
//                     style={{ cursor: "pointer", color: "white" }}
//                     className="handle"
//                   >
//                     <img
//                       src={data.message.imageUrl}
//                       alt="demo"
//                       width="200"
//                       height="200"
//                     />
//                   </div>
//                 </div>
//               </Draggable>
//             ) : null}

//             <div className={classes.buttonContainer}>
//               <ImageButton>
//                 <VideocamRoundedIcon />
//               </ImageButton>
//               <ImageButton>
//                 <CallRoundedIcon />
//               </ImageButton>
//               <ImageButton>
//                 <MicRoundedIcon />
//               </ImageButton>
//               <div className={classes.chatButton}>
//                 <ImageButton onButtonClick={handleChatClick}>
//                   <ChatBubbleRoundedIcon />
//                 </ImageButton>
//               </div>
//             </div>
//           </Paper>
//         </Grid>
//         {isChatVisible ? (
//           <Grid item xs={12} sm={3} md={3} lg={3}>
//             <Paper
//               className={classes.paper}
//               style={{ backgroundColor: "#fff", padding: 0 }}
//             >
//               <ChatBox />
//             </Paper>
//           </Grid>
//         ) : null}
//       </Grid>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import DraggableContainer from "../Components/DraggableContainer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Header from "../Components/Header";
import ChatBox from "../Components/ChatBox";
import logo from "../assets/images/tatcha-name-logo.png";
import ImageButton from "../Components/IconButton";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import useChat from "../Hooks/useChat";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "60px",
    bottom: 0,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    bottom: "0px",
    top: "0px",
    border: "1px solid #ddd",
    backgroundColor: "#000",
    position: "relative",
    overflow: "hidden",
  },
  chatButton: {
    float: "right",
    marginRight: "1rem",
  },
  buttonContainer: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    marginBottom: "1rem",
  },
}));
export default function MainPage() {
  const classes = useStyles();
  const { message } = useChat("room_6077e21a2ab80e74b36bb9d2");
  const playerRef = useRef(null);
  const [data, setData] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const handleChatClick = () => {
    setIsChatVisible(!isChatVisible);
  };

  useEffect(() => {
    setData(message[message.length - 1]);
  }, [message]);

  useEffect(() => {
    if (data && data.message.event === "playVideo") {
      setIsPlay(true);
    }
    if (data && data.message.event === "pauseVideo") {
      setIsPlay(false);
    }
    if (data && data.message.event === "mute") {
      setIsMute(true);
    }
    if (data && data.message.event === "unMute") {
      setIsMute(false);
    }
    if (data && data.message.event === "end-video") {
      setData(null);
    }
    if (data && data.message.event === "seekTo") {
      playerRef.current.seekTo(data.message.time);
    }
    // return () => {
    //   setData(null); // This worked for me
    // };
  }, [data]);

  return (
    <div>
      <Header title={""} logo={logo} />
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm md xl>
          <Paper className={classes.paper}>
            {data &&
            data.type === "youtube" &&
            data.message.event !== "end-video" ? (
              <DraggableContainer>
                <ReactPlayer
                  ref={playerRef}
                  url="https://www.youtube.com/watch?v=vZdnKJz1NVQ"
                  width="100%"
                  height="100%"
                  controls={false}
                  muted={isMute}
                  playing={isPlay}
                  style={{ pointerEvents: "none" }}
                />
              </DraggableContainer>
            ) : null}

            {data &&
            data.type === "image" &&
            data.message.event === "trigger-image" ? (
              <DraggableContainer>
                <img
                  src={data.message.imageUrl}
                  alt="demo"
                  width="100%"
                  height="100%"
                />
              </DraggableContainer>
            ) : null}

            <div className={classes.buttonContainer}>
              <ImageButton>
                <VideocamRoundedIcon />
              </ImageButton>
              <ImageButton>
                <CallRoundedIcon />
              </ImageButton>
              <ImageButton>
                <MicRoundedIcon />
              </ImageButton>
              <div className={classes.chatButton}>
                <ImageButton onButtonClick={handleChatClick}>
                  <ChatBubbleRoundedIcon />
                </ImageButton>
              </div>
            </div>
          </Paper>
        </Grid>
        {isChatVisible ? (
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Paper
              className={classes.paper}
              style={{ backgroundColor: "#fff", padding: 0 }}
            >
              <ChatBox />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
