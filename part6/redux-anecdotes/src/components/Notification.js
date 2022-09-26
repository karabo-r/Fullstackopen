import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state.notifications);
	const { displayStatus } = notification;

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		visibility: displayStatus ? "visible" : "hidden",
	};
	return <div style={style}>{notification.message}</div>;
};

export default Notification;
