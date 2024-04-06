import React from "react";
import classnames from "classnames";

function InputSimple({ placeholder, label, type, onChangeHandler, errors }) {
	return (
		<div className="mb-3">
			<label htmlFor="Email">{label}</label>
			<input
				placeholder={placeholder}
				type={type}
				className={classnames("form-control", { "is-invalid": errors })}
				onChange={onChangeHandler}
			/>
			{errors && <div class="invalid-feedback">{errors}</div>}
		</div>
	);
}

export default InputSimple;
