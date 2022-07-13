import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
	const courses = props.courses;
	const mappedCourses = courses.map((item) => {
		return (
			<div>
				<Header name={item.name} />
				<Content parts={item.parts} />
				<Total parts={item.parts} />
			</div>
		);
	});

	return mappedCourses;
};

export default Course;
