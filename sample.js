import axios from "axios";
const api_key = "sk_5726_204851_678aaad35975a1594a5b76c38d9d962a";
const headers = {
  Accept: "application/json",
};

//Get all events

//===api reccomends using event_series
async function getEvents() {
  try {
    const events = await axios.get(
      "https://api.tickettailor.com/v1/event_series",
      {
        headers: headers,
        auth: {
          username: api_key,
          password: "",
        },
      }
    );
    // console.log(events.data.data[0].id);
    console.log(events.data);
  } catch (error) {
    console.log("No Events");
  }
}

//Get a single event using id
async function getEvent() {
  try {
    const event = await axios.get(
      "https://api.tickettailor.com/v1/event_series/es_1360333",
      {
        headers: headers,
        auth: {
          username: api_key,
          password: "",
        },
      }
    );
    console.log(event.data);
  } catch (error) {}
}

//Post an event

async function createEvent() {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    // Prepare event parameters as URLSearchParams
    const eventParams = {
      name: "Hanging out",
      description: "Date with Lily",
      venue: "Home",
      postal_code: "BL99PA",
      currency: "gbp",
      status: "active",
    };

    // Create the event
    /*To create an event an make it actice on tickettailor you first need to 
    create an event series, then an event occurrance using the id of the
    previously created event series. Add event occurance parameters where you define
    start and end date and time. */
    const eventResponse = await axios.post(
      "https://api.tickettailor.com/v1/event_series",
      eventParams,
      {
        headers: headers,
        auth: { username: api_key, password: "" },
      }
    );

    const eventId = eventResponse.data.id;
    const occParamas = {
      event_series_id: eventId,
      end_date: "3232-10-22",
      end_time: "23:15:00",
      start_date: "3232-10-22",
      start_time: "19:15:00",
      unavailable: false,
      status: "active",
      hidden: "False",
    };
    const eventOccurrence = await axios.post(
      `https://api.tickettailor.com/v1/event_series/${eventId}/events`,
      occParamas,
      {
        headers: headers,
        auth: { username: api_key, password: "" },
      }
    );
    const ticketParams = {
      event_series_id: eventId,
      price: 200,
      quantity: 20,
      name: "General Admission",
      status: "ON_SALE",
    };
    await axios.post(
      `https://api.tickettailor.com/v1/event_series/${eventId}/ticket_types`,
      ticketParams,
      {
        headers: headers,
        auth: { username: api_key, password: "" },
      }
    );

    console.log("Event ID:", eventOccurrence);
  } catch (error) {
    console.error(
      "Event or ticket not created:",
      error.response ? error.response.data : error.message
    );
  }
}

// getEvents();
// getEvent();
createEvent();
// getEvents();
