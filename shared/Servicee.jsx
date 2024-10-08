import axios from "axios";

// const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApplicationId = "A28B6CBD-09AD-4E75-936D-A893AF0ABED0";
const SendBirdApiToken = "5dcfc124ce27a5990052b08af2207880128cb5eb";

function createUserSendBird(userId, nickname, profileUrl) {
  console.log("Sending user creation request:", {
    userId,
    nickname,
    profileUrl,
  });

  return axios.post(
    "https://api-" + SendBirdApplicationId + ".sendbird.com/v3/users",
    {
      user_id: userId,
      nickname: nickname,
      profile_url: profileUrl || "https://via.placeholder.com/150", // Default value if profileUrl is missing
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
}

const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    "https://api-" + SendBirdApplicationId + ".sendbird.com/v3/group_channels",
    {
      user_ids: users, // Corrected: 'user_ids' is an array of user IDs
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

export default {
  createUserSendBird,
  CreateSendBirdChannel,
};
