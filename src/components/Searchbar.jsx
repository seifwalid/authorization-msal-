import {useState} from "react";
import "./Searchbar.css";

/**
 * Renders searchbar and dropdown
 * @returns
 */
function Searchbar({onSubmit, loading}) {
	const searchOptions = ["adid", "anid", "location", "ip", "idfa"];

	const [searchType, setSearchType] = useState(searchOptions[0]);
	const [searchData, setSearchData] = useState({});

	return (
		<>
			<h3 className={'me-3'}>Ban-list Lookup</h3>
			<form className="d-flex gap-1 searchbar-container p-2">
				{searchType === "location" ? (
					<>
						<input
							type="number"
							placeholder="lat"
							className="border-0 form-control"
							min={-90}
							max={90}
							value={searchData.lat}
							onChange={(e) => {
								setSearchData({
									lng: searchData.long,
									lat: `${e.target.value}`,
								});
							}}
							disabled={loading}
						/>
						<input
							type="number"
							placeholder="long"
							className="border-0 form-control"
							min={-180}
							max={180}
							value={searchData.long}
							onChange={(e) => {
								setSearchData({
									lat: searchData.lat,
									lng: `${e.target.value}`,
								});
							}}
							disabled={loading}
						/>
					</>
				) : (
					<input
						type="text"
						className="border-0 form-control"
						placeholder={`Enter ${searchType}...`}
						value={searchData[searchType]}
						onChange={(e) => {
							const res = {};
							res[searchType] = e.target.value;
							setSearchData(res);
						}}
						disabled={loading}
					/>
				)}

				<select
					className="form-control w-auto "
					value={searchType}
					onChange={(e) => setSearchType(e.target.value)}
				>
					{searchOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				<button
					onClick={(e) => {
						e.preventDefault();
						onSubmit(searchType, searchData);
					}}
					className="btn btn-primary"
					disabled={loading}
				>
					Search
				</button>
			</form>
		</>
	);
}

export default Searchbar;
