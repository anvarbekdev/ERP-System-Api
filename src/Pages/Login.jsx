import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newsLogin } from "../redux/action/newsAction";
import classnames from "classnames";
// import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import "../Style/facultyStudentLogin.css";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newsRegNum, setNewsRegNum] = useState("");
  const [newsPassword, setNewsPassword] = useState("");
  const [errorsNewsHelper, setErrorsNewsHelper] = useState({});
  const [isNewsLoading, setIsNewsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.news.isAuthenticated) {
      navigate("/news");
    } else if (store.dekan.isAuthenticated) {
      navigate("/dekan");
    } else if (store.student.isAuthenticated) {
      navigate("/student");
    } else if (store.admin.isAuthenticated) {
      navigate("/admin");
    } else if (store.faculty.isAuthenticated) {
      navigate("/faculty");
    }
  }, [
    store.news.isAuthenticated,
    store.admin.isAuthenticated,
    store.dekan.isAuthenticated,
    store.faculty.isAuthenticated,
    store.student.isAuthenticated,
  ]);

  useEffect(() => {
    if (store.errorNewsHelper) {
      setErrorsNewsHelper(store.errorNewsHelper);
    }
  }, [store.errorNewsHelper]);

  const newsFormHandler = (e) => {
    e.preventDefault();
    setIsNewsLoading(true);
    dispatch(
      newsLogin({
        registrationNumber: newsRegNum,
        password: newsPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errorNewsHelper || store.news.isAuthenticated) {
      setIsNewsLoading(false);
    } else {
      setIsNewsLoading(false);
    }
  }, [store.errorNewsHelper, store.news.isAuthenticated]);

  return (
    <div
      style={{
        display: "flex",
        // height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      className=""
    >
      <div className="content ">
        <div className="text">{t("login_title")}</div>
        <form noValidate onSubmit={newsFormHandler}>
          <div className="field">
            <input
              onChange={(e) => setNewsRegNum(e.target.value)}
              type="text"
              placeholder="Login"
              value={newsRegNum}
              className={classnames("input", {
                "is-invalid": errorsNewsHelper.registrationNumber,
              })}
              id="facRegId"
            />
            {errorsNewsHelper.registrationNumber && (
              <div className="invalid-feedback">
                {errorsNewsHelper.registrationNumber}
              </div>
            )}
            <span className="span">
              <svg
                className=""
                xml:space="preserve"
                // style="enable-background:new 0 0 512 512"
                style={{ background: "new 0 0 512 512" }}
                viewBox="0 0 512 512"
                y="0"
                x="0"
                height="20"
                width="50"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    className=""
                    data-original="#000000"
                    fill="#595959"
                    d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"
                  ></path>
                </g>
              </svg>
            </span>
            <label className="label">Email or Phone</label>
          </div>
          <div className="field">
            <input
              placeholder={t("password")}
              onChange={(e) => setNewsPassword(e.target.value)}
              value={newsPassword}
              className={classnames("input", {
                "is-invalid": errorsNewsHelper.password,
              })}
              type="password"
              id="passwordFacId"
            />{" "}
            <span className="span">
              <svg
                className=""
                xml:space="preserve"
                // style="enable-background:new 0 0 512 512"
                viewBox="0 0 512 512"
                y="0"
                x="0"
                height="20"
                width="50"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    className=""
                    data-original="#000000"
                    fill="#595959"
                    d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"
                  ></path>
                </g>
              </svg>
            </span>
            <label className="label">{t("password")}</label>
          </div>
          <div className="forgot-pass">
            <Link className="text-center" to="/forgotPassword">
              {t("forgot_password")}
            </Link>
          </div>
          {isNewsLoading ? (
            <><div className="loader"></div></>
          ) : (
            <>
              <button className="button">{t("login_title")}</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
