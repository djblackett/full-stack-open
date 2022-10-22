import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button value={() => setGood(good + 1)} text={"Good"} />
                <Button value={() => setNeutral(neutral + 1)} text={"Neutral"}/>
                <Button value={() => setBad(bad + 1)} text={"Bad"} />
            </div>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App

const Button = ({text, value}) => {
    return <button onClick={value}>{text}</button>
}

const StatisticsLine = ({text, value}) => {
    return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({good, bad, neutral}) => {
    if (good + bad + neutral === 0) {
        return <p>No feedback given</p>
    } else {
        return (
            <table>
                <tbody>
                <StatisticsLine text={"good"} value={good}/>
                <StatisticsLine text={"neutral"} value={neutral}/>
                <StatisticsLine text={"bad"} value={bad}/>
                <StatisticsLine text={"all"} value={good + neutral + bad}/>
                <StatisticsLine text={"average"} value={(good - bad) / (good + neutral + bad)}/>
                <StatisticsLine text={"positive"} value={good / (good + neutral + bad)}/>
                </tbody>
                </table>
        )
    }
}