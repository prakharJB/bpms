import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [passwordError, setPasswordError] = useState();
  const [otp, setOtp] = useState(false);
  const [code, setCode] = useState("");
  const [inValidCode, setInvalidCode] = useState();

  const handleOtpChange = (code) => setCode(code);

  const navigate = useNavigate();

  const OtpSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const verificationData = {
        email: formValue.email,
        code: code,
      };
      var resData = await axios.post(
        `http://localhost:8800/api/auth/verifyOtp`,
        verificationData,
        {
          validateStatus: () => true,
        }
      );

      if (resData && resData.status === 200) {
        // Update user isVerified
        setInvalidCode("");
        alert("user verified");
        navigate("/login");
      } else if (resData && resData.status === 404) {
        alert("Invalid verification code");
        setInvalidCode("Invalid verification code");
      } else if (resData && resData.status === 410) {
        alert("Code has expired");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();

    console.log(formValue);

    if (formValue.password !== formValue.repassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setOtp(true)
      const result = await axios.post(
        `http://localhost:8800/api/auth/register`,
        formValue
      );
    }
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      {otp === true ? (
                        <div>
                          {" "}
                          <h1>Enter OTP</h1>
                          <OtpInput
                            value={code}
                            onChange={handleOtpChange}
                            numInputs={6}
                            separator={<span style={{ width: "8px" }}></span>}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            inputStyle={{
                              border: "1px solid transparent",
                              borderRadius: "8px",
                              width: "54px",
                              height: "54px",
                              fontSize: "12px",
                              color: "#000",
                              fontWeight: "400",
                              caretColor: "blue",
                            }}
                            focusStyle={{
                              border: "1px solid #CFD3DB",
                              outline: "none",
                            }}
                          />
                          <button onClick={(e) => OtpSubmit(e)}>
                            Submit OTP
                          </button>
                        </div>
                      ) : (
                        <>
                          <form
                            className="mx-1 mx-md-4"
                            onSubmit={(e) => signIn(e)}
                          >
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  required
                                  name="name"
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-label"
                                  for="form3Example1c"
                                >
                                  Your Name
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="form3Example3c"
                                  className="form-control"
                                  required
                                  name="email"
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-label"
                                  for="form3Example3c"
                                >
                                  Your Email
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4c"
                                  className="form-control"
                                  required
                                  name="password"
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-label"
                                  for="form3Example4c"
                                >
                                  Password
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4cd"
                                  className="form-control"
                                  required
                                  name="repassword"
                                  onChange={handleChange}
                                />
                                {passwordError === true ? (
                                  <p>Password did not match!</p>
                                ) : (
                                  ""
                                )}

                                <label
                                  className="form-label"
                                  for="form3Example4cd"
                                >
                                  Repeat your password
                                </label>
                              </div>
                            </div>

                            <div className="form-check d-flex justify-content-center mb-5">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                value=""
                                id="form2Example3c"
                                required
                                name="terms"
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                for="form2Example3"
                                required
                              >
                                I agree all statements in{" "}
                                <a href="#!">Terms of service</a>
                              </label>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                              >
                                Register
                              </button>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Signup;
