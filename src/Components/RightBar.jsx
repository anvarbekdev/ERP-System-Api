import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import axios from "../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./rightBar.css";
import { useSelector } from "react-redux";
const RightBar = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const store = useSelector((store) => store);
	const [isDeleting, setIsDeleting] = useState(false);
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/news/getGallery");
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
	const deleteHandler = async (_id, title) => {
		const id = { _id };
		if (window.confirm(`Ushbu ${title} o'chirilsinmi?`)) {
			setIsDeleting(false);
			try {
				await axios({
					method: "Post",
					url: "/api/news/deleteGallery",
					data: id,
				});
				setIsDeleting(false);
				fetchData();
			} catch (err) {
				console.log(err);
				setIsDeleting(false);
			}
		}
	};
	return (
		<Box
			flex={3}
			py={2}
			mx={0}
			sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
			<Box
				className="box_shadow"
				position="fixed"
				sx={{
					width: { md: 300, lg: 330 },
					height: "calc(100vh - 100px)",
					right: 0,
					mr: 2,
				}}>
				{isLoading ? (
					<Box
						sx={{
							position: "fixed",
							left: "50%",
						}}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "calc(100vh - 60px)",
							}}>
							<CircularProgress />
						</Box>
					</Box>
				) : (
					<>
						<Typography variant="h6" fontWeight={100}>
							Gallery
						</Typography>
						<Swiper
							effect={"coverflow"}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							coverflowEffect={{
								rotate: 50,
								stretch: 0,
								depth: 100,
								modifier: 1,
								slideShadows: true,
							}}
							pagination={true}
							modules={[EffectCoverflow, Pagination]}
							className="mySwiper">
							{data.map((img) => (
								<SwiperSlide>
									<motion.img
										animate={{ scale: 0.8 }}
										whileHover={{
											scale: 1.5,
											transition: { duration: 0.1 },
										}}
										style={{ height: 200 }}
										src={img.image}
										alt="imgae"
									/>
									{store.news.isAuthenticated && (
										<Tooltip title="Delete">
											<IconButton
												onClick={() => deleteHandler(img._id, img.title)}
												disabled={isDeleting}>
												<DeleteIcon color="error" />
											</IconButton>
										</Tooltip>
									)}
									<Typography
										style={{ wordWrap: "break-word" }}
										variant="h7"
										color="text.secondary">
										{img.title}
									</Typography>
								</SwiperSlide>
							))}
						</Swiper>
					</>
				)}
			</Box>
		</Box>
	);
};

export default RightBar;
