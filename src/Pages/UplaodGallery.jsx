import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { newsAddGallery } from "../redux/action/newsAction";

const UploadGallery = () => {
	const store = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
		dispatch(newsAddGallery(formData));
	};

	useEffect(() => {
		if (store.errorNewsHelper) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [store.errorNewsHelper]);

	useEffect(() => {
		if (store.news.galleryLoader === true) {
			setIsLoading(false);
		}
	}, [store.news.galleryLoader]);
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
								placeholder="Rasim haqida qisaqacha voqea!"
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
								<h4>Rasim Select</h4>
							</label>
							<input
								required
								className="form-control"
								type="file"
								accept=".jpg,.png,.jpeg"
								id="inputId"
								onChange={imagehandler}></input>
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

export default UploadGallery;
