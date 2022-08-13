import React from "react";
import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe(`display blog's title and author by default`, () => {
	test(`blog renders the blog's title`, () => {
		const newBlog = [
			{
				title: "title",
				author: "author",
				likes: 10,
				url: "url",
			},
		];

		render(<Blog blogs={newBlog} />);

		const elements = screen.getByText("title");
		expect(elements).toBeDefined()
	});
    
	test(`blog renders the blog's author`, () => {
        const newBlog = [
            {
                title: "title",
				author: "author",
				likes: 10,
				url: "url",
			},
		];
        
		render(<Blog blogs={newBlog} />);
        
        const elements = screen.getByText("author");
		expect(elements).toBeDefined()
	})
});
