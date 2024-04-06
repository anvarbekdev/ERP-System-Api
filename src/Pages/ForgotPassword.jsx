import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOTPStudent, submitOTPStudent } from "../redux/action/studentAction";
import classnames from "classnames";
import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [helper, setHelper] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (store.error) {
      setErrors(store.error);
    }
  }, [store.error]);

  useEffect(() => {
    if (store.student.flag) {
      setHelper(true);
      const intervalId = setInterval(() => {
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : seconds));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [store.student.flag]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const timeColor = () => {
    if (seconds > 120) {
      return "green";
    } else if (seconds > 60) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const alertText = () => {
    if (seconds === 0) {
      return t("action_time");
    } else {
      return t("valid");
    }
  };

  const sendOTPHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(getOTPStudent({ email }, t));
    setTimeout(() => {
      setIsLoading(false);
    }, 7000);
  };

  const submitOTPHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      submitOTPStudent(
        { email, otp, newPassword, confirmNewPassword },
        navigate,
        t
      )
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Grid
      sx={{ height: "100vh", width: "100%" }}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <ToastContainer />
      {!helper ? (
        <>
          <div className="popup">
            <form className="form" noValidate onSubmit={sendOTPHandler}>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 34 34"
                  height="34"
                  width="34"
                >
                  <path
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    stroke="#115DFC"
                    d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    stroke="#115DFC"
                    d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"
                  ></path>
                  <path
                    stroke-width="2.5"
                    stroke="#115DFC"
                    d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    stroke="#115DFC"
                    d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"
                  ></path>
                </svg>
              </div>
              <div className="note">
                <label className="title">{t("forgot_email")}</label>
              </div>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className={classnames("form-control input_field", {
                  "is-invalid": errors.email,
                })}
                id="exampleInputEmail11"
                placeholder="Enter your e-mail"
                aria-describedby="emailHelp"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <div className="row justify-content-center">
                <div className="col text-center mt-3">
                  {isLoading && (
                    <button className="btn btn-primary" type="button" disabled>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  )}
                </div>
              </div>
              {!isLoading && (
                <button type="submit" className="submit btn-block">
                  {t("send_code")}
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        <>
          <form noValidate onSubmit={submitOTPHandler} className="shadoww">
            <div className="form-group mb-2 ">
              <label htmlFor="exampleInputEmail1">Code</label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="number"
                className={classnames("form-control", {
                  "is-invalid": errors.otp,
                })}
                id="exampleInputEmail1"
              />
              {errors.otp && (
                <div className="invalid-feedback">{errors.otp}</div>
              )}
            </div>
			
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail2">{t("new_password")}</label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.newPassword,
                })}
                id="exampleInputEmail2"
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail3">
                {t("confirm_password")}
              </label>
              <input
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                value={confirmNewPassword}
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.confirmNewPassword,
                })}
                id="exampleInputEmail3"
              />
              {errors.confirmNewPassword && (
                <div className="invalid-feedback">
                  {errors.confirmNewPassword}
                </div>
              )}
            </div>
            <small
              style={{ color: timeColor(), display: "block" }}
              id="emailHelp"
            >
              Code {formatTime(seconds)} {alertText()}
            </small>
            <div className="row justify-content-center">
              <div className="col text-center mt-3">
                {loading && (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
              </div>
            </div>
            <div className="text-center">
              {!loading && (
                <button type="submit" className="btn btn-info btn-block mt-3">
                  {t("submit")}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </Grid>
  );
};

export default ForgotPassword;
