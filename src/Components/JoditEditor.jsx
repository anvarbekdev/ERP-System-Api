import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import './jodit.css'

const JoditTextEditor = ({ initialValue, getValue }) => {
	const editor = useRef(null);

	return (
		<JoditEditor
			ref={editor}
			className='jodit'
			value={initialValue}
			onChange={(newContent) => getValue(newContent)}
		/>
	);
};

export default JoditTextEditor;
