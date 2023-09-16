// Packages
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductState } from "@/types/product";

// Redux
import {
	useAddNewProductMutation,
	useGetAllProductsQuery
} from "@/features/product/productSlice";

const MAX_FILE_SIZE = 5120;

export default function CreateProduct(): ReactElement {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ProductState>();
	const [preview, setPreview] = useState<string>("");
	const [image, setImage] = useState<Blob>(new Blob());
	const [addNewProduct] = useAddNewProductMutation();
	const { refetch } = useGetAllProductsQuery("");

	function HandleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const file = e.target.files ? (e.target.files[0] as Blob) : null;
		const filesizeKilobytes = file ? file.size / 1024 : 0;
		if (!file?.name.match(/\.(jpg|jpeg|png|webp)$/)) {
			alert("Please use a valid image type.");
		} else if (filesizeKilobytes > MAX_FILE_SIZE) {
			alert("Image size too large. Please resize or optimize the image.");
		} else {
			setPreview(URL.createObjectURL(file ? file : new Blob()));
			setImage(file);
		}
	}

	const onSubmit: SubmitHandler<ProductState> = async (data) => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
		try {
			const cloud_res = await axios.post(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUD_NAME
				}/image/upload`,
				formData
			);
			const image_url = cloud_res.data.secure_url;
			const res = await addNewProduct({
				name: data.name,
				brand: data.brand,
				description: data.description,
				price: data.price,
				SKU: data.SKU,
				image: image_url,
				category: data.category,
				size: data.size
			});
			console.log(res);
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.row}>
				<div className={`${styles.column} ${styles.spaced}`}>
					<img src={preview ? preview : "/default.jpg"} alt="image preview" />
					<label htmlFor="image" className={styles.image_label}>
						Upload Image
					</label>
					<input
						formNoValidate
						id="image"
						className={styles.image_input}
						type="file"
						accept="image/png, image/jpg, image/jpeg, image/webp"
						onChange={HandleImageChange}
					/>
				</div>
				<div className={styles.column}>
					<div className={styles.input_group}>
						<div className={styles.label_group}>
							<label
								htmlFor="name"
								className={errors.name?.message ? styles.error : null}
							>
								Name
							</label>
							{errors.name?.message && (
								<span className={styles.error}>{errors.name?.message}</span>
							)}
						</div>
						<input
							formNoValidate
							id="name"
							{...register("name", {
								required: "Required",
								maxLength: {
									value: 80,
									message: "Name exceeds limit"
								}
							})}
							placeholder="Add product name..."
						/>
					</div>
					<div className={styles.input_row}>
						<div className={styles.input_group}>
							<div className={styles.label_group}>
								<label
									htmlFor="brand"
									className={errors.brand?.message ? styles.error : null}
								>
									Brand
								</label>
								{errors.brand?.message && (
									<span className={styles.error}>{errors.brand?.message}</span>
								)}
							</div>
							<input
								formNoValidate
								id="brand"
								{...register("brand", {
									required: "Required"
								})}
								placeholder="Add product brand..."
							/>
						</div>
						<div className={styles.input_group}>
							<div className={styles.label_group}>
								<label
									htmlFor="category"
									className={errors.category?.message ? styles.error : null}
								>
									Category
								</label>
								{errors.category?.message && (
									<span className={styles.error}>
										{errors.category?.message}
									</span>
								)}
							</div>
							<input
								formNoValidate
								id="category"
								{...register("category", {
									required: "Required"
								})}
								placeholder="Add product category..."
							/>
						</div>
					</div>
					<div className={styles.input_group}>
						<div className={styles.label_group}>
							<label
								htmlFor="desc"
								className={errors.description?.message ? styles.error : null}
							>
								Description
							</label>
							{errors.description?.message && (
								<span className={styles.error}>
									{errors.description?.message}
								</span>
							)}
						</div>
						<textarea
							id="desc"
							rows={5}
							{...register("description", { required: "Required" })}
							placeholder="Add a description to your product..."
						/>
						<div className={styles.input_row}>
							<div className={styles.input_group}>
								<div className={styles.label_group}>
									<label
										htmlFor="price"
										className={errors.price?.message ? styles.error : null}
									>
										Price
									</label>
									{errors.price?.message && (
										<span className={styles.error}>
											{errors.price?.message}
										</span>
									)}
								</div>
								<input
									formNoValidate
									id="price"
									{...register("price", {
										min: 0.01,
										required: "Required",
										pattern: {
											value: /[0-9.]/,
											message: "Numbers only"
										}
									})}
									step="0.01"
									placeholder="0.00"
								/>
							</div>
							<div className={styles.input_group}>
								<div className={styles.label_group}>
									<label
										htmlFor="SKU"
										className={errors.SKU?.message ? styles.error : null}
									>
										SKU
									</label>
									{errors.SKU?.message && (
										<span className={styles.error}>{errors.SKU?.message}</span>
									)}
								</div>
								<input
									formNoValidate
									id="SKU"
									{...register("SKU", {
										required: "Required",
										pattern: {
											value: /[0-9]/,
											message: "Numbers only"
										}
									})}
									placeholder="Add product SKU..."
								/>
							</div>
						</div>
					</div>
					<div className={styles.label_group}>
						<label
							htmlFor="size"
							className={errors.size?.message ? styles.error : null}
						>
							Size
						</label>
						{errors.size?.message && (
							<span className={styles.error}>{errors.size?.message}</span>
						)}
					</div>
					<input
						formNoValidate
						id="size"
						{...register("size", {
							required: "Required"
						})}
						placeholder="Add product size..."
					/>
				</div>
			</div>
			<div className={styles.submit_row}>
				<input className={styles.submit} type="submit" value="Create Product" />
				<button
					className={styles.clear}
					type="button"
					onClick={() => {
						reset();
					}}
				>
					Clear
				</button>
			</div>
		</form>
	);
}
