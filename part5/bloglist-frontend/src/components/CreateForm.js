import React from "react";

const CreateForm = (props) => {
	return (
		<form onSubmit={props.handleCreate}>
			<h2>Create A new blog entry</h2>
			<p>
				Title: <input value={props.title} onChange={props.handleTitle} />
			</p>
			<p>
				Author: <input value={props.author} onChange={props.handleAuthor} />
			</p>
			<p>
				Url: <input value={props.url} onChange={props.handleUrl} />
			</p>
			<button type="submit">Create</button>
			<button onClick={() => props.setVisible(false)}>Cancel</button>
		</form>
	);
};

export default CreateForm;
