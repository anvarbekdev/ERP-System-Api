import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { newsAddPost } from "../redux/action/newsAction";
import JoditTextEditor from "../Components/JoditEditor";

const UploadPost = () => {
	const store = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [muallif, setMuallif] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [desc, setDesc] = useState("");
	const getValue = (desc) => {
		setDesc(desc);
	};

	const imagehandler = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setImage(img);
		}
	};

	const formHandler = async (e) => {
		e.preventDefault();
		if (store.errorNewsHelper) {
			setError(store.errorNewsHelper);
		}
		setTimeout(() => {
			setError({});
		}, 5000);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", image);
		formData.append("desc", desc);
		formData.append("muallif", muallif);
		setIsLoading(true);
		dispatch(newsAddPost(formData));
	};
	useEffect(() => {
		if (store.errorNewsHelper || store.news.newsAddPostFlag) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [store.errorNewsHelper, store.news.newsAddPostFlag]);

	return (
		<div>
			{store.news.isAuthenticated ? (
				<>
					<form noValidate onSubmit={formHandler}>
						<div className="form-group">
							<label htmlFor="newsId">
								<h4>Sarlavha</h4>
							</label>
							<input
								onChange={(e) => setTitle(e.target.value)}
								type="text"
								placeholder="5 ta so'zdan kam bo'lmasin!"
								className={classnames("form-control", {
									"is-invalid": error.title,
								})}
								id="newsId"
							/>
							{error.title && (
								<div className="invalid-feedback mb-3">{error.title}</div>
							)}
						</div>
						<div className="form-group mt-3">
							<label htmlFor="inputId">
								<h4>Rasm</h4>
							</label>
							<input
								required
								className="form-control"
								type="file"
								accept=".jpg,.png,.jpeg"
								id="inputId"
								onChange={imagehandler}></input>
						</div>
						<div className="form-group mt-3">
							<label htmlFor="designationId">
								<h5>Yangilik haqida kengroq ma'lumot!!</h5>
							</label>
							<JoditTextEditor initialValue="" getValue={getValue} />

							{error.desc && (
								<div className="invalid-feedback mb-3">{error.desc}</div>
							)}
						</div>
						<div className="form-group mt-3">
							<label htmlFor="muallifId">Tashkilot nomi</label>
							<input
								onChange={(e) => setMuallif(e.target.value)}
								type="text"
								placeholder="Misol: IT Center"
								className={classnames("form-control", {
									"is-invalid": error.muallif,
								})}
								id="muallifId"
							/>
							{error.muallif && (
								<div className="invalid-feedback mb-3">{error.muallif}</div>
							)}
						</div>

						{isLoading && (
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only"></span>
							</div>
						)}
						{!isLoading && (
							<button type="submit" className="btn btn-info mt-3">
								Yuklash
							</button>
						)}
					</form>
				</>
			) : (
				navigate("/login")
			)}
		</div>
	);
};

export default UploadPost;
