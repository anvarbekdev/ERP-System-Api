import { lazy, Suspense } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const FacultyStudentLoginPags = lazy(() =>
  import("./Pages/FacultyStudentLoginPags")
);
const FacultyInterface = lazy(() => import("./Pages/FacultyInterface"));
const StudentHomes = lazy(() => import("./Pages/StudentHomes"));
// const NewsPage = lazy(() => import("./Pages/NewsPage"));
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome"));
const DekanHome = lazy(() => import("./Pages/Admin/DekanHome"));

import FacultyUpdatePassword from "./Pages/FacultyUpdatePassword";
import FacultyProfile from "./Pages/FacultyProfile";
import FacultyUpdateProfile from "./Pages/Faculty/FacultyUpdateProfile";
import AttendenceFaculty from "./Pages/AttendenceFaculty";
import StudentUpdatePassword from "./Pages/StudentUpdatePassword";
import StudentAttendencePage from "./Pages/StudentAttendencePage";
import StudentTestPerformace from "./Pages/Student/StudentTestPerformance";
import StudentSubjectList from "./Pages/Student/StudentSubjectList";
import StudentUpdateProfile from "./Pages/StudentUpdateProfile";
import StudentProfile from "./Pages/StudentProfile";
import StudentDetails from "./Pages/StudentDetails";
import AdminAddFaculty from "./Pages/AdminAddFaculty";
import AdminAddStudent from "./Pages/AdminAddStudent";
import AdminUpdatePassword from "./Pages/AdminUpdatePassword";
import AdminGetAllSubjects from "./Pages/Admin/AdminGetAllSubjects";
// import AdminAddAdmin from "./Pages/Admin/AdminAddAdmin";
import AdminUpdateProfile from "./Pages/AdminUpdateProfile";
import AdminProfile from "./Pages/Admin/AdminProfile";
import AdminAddNews from "./Pages/Admin/AdminAddNews";
// import NewsUpdateProfile from "./Pages/NewsUpdateProfile";
// import NewsUpdatePassword from "./Pages/NewsUpdatePassword";
// import UploadPost from "./Pages/UplaodPost";
const GetNewsPage = lazy(() => import("./Pages/GetNewsPage"));

import ForgotPassword from "./Pages/ForgotPassword";
import RecieverUserDetails from "./Pages/RecieverUserDetails";
import Chat from "./Pages/Chat";

import setAuthToken from "./redux/utils/setAuthToken";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { setAdminUser, adminLogout } from "./redux/action/adminAction";
import { setNewsUser, newsLogout } from "./redux/action/newsAction";
import { setStudentUser, studentLogout } from "./redux/action/studentAction";
import { setFacultyUser, facultyLogout } from "./redux/action/facultyAction";
import { dekanLogout, setDekanUser } from "./redux/action/dekanAction";

import { Box, createTheme, ThemeProvider } from "@mui/material";
// import NewsProfile from "./Pages/NewsProfile";
import DekanProfile from "./Pages/Admin/DekanProfile";
import DekanAddStudent from "./Pages/DekanAddStudent";
import DekanUpdatePassword from "./Pages/DekanUpdatePassword";
import DekanAddSubject from "./Pages/DekanAddSubject";
import DekanGetAllSubjects from "./Pages/Admin/DekanGetAllSubjects";
import DekanUpdateProfile from "./Pages/DekanUpdateProfile";
import DekanStudentDetails from "./Pages/Admin/DekanStudentDetails";
// import UploadGallery from "./Pages/UplaodGallery";
import "./App.css";
import axios from "./api/axios";
import AdminGetAllDekan from "./Pages/Admin/AdminGetAllDekan";
import DekanUploadMarks from "./Pages/Faculty/DekanUploadMarks";
import AdminNewsDetails from "./Pages/Admin/AdminNewsDetails";
import DekanSubjectDetails from "./Pages/Admin/DekanSubjectDetails";
import Login from "./Pages/Login";
// Translation
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import AdminFacultyDetail from "./Pages/Admin/AdminFacultyDetail";
import AdminDekanDetail from "./Pages/Admin/AdminDekanDetail";

