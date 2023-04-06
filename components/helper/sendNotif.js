import axios from "axios";

sendNotification = (token, messageTitle, messageBody) => {
    return axios
      .post(
        'https://www.raksa-test.com/prog-x/api/general_api/firebaseMessage.php',
        {
          registration_ids: token,
          notification: {
            body: messageBody,
            title: messageTitle,
          },
        },
      )
  };

export default sendNotification;
