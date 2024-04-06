import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getStudentByRegName } from "../redux/action/studentAction";
import { useParams } from "react-router-dom";

const RecieverUserDetails = () => {
	const store = useSelector((store) => store);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { registrationNumber } = useParams();

	useEffect(() => {
		dispatch(getStudentByRegName(registrationNumber));
	}, []);

	return (
		<div>
			{store.student.isAuthenticated ? (
				<>
					<div className="container">
						<div className="row mt-5">
							<div className="col-md-2"></div>
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-5">
										<h1>Hello Chat</h1>
										<div className="card" style={{ width: "18rem" }}>
											<img
												style={{ width: "10rem" }}
												className="card-img-top"
												src={store.student.regNumStudent.avatar}
												alt="Card image cap"
											/>
											<div className="card-body">
												<h5 className="card-title">
													{store.student.regNumStudent.name}
												</h5>
												<h5 className="card-title">{}</h5>
												<Link
													to={`/chat/${store.student.regNumStudent.registrationNumber}.${store.student.student.student.registrationNumber}`}>
													CHAT
												</Link>
											</div>
										</div>
									</div>
									<div className="col-md-7">
										<table className="table border">
											<tbody>
												<tr>
													<td>Name</td>
													<td>{store.student.regNumStudent.name}</td>
												</tr>
												<tr>
													<td>Email</td>
													<td>{store.student.regNumStudent.email}</td>
												</tr>
												<tr>
													<td>Login</td>
													<td>
														{store.student.regNumStudent.registrationNumber}
													</td>
												</tr>
												<tr>
													<td>{t("year")}</td>
													<td>{store.student.regNumStudent.year}</td>
												</tr>
												<tr>
													<td>Department</td>
													<td>{store.student.regNumStudent.department}</td>
												</tr>
												<tr>
													<td>Group name</td>
													<td>{store.student.regNumStudent.section}</td>
												</tr>
												<tr>
													<td>Ro'yxatdan o'tgansiz</td>
													<td>{store.student.regNumStudent.batch}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="col-md-2"></div>
						</div>
					</div>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default RecieverUserDetails;
