const Filter = ({ filter, departments, setDepartment }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filter, input.value];
			setDepartment(state);
		} else {
			const state = filter.filter((val) => val !== input.value);
			setDepartment(state);
		}
	};

	return (
		<div>
			<div className="d-flex flex-column align-items-end">
				<div className="d-flex">
					{departments.map((department) => (
						<div className="px-1" key={department}>
							<input
								className="form-check-input"
								type="checkbox"
								value={department}
								onChange={onChange}
							/>
							<span className="m-1">{department}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Filter;
