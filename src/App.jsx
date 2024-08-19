const axios = require("axios");

const scope = "ZohoCalendar.event.CREATE";
const event = {
  title: "Dinner party",
  dateandtime: {
    timezone: "Asia/Kolkata",
    start: "20221130T180000Z",
    end: "20221130T183000Z",
  },
};
const App = () => {
  return <div>Hello</div>;
};

export default App;
