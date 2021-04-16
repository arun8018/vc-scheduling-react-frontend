import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Divider from "@material-ui/core/Divider";

import io from "socket.io-client";
const socket = io.connect(
  "https://vc-petco-client.litmus7.com:1367/notifications"
);
socket.emit("join", { room: "room_6077e21a2ab80e74b36bb9d2" });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    height: "100vh",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  clientWrapper: {
    textAlign: "left",
  },
  clientMessageWrapper: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "6px",
    width: "fit-content",
    display: "inline-block",
  },
  adminWrapper: {
    textAlign: "right",
  },
  adminMessageWrapper: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "6px",
    width: "fit-content",
    display: "inline-block",
  },
  messageInput: {
    position: "absolute",
    bottom: "0px",
  },
}));

export default function ChatWindow() {
  const classes = useStyles();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    socket.on("update_message", (data) => {
      console.log(data);
      setResponse([...response, data]);
    });
    socket.emit("chat message", "hello team");
  }, [response]);

  console.log(response);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="caht-avatar" className={classes.avatar}>
            T
          </Avatar>
        }
        title="Tacha Admin"
        subheader="September 14, 2016"
      />
      <Divider />
      <CardContent>
        {response &&
          response.map((chat, index) => {
            return (
              <div key={index}>
                {(() => {
                  if (chat.type === "agent") {
                    return (
                      <div className={classes.clientWrapper}>
                        <div>Tacha Admin</div>
                        <div className={classes.clientMessageWrapper}>
                          {chat.message}
                        </div>
                      </div>
                    );
                  } else if (chat.type === "customer") {
                    return (
                      <div className={classes.adminWrapper}>
                        <div>Client</div>
                        <div className={classes.adminMessageWrapper}>
                          {chat.message}
                        </div>
                      </div>
                    );
                  } else if (chat.type === "image") {
                    return chat.message.event === "trigger-image" ? (
                      <img
                        src={chat.message.imageUrl}
                        alt="demo"
                        width="200"
                        height="200"
                      />
                    ) : null;
                  } else {
                    <div>catch all</div>;
                  }
                })()}
              </div>
            );
          })}
      </CardContent>
      <FormControl
        variant="outlined"
        fullWidth={true}
        className={classes.messageInput}
      >
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SendRoundedIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={0}
        />
      </FormControl>
    </Card>
  );
}