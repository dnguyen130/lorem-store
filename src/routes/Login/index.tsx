import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "@/styles/routes/login.module.css";

interface LoginType {
	email: string;
	password: string;
}

export default function Login(): ReactElement {
	const {
		// register,
		handleSubmit
		// formState: { errors }
	} = useForm<LoginType>();

	const onSubmit: SubmitHandler<LoginType> = async (data) => {
		console.log(data);
	};

	return (
		<div className={styles.container}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}></form>
		</div>
	);
}
