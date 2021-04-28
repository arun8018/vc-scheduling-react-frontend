import React, { useRef, useState } from "react";
import { init as initWebex } from "webex";
import Header from "../Components/Header";
import ChatBox from "../Components/ChatBox";
import logo from "../assets/images/tatcha-name-logo.png";
import useChat from "../Hooks/useChat";
import Controls from "./Controls";
// import Draggable from "react-draggable";
// Initialize the SDK and make it available to the window
const webex = (window.webex = initWebex({
  config: {
    meetings: {
      deviceType: "WEB",
    }
  },
  credentials: {
    access_token:
      "ZWNiMjFmM2MtNWU1Ni00ZGQ4LTkyNDAtMzc5YTAzZThjNDc1Nzc4MmIzYTktYWRh_P0A1_5bec38e4-205e-4e47-80fa-b272c913bcbf",
    },
    logger: {
          level: "error",
        },
}));


webex.meetings.register().catch((err) => {
  console.error(err);
  alert(err);
  throw err;
});

export default function MeetingLive() {
  const videoTag = useRef();
  const RemoteVideoTag = useRef();
  const RemoteAudioTag = useRef();
  const [text, setText] = useState("");
  const { message } = useChat("room_6077e21a2ab80e74b36bb9d2");
  const [activeMeeting, setActiveMeeting] = useState();
  // Listen for added meetings
  webex.meetings.on("meeting:added", (addedMeetingEvent) => {
    if (addedMeetingEvent.type === "INCOMING") {
      const addedMeeting = addedMeetingEvent.meeting;

      // Acknowledge to the server that we received the call on our device
      addedMeeting.acknowledge(addedMeetingEvent.type).then(() => {
        if (window.confirm("Answer incoming call")) {
          joinMeeting(addedMeeting);
        } else {
          addedMeeting.decline();
        }
      });
    }
  });

  // Register our device with Webex cloud
  if (!webex.meetings.registered) {
    webex.meetings
      .register()
      // Sync our meetings with existing meetings on the server
      .then(() => webex.meetings.syncMeetings())
      .then(() => {
        
        
      })
      // This is a terrible way to handle errors, but anything more specific is
      // going to depend a lot on your app
      .catch((err) => {
        console.error(err);
        // we'll rethrow here since we didn't really *handle* the error, we just
        // reported it
        throw err;
      });
  } else {
    // Device was already connected
  }

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

  const handleCancelClick = () => {
    activeMeeting &&
      activeMeeting.leave().then(() => {
        alert("meeting end");
      });
  };

  const handleVideoOff = () => {
    activeMeeting &&
      activeMeeting
        .muteVideo()
        .then(() => {
          alert("Video off");
        })
        .catch((error) => {});
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
      if (media.type === "remoteAudio" && media.stream) {
        RemoteAudioTag.current.srcObject = media.stream;
      }
    });

    // Handle media streams stopping
    meeting.on("media:stopped", (media) => {
      // Remove media streams
      if (media.type === "local") {
        videoTag.current.srcObject = null;
      }
      if (media.type === "remoteVideo") {
        RemoteVideoTag.current.srcObject = null;
      }
      if (media.type === "remoteAudio") {
        RemoteAudioTag.current.srcObject = null;
      }
    });
  }

  // Join the meeting and add media
  function joinMeeting(meeting) {
    setActiveMeeting(meeting);
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

  console.log("message from meeting page", message);
  return (
    <div>
      <Header title={""} logo={logo} />
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "93.9vh",
        }}
      >
        <video
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          ref={RemoteVideoTag && RemoteVideoTag}
          autoPlay
          playsInline
        ></video>
        <audio
          ref={RemoteAudioTag && RemoteAudioTag}
          autoPlay
          playsInline
        ></audio>

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
        <button onClick={handleCancelClick}>cancel</button>
        <button onClick={handleVideoOff}>Hide Video</button>
        <Controls />
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
