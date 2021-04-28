import React, { useState, useEffect } from "react";
import axios from "axios";
// import axios from "../../api/axios"
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

import useChat from "../../Hooks/useChat";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    padding: "0px",
    // height: "93.8vh",
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
    bottom: "0",
    left: "0",
    position: "absolute",
  },
  messageBody: {
    overflow: "auto",
    position: "absolute",
    width: "100%",
    top: "80px",
    bottom: "60px",
    // [theme.breakpoints.down("sm")]: {
    //   backgroundColor: theme.palette.secondary.main,
    // },
  },
}));

export default function ChatBox() {
  const classes = useStyles();
  const { message} = useChat("room_6077e21a2ab80e74b36bb9d2");
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
     const formData = new FormData();
     formData.append("message", newMessage);
     formData.append("roomId", "6077e21a2ab80e74b36bb9d2");
     formData.append("customerId", "6077e21a2ab80e74b36bb9d4");
    axios
      .post("https://vc-petco-client.litmus7.com/site/send",formData)
      .then(
        (response) => {
          console.log(response);
    // sendMessage(newMessage);

        },
        (error) => {
          console.log(error);
        }
      );
    setNewMessage("");
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    document.querySelector("#ui").scrollTop = document.querySelector(
      "#ui"
    ).scrollHeight;
  }, [message]);

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{ textAlign: "left" }}
        avatar={
          <Avatar aria-label="caht-avatar" className={classes.avatar}>
            T
          </Avatar>
        }
        title="Tacha Admin"
        subheader="September 14, 2016"
      />
      <Divider />
      <CardContent id="ui" className={classes.messageBody}>
        {message &&
          message.map((chat, index) => {
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
          value={newMessage}
          onChange={handleNewMessageChange}
          onKeyPress={handleKeypress}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleSendMessage}
              >
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



