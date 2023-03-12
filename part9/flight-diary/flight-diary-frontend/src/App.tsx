import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { v1 as uuid } from "uuid";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState("");

  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiaryEntry = {
      // id: uuid(),
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };

    axios
      .post("/api/diaries", newDiaryEntry)
      .then((r) => {
        if (r.status === 200) {
          setDiaries([...diaries, r.data]);
          resetFields();
          return r.data;
        }
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      });
  };

  const resetFields = () => {
    // setVisibility("");
    setDate("");
    // setWeather("");
    setComment("");
    clearRadioButtons();

    const date = document.querySelector("input[type=date]") as HTMLInputElement;
    date.valueAsDate = new Date();
  };

  function clearRadioButtons() {
    const ele = document.querySelectorAll(
      "input[type=radio]"
    ) as NodeListOf<HTMLInputElement>;
    console.log(ele);
    for (let i = 0; i < ele.length; i++) {
      ele[i].checked = false;
    }
  }

  useEffect(() => {
    const getDiaries = async () => {
      const diaries = await axios.get<DiaryEntry[]>("/api/diaries");
      if (diaries.status === 200) {
        setDiaries(diaries.data);
        return diaries.data;
      }

      console.log(diaries.data);
    };

    getDiaries();
  }, []);

  // console.log(diaries);
  return (
    <div className="App">
      <header className="App-header">Add new entries</header>
      {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplate: "1fr / 1fr 2fr",
            width: "100%",
          }}
        >
          <label style={{ justifySelf: "center" }} htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplate: "1fr / 1fr 2fr",
            width: "100%",
          }}
        >
          <label style={{ justifySelf: "center" }} htmlFor="visibility">
            Visibility
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Great</label>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label>Good</label>
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label>Ok</label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label>Poor</label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={(e) => setVisibility(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplate: "1fr / 1fr 2fr" }}>
          <label style={{ justifySelf: "center" }} htmlFor="weather">
            Weather
          </label>
          <div>
            <label>Sunny </label>
            <input
              type="radio"
              name="weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label>Rainy</label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label>Cloudy</label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label>Stormy</label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label>Windy</label>
            <input
              type="radio"
              name="weather"
              value="windy"
              onChange={(e) => setWeather(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplate: "1fr / 1fr 2fr",
            width: "100%",
          }}
        >
          <label style={{ justifySelf: "center" }}>Comment</label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button style={{ justifySelf: "flex-start" }} type="submit">
          Add
        </button>
      </form>

      <h1>Diaries</h1>
      {diaries &&
        diaries.map((diary) => (
          <div style={{ marginBottom: "1rem" }} key={diary.id}>
            <p>
              <em>{diary.date}</em>
            </p>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            <p>Comment: {diary.comment}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
