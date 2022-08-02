const styles = {
	failed: { color: "red" },
	successed: { color: "green" },
};

function success(message) {
	return <h1 style={styles.successed}>{message}</h1>;
}
function fail(message) {
	return <h1 style={styles.failed}>`${message}`</h1>;
}

const collection = {
	success,
	fail,
};

export default collection;
