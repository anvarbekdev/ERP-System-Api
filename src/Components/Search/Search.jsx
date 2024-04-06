const Search = ({ setSearch }) => {
	return (
		<input
			type="text"
			className="form-control me-2"
			placeholder="Full name "
			onChange={({ currentTarget: input }) => setSearch(input.value)}
		/>
	);
};

export default Search;
