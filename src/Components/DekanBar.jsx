import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./facultyBar.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
import Groups2Icon from "@mui/icons-material/Groups2";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { dekanLogout } from "../redux/action/dekanAction";
import { useTranslation } from "react-i18next";

const DekanBar = ({ avatar, name }) => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const logoutHandler = () => {
		dispatch(dekanLogout());
		navigate("/");
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const opens = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [state, setState] = React.useState({
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
	function handleReload() {
		setTimeout(() => {
			window.location.reload();
		}, [1000]);
	}
	const list = (anchor) => (
		<Box role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
			<Grid
				container
				direction="column"
				alignItems="flex-start"
				sx={{
					width: 200,
					height: "calc(100vh - 60px)",
					display: { xs: "flex", md: "none" },
				}}>
				<List sx={{ width: "100%" }}>
					<Link to="addSubject" className="link">
						<ListItem disablePadding>
							<ListItemButton sx={{ wordWrap: "wrap", paddingRight: 7 }}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<AutoStoriesIcon />
								</ListItemIcon>
								<ListItemText primary={t("subjects")} />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link to="addStudent" className="link">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<Groups2Icon />
								</ListItemIcon>
								<ListItemText primary={t("students")} />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link to="uploadMarks" className="link">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<BorderColorIcon />
								</ListItemIcon>
								<ListItemText primary={t("assessment")} />
							</ListItemButton>
						</ListItem>
					</Link>
					<Link to="/dekan" className="link">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}>
									<AccountBoxIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
					</Link>

					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemButton
							id="basic-button"
							aria-controls={opens ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={opens ? "true" : undefined}
							onClick={handleClick}>
							<ListItemIcon>
								<Tooltip title="Sozlamalarni oching">
									<Avatar
										src={avatar}
										sx={{ width: 40, height: 40, border: "solid" }}
									/>
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
							<Link className="link" onClick={handleClose} to="updatePassword">
								{t("password_update")}
							</Link>
						</ListItemButton>
						<ListItemButton onClick={logoutHandler}>
							<Typography color="error">{t("logout")}</Typography>
						</ListItemButton>
					</Menu>
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

	return (
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
							{store.dekan.isAuthenticated && <>{list("left")}</>}
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
						<Link to="addSubject" className="link">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
										}}>
										<AutoStoriesIcon />
									</ListItemIcon>
									<ListItemText primary={t("subjects")} />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link to="addStudent" className="link">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
										}}>
										<Groups2Icon />
									</ListItemIcon>
									<ListItemText primary={t("students")} />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link to="uploadMarks" className="link">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
										}}>
										<BorderColorIcon />
									</ListItemIcon>
									<ListItemText primary={t("assessment")} />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link to="/dekan" className="link">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
										}}>
										<AccountBoxIcon />
									</ListItemIcon>
									<ListItemText primary="Profile" />
								</ListItemButton>
							</ListItem>
						</Link>
					</List>
					<Divider />
					<List sx={{ width: "100%" }}>
						<ListItem disablePadding sx={{ display: "block" }}>
							<ListItemButton
								id="basic-button"
								aria-controls={opens ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={opens ? "true" : undefined}
								onClick={handleClick}>
								<ListItemIcon>
									<Tooltip title="Sozlamalarni oching">
										<Avatar
											src={avatar}
											sx={{ width: 40, height: 40, border: "solid" }}
										/>
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
					</List>
				</Grid>
			</Box>
		</>
	);
};

export default DekanBar;
