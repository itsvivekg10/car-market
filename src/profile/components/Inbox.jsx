import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import { useUser } from "@clerk/clerk-react";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [channelUrl, setChannelUrl] = useState();

  useEffect(() => {
    if (user) {
      const userId = (user.primaryEmailAddress?.emailAddress).split("@")[0];
      setUserId(userId);
    }
  }, [user]);

  const styles = {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fafafa",
    },
    channelList: {
      flex: "0 0 30%",
      borderRight: "1px solid #eaeaea",
      padding: "10px",
      boxSizing: "border-box",
      overflowY: "auto",
      backgroundColor: "#fff",
    },
    chatWindow: {
      flex: "1",
      padding: "10px",
      boxSizing: "border-box",
      overflowY: "auto",
      backgroundColor: "#fff",
    },
    header: {
      fontSize: "1.5rem",
      margin: "0 0 10px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user?.fullName}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          {/* Channel List */}
          <div style={styles.channelList}>
            <h2 style={styles.header}>Channels</h2>
            <GroupChannelList
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url);
              }}
              channelListQueryParams={{
                includeEmpty: true,
              }}
            />
          </div>

          {/* Chat Window */}
          <div style={styles.chatWindow}>
            <GroupChannel channelUrl={channelUrl} />
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}

export default Inbox;
