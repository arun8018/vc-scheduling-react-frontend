import React, { useRef, useState } from "react";
import { init as initWebex } from "webex";
import Header from "../Components/Header";
import ChatBox from "../Components/ChatBox";
import logo from "../assets/images/tatcha-name-logo.png";
// import Draggable from "react-draggable";
// Initialize the SDK and make it available to the window
const webex = (window.webex = initWebex({
  credentials: {
    access_token:
      "OWQzNzhjNzgtMzc5MS00YjFhLWEzYTctZWQxNTc0ZTk5NjVmYTQxZTQ0ZjktN2E1_PF84_consumer",
  },
}));

webex.config.logger.level = "debug";

webex.meetings.register().catch((err) => {
  console.error(err);
  alert(err);
  throw err;
});

export default function MeetingLive() {
  const videoTag = useRef();
  const RemoteVideoTag = useRef();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = () => {
    console.log(text);
    return webex.meetings
      .create(text)
      .then((meeting) => {
        // Call our helper function for binding events to meetings
        bindMeetingEvents(meeting);

        return joinMeeting(meeting);
      })
      .catch((error) => {
        // Report the error
        console.error(error);
      });
  };

  function bindMeetingEvents(meeting) {
    meeting.on("error", (err) => {
      console.error(err);
    });

    // Handle media streams changes to ready state
    meeting.on("media:ready", (media) => {
      if (!media) {
        return;
      }
      if (media.type === "local" && media.stream) {
        videoTag.current.srcObject = media.stream;
      }
      if (media.type === "remoteVideo" && media.stream) {
        RemoteVideoTag.current.srcObject = media.stream;
      }
    });

    // Handle media streams stopping
  }

  // Join the meeting and add media
  function joinMeeting(meeting) {
    return meeting.join().then(() => {
      const mediaSettings = {
        receiveVideo: true,
        receiveAudio: true,
        receiveShare: false,
        sendVideo: true,
        sendAudio: true,
        sendShare: false,
      };

      // Get our local media stream and add it to the meeting
      return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
        const [localStream, localShare] = mediaStreams;

        meeting.addMedia({
          localShare,
          localStream,
          mediaSettings,
        });
      });
    });
  }

  return (
    <div>
      <Header title={""} logo={logo} />
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "93.9vh"
        }}
      >
        <video
          width="100%"
          height="100%"
          style={{objectFit:'cover'}}
          ref={RemoteVideoTag && RemoteVideoTag}
          autoPlay
        ></video>
        <video
          ref={videoTag && videoTag}
          style={{ position: "absolute", right: "5%" }}
          width="300"
          height="300"
          autoPlay
        ></video>
      </div>
      <div style={{ position: "absolute" }}>
        <input type="text" value={text} onChange={handleChange}></input>
        <button onClick={handleClick}>join</button>
      </div>
      <div
        style={{
          position: "absolute",
          top: "65px",
          bottom: "0px",
          left: "80%",
          right: "0px",
        }}
      >
        <ChatBox />
      </div>
    </div>
  );
}
