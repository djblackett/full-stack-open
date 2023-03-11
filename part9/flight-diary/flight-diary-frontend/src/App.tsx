import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { DiaryEntry } from "../types";
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
    setVisibility("");
    setDate("");
    setWeather("");
    setComment("");
  };

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
        <div style={{ display: "grid", gridTemplate: "1fr / 1fr 1fr" }}>
          <label style={{ justifySelf: "flex-start" }}>Date</label>{" "}
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplate: "1fr / 1fr 1fr" }}>
          <label style={{ justifySelf: "flex-start" }}>Visibility</label>
          <input
            type="text"
            name="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplate: "1fr / 1fr 1fr" }}>
          <label style={{ justifySelf: "flex-start" }}>Weather</label>
          <input
            type="text"
            name="weather"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplate: "1fr / 1fr 1fr" }}>
          <label style={{ justifySelf: "flex-start" }}>Comment</label>
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
          <div style={{ marginBottom: "1rem" }} key={diary.date}>
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
