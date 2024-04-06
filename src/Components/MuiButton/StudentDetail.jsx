import { Slide } from "@mui/material";
import React, { useState } from "react";

const StudentDetail = ({checked, icon}) => {
	return (
		<Slide direction="up" in={checked} mountOnEnter unmountOnExit>
			{icon}
		</Slide>
	);
};

export default StudentDetail;
