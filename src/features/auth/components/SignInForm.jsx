import { useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./authForm.module.scss"
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { httpClient } from "../../../utils/http";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        handleLogin(data)
    }

    const handleLogin = async (data) => {
        try {
            const res = await httpClient.post("/v1/auth/signin", data)

            const accessToken = res.data.accessToken
            const refreshToken = res.data.refreshToken

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            navigate("/")
        } catch {
            throw new Error("Sai tài khoản mật khẩu")
        }

    }

    const [showPassword, setShowPassword] = useState(false)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm} noValidate>
            {/* {generalError && <div className={styles.generalErrorMsg}>{generalError}</div>} */}

            {/* Email Input */}
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
                <div className={`${styles.inputWrapper} ${errors.email ? styles.hasError : ''}`}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className={styles.textInput}
                        {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email không đúng định dạng"
                            }
                        })}
                        tabIndex={1}
                    />
                </div>
                {
                    errors.email && <p className={styles.errorText}>{errors.email.message}</p>
                }
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
                <div className={styles.passwordHeader}>
                    <label htmlFor="password" className={styles.inputLabel}>Password</label>
                    <button
                        type="button"
                        className={styles.forgotLink}
                        onClick={() => alert("Password reset link sent to your email (simulated).")}
                    // disabled={isSubmitting}
                    >
                        Forgot Password?
                    </button>
                </div>
                <div className={`${styles.inputWrapper}`}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={styles.textInput}
                        {...register("password", { required: true })}
                        tabIndex={2}
                    />
                    <button
                        type="button"
                        className={styles.eyeBtn}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        // checked={rememberMe}
                        // onChange={(e) => setRememberMe(e.target.checked)}
                        className={styles.checkboxInput}
                    // disabled={isSubmitting}
                    />
                    <span className={styles.checkboxCustom} />
                    <span className={styles.checkboxText}>Remember me for 30 days</span>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={styles.submitBtn}
            // disabled={isSubmitting}
            >
                <span>Sign In</span>
                {/* {isSubmitting ? (
                  <span className={styles.loader} />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )} */}
            </button>
        </form>
    )
}