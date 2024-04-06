import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminGetAllStudents from "./Admin/AdminGetAllStudents";

const AdminAddStudent = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	return (
		<div>
			{store.admin.isAuthenticated ? (
				<>
					<AdminGetAllStudents />
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default AdminAddStudent;
