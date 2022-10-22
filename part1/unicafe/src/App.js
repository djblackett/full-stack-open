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
                <button onClick={() => setGood(good + 1)}>Good</button>
                <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
                <button onClick={() => setBad(bad + 1)}>Bad</button>
            </div>
            <div>
                <h1>Statistics</h1>
                <ul>
                    <li>good {good}</li>
                    <li>neutral {neutral}</li>
                    <li>bad {bad}</li>
                    <li>all {good + neutral + bad}</li>
                    <li>average {(good - bad)/(good + neutral + bad)}</li>
                    <li>positive {good/(good + neutral + bad)} %</li>
                </ul>
            </div>
        </div>
    )
}

export default App