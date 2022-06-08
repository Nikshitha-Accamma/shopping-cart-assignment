import { notification } from 'antd';

const AppNotification = (type, title, message, duration = 2) => {
  notification[type]({
    message: title,
    description: message, 
    duration: duration
  });
};

export default AppNotification;