if (window.localStorage.facultyJwtToken) {
  setAuthToken(localStorage.facultyJwtToken);
  const decoded = jwt_decode(localStorage.facultyJwtToken);

  store.dispatch(setFacultyUser(decoded));

  // Check htmlFor expired token

  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(facultyLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.studentJwtToken) {
  setAuthToken(localStorage.studentJwtToken);
  const decoded = jwt_decode(localStorage.studentJwtToken);

  store.dispatch(setStudentUser(decoded));

  // Check htmlFor expired token

  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(studentLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.adminJwtToken) {
  setAuthToken(localStorage.adminJwtToken);
  const decoded = jwt_decode(localStorage.adminJwtToken);

  store.dispatch(setAdminUser(decoded));

  // Check htmlFor expired token

  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(adminLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.dekanJwtToken) {
  setAuthToken(localStorage.dekanJwtToken);
  const decoded = jwt_decode(localStorage.dekanJwtToken);

  store.dispatch(setDekanUser(decoded));

  // Check htmlFor expired token
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(dekanLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.newsJwtToken) {
  setAuthToken(localStorage.newsJwtToken);
  const decoded = jwt_decode(localStorage.newsJwtToken);

  store.dispatch(setNewsUser(decoded));

  // Check htmlFor expired token
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(newsLogout());
    window.location.href = "/newsLogin";
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // log the user out
      // example: remove the user token from local storage
      localStorage.removeItem("facultyJwtToken");
      localStorage.removeItem("studentJwtToken");
      localStorage.removeItem("adminJwtToken");
      localStorage.removeItem("dekanJwtToken");
      localStorage.removeItem("newsJwtToken");
      // redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

function App() {
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "italic",
      },
    },
  });

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  onWindowMatch();
  useEffect(() => {
    switch (mode) {
      case "dark":
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        localStorage.setItem("theme", "light");
        break;
      default:
        onWindowMatch();
        break;
    }
  }, [mode]);

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ["en", "uz"],
      fallbackLng: "en",
      detection: {
        order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
        caches: ["cookie"],
      },
      backend: {
        loadPath: "/assets/locales/{{lng}}/translation.json",
      },
      react: { useSuspense: false },
    });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box color={"text.primary"} bgcolor="background.default">
          <Router>
            <Suspense
              fallback={
                <div className="spin_con">
                  <div className="spinner"></div>
                </div>
              }
            >
              <Routes>
                <Route
                  exact
                  path="/"
                  //   element={<Login />}
                  //   element={<Navigate to="/login" />}
                  element={
                    <FacultyStudentLoginPags setMode={setMode} mode={mode} />
                  }
                >
                  <Route
                    path=""
                    element={<Login mode={mode} setMode={setMode} />}
                  />
                  <Route exact path="/faculty" element={<FacultyInterface />}>
                    <Route path="" element={<FacultyProfile />} />
                    <Route
                      path="updateProfile"
                      element={<FacultyUpdateProfile />}
                    />
                    <Route
                      path="updatePassword"
                      element={<FacultyUpdatePassword />}
                    />
                    <Route
                      path="attendenceFaculty"
                      element={<AttendenceFaculty />}
                    />
                  </Route>
                  <Route exact path="/student" element={<StudentHomes />}>
                    <Route path="" element={<StudentProfile />} />
                    <Route
                      path="testPerformance"
                      element={<StudentTestPerformace />}
                    />
                    <Route
                      path="checkAttendence"
                      element={<StudentAttendencePage />}
                    />
                    <Route
                      path="getAllSubjects"
                      element={<StudentSubjectList />}
                    />
                    <Route
                      path="updateProfile"
                      element={<StudentUpdateProfile />}
                    />
                    <Route
                      path="updatePassword"
                      element={<StudentUpdatePassword />}
                    />
                    <Route
                      path=":registrationNumber"
                      element={<RecieverUserDetails />}
                    />
                    <Route path="chat" element={<StudentDetails />} />
                  </Route>
                  <Route exact path="/admin" element={<AdminHome />}>
                    <Route path="" element={<AdminProfile />} />
                    <Route
                      path="updateProfile"
                      element={<AdminUpdateProfile />}
                    />
                    <Route path="addStudent" element={<AdminAddStudent />} />
                    <Route path="allDekans" element={<AdminGetAllDekan />}>
                      <Route path=":id" element={<AdminDekanDetail />} />
                    </Route>
                    <Route path="addFaculty" element={<AdminAddFaculty />}>
                      <Route path=":id" element={<AdminFacultyDetail />} />
                    </Route>
                    <Route
                      path="updatePassword"
                      element={<AdminUpdatePassword />}
                    />
                    <Route path="adminAddNews" element={<AdminAddNews />}>
                      <Route path=":id" element={<AdminNewsDetails />} />
                    </Route>
                    {/* <Route path="addAdmin" element={<AdminAddAdmin />} /> */}
                    <Route
                      path="allSubject"
                      element={<AdminGetAllSubjects />}
                    />
                  </Route>
                  <Route exact path="/dekan" element={<DekanHome />}>
                    <Route path="" element={<DekanProfile />} />
                    <Route
                      path="updateProfile"
                      element={<DekanUpdateProfile />}
                    />
                    <Route path="uploadMarks" element={<DekanUploadMarks />} />
                    <Route path="addStudent" element={<DekanAddStudent />}>
                      <Route path=":id" element={<DekanStudentDetails />} />
                    </Route>
                    <Route path="addSubject" element={<DekanAddSubject />}>
                      <Route path=":id" element={<DekanSubjectDetails />} />
                    </Route>
                    <Route
                      path="updatePassword"
                      element={<DekanUpdatePassword />}
                    />
                    <Route
                      path="allSubject"
                      element={<DekanGetAllSubjects />}
                    />
                    {/* <Route path="addFaculty" element={<AdminAddFaculty />} /> */}
                    {/* <Route path="adminAddNews" element={<AdminAddNews />} /> */}
                    {/* <Route path="addAdmin" element={<AdminAddAdmin />} /> */}
                    {/* <Route path="allFaculties" element={<AdminGetAllFaculty />} /> */}
                  </Route>
                  {/* <Route exact path="/news" element={<NewsPage />}>
										<Route path="" element={<NewsProfile />} />
										<Route path="uploadPost" element={<UploadPost />} />
										<Route path="uploadGallery" element={<UploadGallery />} />
										<Route
											path="updateProfile"
											element={<NewsUpdateProfile />}
										/>
										<Route
											path="updatePassword"
											element={<NewsUpdatePassword />}
										/>
					</Route> */}
                </Route>
                {/* <Route exact path="/login" element={<Login />} /> */}
                <Route
                  exact
                  path="/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route exact path="/chat/:room" element={<Chat />} />{" "}
                {/*error*/}
              </Routes>
            </Suspense>
          </Router>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
