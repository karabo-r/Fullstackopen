import Part from "./Part";

const Content = (props) => {
	const parts = props.parts;
	const mappedContentFromParts = parts.map((item, i) => {
		return <Part key={i} {...item} />;
	});

	return <div>{mappedContentFromParts}</div>;
};

export default Content;
