import React from "react";
import classnames from "classnames";

function SelectGroupDe({ label, name, onChangeHandler, errors, optionValue }) {
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
				<option value="B.Tech">B.Tech</option>
				<option value="BBA">BBA</option>
				<option value="B.Sc">B.Sc</option>
			</select>
			{errors && <div className="invalid-feedback">{errors}</div>}
		</div>
	);
}

export default SelectGroupDe;
