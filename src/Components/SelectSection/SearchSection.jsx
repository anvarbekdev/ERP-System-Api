const SearchSection = ({ setSection }) => {
	return (
		<input
			type="text"
			className="form-control"
			placeholder="Bo'limlarni qidiring"
			onChange={({ currentTarget: input }) => setSection(input.value)}
		/>
	);
};

export default SearchSection;
