import React from "react";
import classnames from "classnames";

function SelectGroupYe({ label, name, onChangeHandler, errors, optionValue }) {
	return (
		<div className="mb-3">
			<label htmlFor="departmentId">{label}</label>
			<select
				name={name}
				onChange={onChangeHandler}
				className={classnames("form-control", {
					"is-invalid": errors,
				})}
				id="departmentId">
				<option value={optionValue}>{optionValue}</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>
			{errors && <div className="invalid-feedback">{errors}</div>}
		</div>
	);
}

export default SelectGroupYe;
