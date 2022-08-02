import React from "react";

function LoginForm(props) {
	return (
		<>
			<h1>Please Login</h1>
			<form onSubmit={props.handleLogin}>
				<h3>
					username{" "}
					<input
						type="text"
						value={props.username}
						onChange={props.handleUsername}
					/>
				</h3>
				<h3>
					password{" "}
					<input value={props.password} onChange={props.handlePassword} />
				</h3>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default LoginForm;
