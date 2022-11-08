const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course} />
}

 const Course = ({course}) => {

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

export default App

const Header = ({course}) => {
    return <h1>{course}</h1>
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}  /> )}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({parts}) => {

    const getTotal = () => {
        let total = 0;
        parts.forEach(part => total += part.exercises);
        return total;
    }
    return <p>Total of {getTotal()} exercises</p>
}