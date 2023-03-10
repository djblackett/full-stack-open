import { CoursePartBase } from "./types";

export default function Total(props: { courseParts: CoursePartBase[] }) {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}
