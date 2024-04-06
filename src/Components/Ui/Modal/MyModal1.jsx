import { Box, Fab } from "@mui/material";
import React from "react";
import classes from "./MyModal1.module.css";
import CloseIcon from "@mui/icons-material/Close";

function MyModal1({ children, modal, setModal }) {
	const modalClasses = [classes.myModal];
	if (modal) {
		modalClasses.push(classes.active);
	}

	return (
		<Box className={modalClasses.join(" ")} onClick={() => setModal(false)}>
			<Box
				sx={{
					position: "absolute",
					zIndex: 100,
					right: { xs: 0, sm: 100 },
					display: { md: "none" },
				}}>
				<Fab size="small">
					<CloseIcon />
				</Fab>
			</Box>
			<Box
				sx={{ position: "relative" }}
				className={classes.myModalContent}
				onClick={(e) => e.stopPropagation()}>
				{children}
			</Box>
		</Box>
	);
}

export default MyModal1;
