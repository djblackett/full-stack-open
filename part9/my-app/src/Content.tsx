import { CoursePart } from "./types";

export default function Content(props: { courseParts: CoursePart[] }) {
  return (
    <>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <p>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em>
              </p>
            );
          case "group":
            return (
              <p>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                project exercises: {part.groupProjectCount}
              </p>
            );
          case "background":
            return (
              <p>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em>
                <br />
                {part.backgroundMaterial}
              </p>
            );
          case "special":
            return (
              <p>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em> <br />
                required skills: {part.requirements.join(", ")}
              </p>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
