import React, { useRef,useEffect } from "react";
import logo from "../assets/images/tatcha-name-logo.png";
import Header from "../Components/Header";


import { init as initWebex } from "webex";

// Declare some globals that we'll need throughout



export default function Meeting() {
  const videoTag = useRef();
  const RemoteVideoTag = useRef();

  let activeMeeting, webex;

  // There's a few different events that'll let us know we should initialize
  // Webex and start listening for incoming calls, so we'll wrap a few things
  // up in a function.
  function connect() {
      if (!webex) {
        webex = window.webex = initWebex({
          config: {
            meetings: {
              deviceType: "WEB",
            },
          },
          credentials: {
            access_token:
              "ZDM5NmY5MjktODE1ZS00MGFlLTljY2EtNjRmMDczNTA1MThiMDgyNWFlZmUtNWFk_P0A1_5bec38e4-205e-4e47-80fa-b272c913bcbf",
          },
          logger: {
            level: "error",
          },
        });
      }
     
      // Register our device with Webex cloud
      if (!webex.meetings.registered) {
        webex.meetings
          .register()
          // Sync our meetings with existing meetings on the server
          .then(() => webex.meetings.syncMeetings())
          .then(() => {
            console.log("device connected")
            connectMeeting();
          })
          .catch((err) => {
            console.error(err);
            throw err;
          });
      }
  }

  // Similarly, there are a few different ways we'll get a meeting Object, so let's
  // put meeting handling inside its own function.
  function bindMeetingEvents(meeting) {
    // meeting is a meeting instance, not a promise, so to know if things break,
    // we'll need to listen for the error event. Again, this is a rather naive
    // handler.
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
      // if (media.type === "remoteAudio" && media.stream) {
      //   RemoteAudioTag.current.srcObject = media.stream;
      // }
    });

    // Handle media streams stopping
    meeting.on("media:stopped", (media) => {
      if (media.type === "local") {
        videoTag.current.srcObject = null;
      }
      if (media.type === "remoteVideo") {
        RemoteVideoTag.current.srcObject = null;
      }
      // if (media.type === "remoteAudio") {
      //   RemoteAudioTag.current.srcObject = null;
      // }
    });

    meeting.on("all", (event) => {
      //console.log(event);
    });
  }

  // Join the meeting and add media
  function joinMeeting(meeting) {
    // Save meeting to global object
    activeMeeting = meeting;

    // Call our helper function for binding events to meetings
    bindMeetingEvents(meeting);

    return meeting
      .join({
        moderator: false,
        guest: true,
        meetingQuality: { local: "LOW", remote: "MEDIUM" },
      })
      .then(() => {
        const mediaSettings = {
          receiveVideo: true,
          receiveAudio: true,
          receiveShare: true,
          sendVideo: true,
          sendAudio: true,
          sendShare: false,
        };
        console.log(meeting.members.membersCollection.members);
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

  

  function connectMeeting() {
    const destination = atob(
      "aHR0cHM6Ly9saXRtdXM3LndlYmV4LmNvbS9tZWV0L3Jha3NoaXRo"
    );
    return webex.meetings.create(destination).then((meeting) => {
      return joinMeeting(meeting);
    });
  }


  useEffect(() => {
    connect();
    console.log("***************")
  }, []);

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

        <video
          ref={videoTag && videoTag}
          style={{ position: "absolute", right: "5%" }}
          width="300"
          height="300"
          autoPlay
        ></video>
      </div>
    </div>
  );
}
