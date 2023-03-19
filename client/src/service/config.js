const config = {
  SERVER_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:8900/"
      : "https://nameless-basin-36851.herokuapp.com/",
  SOCKET_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "wss://localhost:8900/"
      : `wss://nameless-basin-36851.herokuapp.com:${process.env.PORT}`,
};

export const SERVER_URL = config.SERVER_URL;
export const SOCKET_URL = config.SOCKET_URL;
