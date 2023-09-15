// Packages
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductState } from "@/types/product";

const MAX_FILE_SIZE = 5120;

export default function CreateProduct(): ReactElement {
	const {
		register,
		handleSubmit,
		reset
		// formState: { errors }
	} = useForm<ProductState>();
	const [image, setImage] = useState<string>("");

	function HandleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const file = e.target.files ? (e.target.files[0] as Blob) : null;
		const filesizeKilobytes = file ? file.size / 1024 : 0;
		if (!file?.name.match(/\.(jpg|jpeg|png|webp)$/)) {
			alert("Please use a valid image type.");
		} else if (filesizeKilobytes > MAX_FILE_SIZE) {
			alert("Image size too large. Please resize or optimize the image.");
		} else {
			setImage(URL.createObjectURL(file ? file : new Blob()));
		}
	}

	const onSubmit: SubmitHandler<ProductState> = async (data) => {
		console.log("fire", data);
		const formData = new FormData();
		formData.append("file", data.image[0]);
		formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
		const cloud_res = await axios.post(
			`https://api.cloudinary.com/v1_1/${
				import.meta.env.VITE_CLOUD_NAME
			}/image/upload`,
			formData
		);
		const image_url = cloud_res.data.secure_url;
		console.log(data);
		const res = await axios.post("/product", {
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
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.row}>
				<div className={`${styles.column} ${styles.spaced}`}>
					<img src={image ? image : "/default.jpg"} alt="image preivew" />
					<label htmlFor="image" className={styles.image_label}>
						Upload Image
					</label>
					<input
						id="image"
						className={styles.image_input}
						type="file"
						accept="image/png, image/jpg, image/jpeg, image/webp"
						required
						{...register("image")}
						onChange={HandleImageChange}
					/>
				</div>
				<div className={styles.column}>
					<div className={styles.input_group}>
						<label htmlFor="name">Name</label>
						<input
							id="name"
							required
							{...register("name")}
							placeholder="Add product name..."
						/>
					</div>
					<div className={styles.input_row}>
						<div className={styles.input_group}>
							<label htmlFor="brand">Brand</label>
							<input
								id="brand"
								required
								{...register("brand")}
								placeholder="Add product brand..."
							/>
						</div>
						<div className={styles.input_group}>
							<label htmlFor="category">Category</label>
							<input
								id="category"
								required
								{...register("category")}
								placeholder="Add product category..."
							/>
						</div>
					</div>
					<div className={styles.input_group}>
						<label htmlFor="desc">Description</label>
						<textarea
							id="desc"
							rows={5}
							required
							{...register("description")}
							placeholder="Add a description to your product..."
						/>
						<div className={styles.input_row}>
							<div className={styles.input_group}>
								<label htmlFor="price">Price</label>
								<input
									type="number"
									id="price"
									required
									{...register("price", { min: 0.01 })}
									step="0.01"
									placeholder="0.00"
								/>
							</div>
							<div className={styles.input_group}>
								<label htmlFor="SKU">SKU</label>
								<input
									type="number"
									id="SKU"
									required
									{...register("SKU")}
									placeholder="Add product SKU..."
								/>
							</div>
						</div>
					</div>
					<label htmlFor="size">Size</label>
					<input
						id="size"
						required
						{...register("size")}
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
