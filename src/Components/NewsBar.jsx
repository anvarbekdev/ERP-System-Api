import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newsLogout } from "../redux/action/newsAction";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import "./facultyBar.css";
import CollectionsIcon from "@mui/icons-material/Collections";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { green, purple } from "@mui/material/colors";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Fab,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	SwipeableDrawer,
	Tooltip,
	Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../Style/Home.css";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
const NewsBar = ({ avatar, name }) => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const logoutHandler = () => {
		dispatch(newsLogout());
		navigate("/login");
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const opens = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			// sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			// onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<Grid
				container
				direction="column"
				justifyContent="space-around"
				alignItems="flex-start"
				// className="shadows"
				sx={{
					width: 200,
					height: "calc(100vh - 60px)",
					display: { xs: "flex", md: "none" },
				}}>
				<List sx={{ width: "100%" }}>
					<Link to="uploadPost" className="link">
						<ListItem disablePadding>
							<ListItemButton sx={{ pr: 5 }}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<NewspaperIcon />
								</ListItemIcon>
								<ListItemText primary="Yangilik Joylash" />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link to="uploadGallery" className="link">
						<ListItem disablePadding>
							<ListItemButton sx={{ pr: 5 }}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<CollectionsIcon />
								</ListItemIcon>
								<ListItemText primary="Rasim Joylash" />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link to="/news" className="link">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<PermIdentityIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
				<Divider />
				<List sx={{ width: "100%" }}>
					<Box sx={{ flexGrow: 1 }}>
						<ListItem disablePadding sx={{ display: "block" }}>
							<ListItemButton
								id="basic-button"
								aria-controls={opens ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={opens ? "true" : undefined}
								onClick={handleClick}>
								<ListItemIcon>
									<Tooltip title="Sozlamalarni oching">
										<Avatar src={avatar} sx={{ width: 40, height: 40 }} />
									</Tooltip>
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItemButton>
						</ListItem>
						<Menu
							sx={{ textAlign: "center" }}
							id="basic-menu"
							anchorEl={anchorEl}
							open={opens}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}>
							<ListItemButton>
								<Link className="link" onClick={handleClose} to="updateProfile">
									{t("profile_update")}
								</Link>
							</ListItemButton>
							<ListItemButton>
								<Link
									className="link"
									onClick={handleClose}
									to="updatePassword">
									{t("password_update")}
								</Link>
							</ListItemButton>
							<ListItemButton onClick={logoutHandler}>
								<Typography color="error">{t("logout")}</Typography>
							</ListItemButton>
						</Menu>
					</Box>
				</List>
			</Grid>
		</Box>
	);

	const ColorButton = styled(Fab)(({ theme }) => ({
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: green[700],
		"&:hover": {
			backgroundColor: purple[900],
		},
	}));

	useEffect(() => {
		if (!store.news.isAuthenticated) {
			navigate("/login");
		}
	}, [store.news.isAuthenticated]);
	return (
		<div>
			{store.news.isAuthenticated ? (
				<>
					<Box
						sx={{
							zIndex: "99",
							height: 40,
							display: { xs: "block", md: "none" },
							position: "fixed",
							top: "50%",
							left: 0,
						}}>
						{["left"].map((anchor) => (
							<React.Fragment key={anchor}>
								<Button className="box" onClick={toggleDrawer(anchor, true)}>
									<ColorButton size="small">
										<ArrowForwardIosIcon />
									</ColorButton>
								</Button>
								<SwipeableDrawer
									PaperProps={{
										className: "shadows",
									}}
									anchor={anchor}
									open={state[anchor]}
									onClose={toggleDrawer(anchor, false)}
									onOpen={toggleDrawer(anchor, true)}>
									{store.news.isAuthenticated && <>{list("left")}</>}
								</SwipeableDrawer>
							</React.Fragment>
						))}
					</Box>
					<Box
						sx={{
							height: "calc(100vh - 60px)",
						}}>
						<Grid
							position="fixed"
							container
							direction="column"
							justifyContent="space-around"
							alignItems="flex-start"
							className="shadows"
							sx={{
								left: 0,
								width: 200,
								height: "calc(100vh - 60px)",
								display: { xs: "none", md: "flex" },
							}}>
							<List sx={{ width: "100%" }}>
								<Link to="uploadPost" className="link">
									<ListItem disablePadding>
										<ListItemButton sx={{ pr: 5 }}>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: 3,
													justifyContent: "center",
												}}>
												<NewspaperIcon />
											</ListItemIcon>
											<ListItemText primary="Yangilik Joylash" />
										</ListItemButton>
									</ListItem>
								</Link>
								<Link to="uploadGallery" className="link">
									<ListItem disablePadding>
										<ListItemButton sx={{ pr: 5 }}>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: 3,
													justifyContent: "center",
												}}>
												<CollectionsIcon />
											</ListItemIcon>
											<ListItemText primary="Rasim Joylash" />
										</ListItemButton>
									</ListItem>
								</Link>
								<Link to="/news" className="link">
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: 3,
													justifyContent: "center",
												}}>
												<PermIdentityIcon />
											</ListItemIcon>
											<ListItemText primary="Profile" />
										</ListItemButton>
									</ListItem>
								</Link>
							</List>
							<Divider />
							<List sx={{ width: "100%" }}>
								<Box sx={{ flexGrow: 1 }}>
									<ListItem disablePadding sx={{ display: "block" }}>
										<ListItemButton
											id="basic-button"
											aria-controls={opens ? "basic-menu" : undefined}
											aria-haspopup="true"
											aria-expanded={opens ? "true" : undefined}
											onClick={handleClick}>
											<ListItemIcon>
												<Tooltip title="Sozlamalarni oching">
													<Avatar src={avatar} sx={{ width: 40, height: 40 }} />
												</Tooltip>
											</ListItemIcon>
											<ListItemText primary={name} />
										</ListItemButton>
									</ListItem>
									<Menu
										sx={{ textAlign: "center" }}
										id="basic-menu"
										anchorEl={anchorEl}
										open={opens}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}>
										<ListItemButton>
											<Link
												className="link"
												onClick={handleClose}
												to="updateProfile">
												{t("profile_update")}
											</Link>
										</ListItemButton>
										<ListItemButton>
											<Link
												className="link"
												onClick={handleClose}
												to="updatePassword">
												{t("password_update")}
											</Link>
										</ListItemButton>
										<ListItemButton onClick={logoutHandler}>
											<Typography color="error">{t("logout")}</Typography>
										</ListItemButton>
									</Menu>
								</Box>
							</List>
						</Grid>
					</Box>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default NewsBar;
