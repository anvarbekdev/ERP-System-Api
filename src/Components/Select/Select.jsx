const Select = ({ year, years, setYear }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...year, input.value];
			setYear(state);
		} else {
			const state = year.filter((val) => val !== input.value);
			setYear(state);
		}
	};

	return (
		<div className="d-flex flex-column align-items-end">
			<div className="d-flex">
				<small>{t("year")}</small>
				{years.map((year) => (
					<div className="px-1" key={year}>
						<input
							className="form-check-input "
							type="checkbox"
							value={year}
							onChange={onChange}
						/>
						<span className="m-1">{year}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Select;
