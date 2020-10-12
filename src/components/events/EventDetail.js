import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "./EventProvider";
import "./Event.css";
import { WeatherCard } from "../weather/WeatherCard";
import { WeatherContext } from "../weather/WeatherProvider";

export const EventDetail = (_) => {
  const { events, getEventById, deleteEvent } = useContext(EventContext);
  const { getWeatherTemp, getWeatherPop } = useContext(WeatherContext);
  const [weather, setWeather] = useState({});
  const [pop, setPop] = useState({});
  const [event, setEvent] = useState({});
  const user = parseInt(localStorage.getItem("nutty_customer"));
  const [owned, setOwned] = useState(false);
  const history = useHistory();

  const { eventId } = useParams();

  useEffect(() => {
    getEventById(eventId).then((response) => {
      setEvent(response);
      if (user === response.user.id) {
        setOwned(true);
      }
    });
  }, []);
  useEffect(() => {
    getEventById(eventId)
      .then(getWeatherTemp)
      .then((res) => {
        setWeather(res);
      });
  }, []); 
  useEffect(() => {
    getEventById(eventId)
      .then(getWeatherPop)
      .then((res) => {
        setPop(res);
      });
  }, []); 

  return (
    <section className="events">
      <section className="event">
        <h3 className="event__name">{event.name}</h3>
        <div>Date: {event.date}</div>
        <div>
          Location: {event.address} {event.city}, {event.state} {event.zip}{" "}
        </div>
        <p></p>
        <div>
          <button
            hidden={!owned}
            onClick={() => {
              history.push(`/events/edit/${event.id}`);
            }}
          >
            Edit
          </button>
          <span> </span>
          <button
            hidden={!owned}
            onClick={() => {
              deleteEvent(event.id).then((_) => {
                history.push(`/events`);
              });
            }}
          >
            Delete
          </button>
        </div>
      </section>
      <section className="event">
        { <WeatherCard key={event.id} temp={weather} weather={pop}/>} 
      </section>
    </section>
  );
};
