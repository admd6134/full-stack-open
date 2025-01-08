/* eslint-disable react/prop-types */
const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  if (error) {
    return <div className="message error">{message}</div>;
  }
  return <div className="message">{message}</div>;
};

export default Notification;
