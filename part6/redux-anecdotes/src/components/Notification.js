// import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = (props) => {
	const { displayStatus } = props.notification;

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		visibility: displayStatus ? "visible" : "hidden",
	};
	return <div style={style}>{props.notification.message}</div>;
};

const mapStateToProps = (state) => {
	return {
		notification: state.notifications,
	};
};

export default connect(mapStateToProps)(Notification);
