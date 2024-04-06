import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "../Style/facultyStudentLogin.css";
import axios from "../api/axios";

import GetNews from "./GetNews";
import RightBar from "../Components/RightBar";

function GetNewsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/news/getNews");
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async () => {
		fetchData(); // fetch data after deletion
	};

	return (
		<>
			<Box color={"text.primary"} bgcolor="background.default">
				<GetNews data={data ? data : ["not data"]} onDelete={handleDelete} />
			</Box>
			<RightBar />
		</>
	);
}

export default GetNewsPage;
