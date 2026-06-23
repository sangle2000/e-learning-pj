import { useEffect, useState } from "react";
import styles from "./authForm.module.scss"
import { Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../schemas/authSchema";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = (data) => console.log(data)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
        color: "",
        criteria: {
            hasMinLength: false,
            hasLetter: false,
            hasNumber: false,
            hasSpecial: false,
        }
    });

    const passwordValue = watch("password")

    useEffect(() => {
        const hasMinLength = passwordValue.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(passwordValue);
        const hasNumber = /[0-9]/.test(passwordValue);
        const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

        let score = 0;
        if (passwordValue.length > 0) {
            if (hasMinLength) score += 1;
            if (hasLetter) score += 1;
            if (hasNumber) score += 1;
            if (hasSpecial) score += 1;
        }

        let label = "";
        let color = "";
        if (score === 0) {
            label = "";
            color = "transparent";
        } else if (score <= 2) {
            label = "Weak";
            color = "#EF4444"; // red
        } else if (score === 3) {
            label = "Medium";
            color = "#F59E0B"; // orange
        } else {
            label = "Strong";
            color = "#10B981"; // green
        }

        setPasswordStrength({
            score,
            label,
            color,
            criteria: {
                hasMinLength,
                hasLetter,
                hasNumber,
                hasSpecial,
            }
        });
    }, [passwordValue]);

    return (
        <>
            {/* Main Form */}
            <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Name Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
                    <div className={`${styles.inputWrapper} ${errors.username ? styles.hasError : ""}`}>
                        <User size={18} className={styles.inputIcon} />
                        <input
                            id="name"
                            type="text"
                            placeholder="Alex Dev"
                            className={styles.textInput}
                            {...register("username", {
                                onChange: () => {
                                    if (errors.username) {
                                        clearErrors("username")
                                    }
                                }
                            })}
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={`${styles.inputLabel} ${errors.email ? styles.errorTitle : ""}`}>Email Address</label>
                    <div className={`${styles.inputWrapper} ${errors.email ? styles.hasError : ""}`}>
                        <Mail size={18} className={styles.inputIcon} />
                        <input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            className={styles.textInput}
                            {...register("email", {
                                onChange: () => {
                                    if (errors.email) {
                                        clearErrors("email")
                                    }
                                }
                            })}
                        />
                    </div>
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </div>

                {/* Password Input with Strength Indicator */}
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={`${styles.inputLabel} ${errors.password ? styles.errorTitle : ""}`}>Password</label>
                    <div className={`${styles.inputWrapper} ${errors.password ? styles.hasError : ""}`}>
                        <Lock size={18} className={styles.inputIcon} />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            className={styles.textInput}
                            {...register("password", {
                                onChange: () => {
                                    if (errors.password) {
                                        clearErrors("password")
                                    }
                                }
                            })}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {
                        errors.password && <p className={styles.errorText}>{errors.password.message}</p>
                    }

                    {/* Visual Password Strength meter */}
                    {passwordValue.length > 0 && (
                        <div className={styles.strengthMeterWrapper}>
                            <div className={styles.meterTrack}>
                                <div
                                    className={styles.meterFill}
                                    style={{
                                        width: `${(passwordStrength.score / 4) * 100}%`,
                                        backgroundColor: passwordStrength.color
                                    }}
                                />
                            </div>
                            <span className={styles.strengthText} style={{ color: passwordStrength.color }}>
                                Password Strength: <strong>{passwordStrength.label}</strong>
                            </span>

                            {/* Tiny guidelines */}
                            <div className={styles.strengthCriteria}>
                                <div className={`${styles.crit} ${passwordStrength.criteria.hasMinLength ? styles.valid : ""}`}>
                                    <Check size={12} />
                                    <span>Min. 8 chars</span>
                                </div>
                                <div className={`${styles.crit} ${passwordStrength.criteria.hasLetter ? styles.valid : ""}`}>
                                    <Check size={12} />
                                    <span>Letters</span>
                                </div>
                                <div className={`${styles.crit} ${passwordStrength.criteria.hasNumber ? styles.valid : ""}`}>
                                    <Check size={12} />
                                    <span>Numbers</span>
                                </div>
                                <div className={`${styles.crit} ${passwordStrength.criteria.hasSpecial ? styles.valid : ""}`}>
                                    <Check size={12} />
                                    <span>Special chars</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className={`${styles.inputLabel} ${errors.confirmPassword ? styles.errorTitle : ""}`}>Confirm Password</label>
                    <div className={`${styles.inputWrapper} ${errors.confirmPassword ? styles.hasError : ""}`}>
                        <Lock size={18} className={styles.inputIcon} />
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={styles.textInput}
                            {...register("confirmPassword", {
                                onChange: () => {
                                    if (errors.confirmPassword) {
                                        clearErrors("confirmPassword")
                                    }
                                }
                            })}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {
                        errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>
                    }
                </div>

                {/* Agree to Terms Checkbox */}
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkboxInput}
                        // disabled={isSubmitting}
                        />
                        <span className={styles.checkboxCustom} />
                        <span className={styles.checkboxText}>
                            I agree to the{" "}
                            <a href="#terms" className={styles.innerLink} onClick={(e) => e.preventDefault()}>
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#privacy" className={styles.innerLink} onClick={(e) => e.preventDefault()}>
                                Privacy Policy
                            </a>
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={styles.submitBtn}
                // disabled={isSubmitting}
                >
                    <span>Create Account</span>
                    {/* {isSubmitting ? (
                        <span className={styles.loader} />
                    ) : (
                        <>
                            <span>Create Account</span>
                            <ArrowRight size={18} />
                        </>
                    )} */}
                </button>
            </form>
        </>
    )
}