// React
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductState } from "@/types/product";

// Axios
// import axios from "axios";

const MAX_FILE_SIZE = 5120;

export default function CreateProduct(): ReactElement {
	const {
		register,
		handleSubmit
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

	const onSubmit: SubmitHandler<ProductState> = (data) => {
		console.log(data);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<h2>Create Product</h2>
			<div className={styles.row}>
				<div className={styles.column}>
					<label htmlFor="image">Upload Image</label>
					<input
						type="file"
						accept="image/png, image/gif, image/jpeg, image/webp"
						required
						{...register("image")}
						onChange={HandleImageChange}
					/>
					<img src={image} />
				</div>
				<div className={styles.column}>
					<label htmlFor="name">Name</label>
					<input
						id="name"
						required
						{...register("name")}
						placeholder="Add product name..."
					/>
					<label htmlFor="brand">Brand</label>
					<input
						id="brand"
						required
						{...register("brand")}
						placeholder="Add product brand..."
					/>
					<label htmlFor="category">Category</label>
					<input
						id="category"
						required
						{...register("category")}
						placeholder="Add product category..."
					/>
					<label htmlFor="desc">Description</label>
					<textarea
						id="desc"
						rows={5}
						required
						{...register("description")}
						placeholder="Add a description to your product..."
					/>
					<label htmlFor="price">Price</label>
					<input
						type="number"
						id="price"
						required
						{...(register("price"), { min: 0.01 })}
						step="0.01"
						placeholder="0.00"
					/>
					<label htmlFor="SKU">SKU</label>
					<input
						type="number"
						id="SKU"
						required
						{...register("SKU")}
						placeholder="Add product SKU..."
					/>
					<input type="submit" />
				</div>
			</div>
		</form>
	);
}
