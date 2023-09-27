import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "@/styles/routes/signup.module.css";
import { useSignupMutation } from "@/slices/user/userSlice";

interface SignupType {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

export default function Signup(): ReactElement {
	const {
		register,
		handleSubmit
		// formState: { errors }
	} = useForm<SignupType>();
	const [signup] = useSignupMutation();

	const onSubmit: SubmitHandler<SignupType> = async (data) => {
		const res = await signup({
			email: data.email,
			password: data.password,
			first_name: data.first_name,
			last_name: data.last_name
		});
		console.log("response", res);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>Account Creation</h2>
				<label htmlFor="email">Email</label>
				<input
					formNoValidate
					{...register("email", {
						required: "Required"
					})}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					formNoValidate
					{...register("password", {
						required: "Required",
						minLength: {
							value: 8,
							message: "Minimum 8 characters"
						}
					})}
				/>
				<div className={styles.name_row}>
					<div>
						<label htmlFor="first_name">First Name</label>
						<input
							formNoValidate
							{...register("first_name", {
								required: "Required"
							})}
						/>
					</div>
					<div>
						<label htmlFor="last_name">Last Name</label>
						<input
							formNoValidate
							{...register("last_name", {
								required: "Required"
							})}
						/>
					</div>
				</div>
				<button type="submit">Create Account</button>
			</form>
		</div>
	);
}
