

export const Course = ({course}) => {

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({course}) => {
    return <h2>{course}</h2>
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
        return parts.reduce((prev, current) => prev + current.exercises, 0);
    }

    return <p><strong>Total of {getTotal()} exercises</strong></p>
}