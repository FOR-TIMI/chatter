const config = {
  SERVER_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:8900/"
      : "https://nameless-basin-36851.herokuapp.com/",
  SOCKET_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "ws://localhost:8900/"
      : `wss://nameless-basin-36851.herokuapp.com/`,
};

export const SERVER_URL = config.SERVER_URL;
export const SOCKET_URL = config.SOCKET_URL;
