import { Container } from "@mui/material";
import React from "react";
import GetNewsItem from "./GetNewsItem";

const GetNews = ({ data, onDelete }) => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				width: { xs: 300, md: 400, lg: 600, xl: 1000 },
				px: 2,
			}}>
			{data.map((news, index) => (
				<GetNewsItem key={index} news={news} deleteItem={onDelete} />
			))}
		</Container>
	);
};

export default GetNews;
