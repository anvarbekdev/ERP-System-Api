import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NewsBar from "../Components/NewsBar";

const NewsPage = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.news.isAuthenticated) {
			navigate("/login");
		}
	}, [store.news.isAuthenticated]);
	return (
		<>
			{store.news.isAuthenticated ? (
				<>
					<Box sx={{ width: { xs: 0, md: 270 } }}>
						<NewsBar
							avatar={store.news.news.news.avatar}
							name={store.news.news.news.name}
						/>
					</Box>
					<Outlet />
				</>
			) : (
				navigate("/login")
			)}
		</>
	);
};

export default NewsPage;
