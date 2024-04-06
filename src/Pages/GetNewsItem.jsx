import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Collapse,
	Fab,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "../Images/logo1.jpg";
import { useSelector } from "react-redux";
import axios from "../api/axios";

const GetNewsItem = ({ news, index, deleteItem }) => {
	const store = useSelector((store) => store);
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	const HandleOpen = () => {
		setOpen(!open);
	};
	const deleteHandler = async (_id, title) => {
		const id = { _id };
		if (window.confirm(`Ushbu ${title} o'chirilsinmi?`)) {
			setIsDeleting(false);
			try {
				await axios({
					method: "Post",
					url: "/api/news/deletePost",
					data: id,
				});
				setIsDeleting(false);
				deleteItem();
			} catch (err) {
				console.log(err);
				setIsDeleting(false);
			}
		}
	};
	return (
		<>
			<Card key={index} sx={{ mb: 4 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: "red " }} aria-label="recipe">
							<CardMedia component="img" height="41" src={logo} alt="Logo" />
						</Avatar>
					}
					action={
						store.news.isAuthenticated && (
							<Tooltip title="Delete">
								<IconButton
									onClick={() => deleteHandler(news._id, news.title)}
									disabled={isDeleting}>
									<DeleteIcon color="error" />
								</IconButton>
							</Tooltip>
						)
					}
					title="Talaba O'zbekiston"
					subheader={news.uploadtime}
				/>
				<CardMedia component="img" width="325" src={news.image} alt="Image" />
				<CardContent>
					<Typography variant="h7" color="text.secondary">
						{news.muallif}
					</Typography>
					<Typography
						sx={{ borderBottom: "1px solid", borderColor: "text.primary" }}
						variant="h6"
						color="text.primary">
						{news.title}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						height: 10,
						margin: "0 15px 20px 0",
						justifyContent: "flex-end",
					}}>
					{!open ? (
						<Fab onClick={HandleOpen} size="small">
							<ExpandMore />
						</Fab>
					) : (
						<Fab onClick={HandleOpen} size="small">
							<ExpandLess />
						</Fab>
					)}
				</CardActions>
				{open ? (
					<Collapse in={open}>
						<CardContent>
							<Typography
								style={{ wordWrap: "break-word" }}
								dangerouslySetInnerHTML={{ __html: news.desc }}
								paragraph
							/>
						</CardContent>
					</Collapse>
				) : null}
			</Card>
		</>
	);
};

export default GetNewsItem;
