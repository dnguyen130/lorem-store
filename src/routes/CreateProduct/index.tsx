// React
import { ReactElement, useState } from "react";
// import { useForm } from "react-hook-form";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductState } from "@/types/product";

// Axios
import axios from "axios";

const MAX_FILE_SIZE = 5120;

export default function CreateProduct(): ReactElement {
	const [image, setImage] = useState<string>("");
	const [product, setProduct] = useState<ProductState>({
		name: "",
		brand: "",
		description: "",
		price: 0,
		SKU: 0,
		image: image,
		category: "",
		size: ""
	});

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

	// async function SubmitProduct(product: ProductState): Promise<void> {
	// 	await axios.post("/product", product);
	// }

	return (
		<form className={styles.container}>
			<h2>Create Product</h2>
			<div className={styles.row}>
				<div className={styles.column}>
					<label htmlFor="image">Upload Image</label>
					<input
						type="file"
						accept="image/png, image/gif, image/jpeg, image/webp"
						onChange={HandleImageChange}
						required
					/>
					<img src={image} />
				</div>
				<div className={styles.column}>
					<label htmlFor="name">Name</label>
					<input
						id="name"
						onChange={(e) => {
							setProduct({ ...product, name: e.target.value });
						}}
						required
					/>
					<label htmlFor="brand">Brand</label>
					<input
						id="brand"
						onChange={(e) => {
							setProduct({ ...product, brand: e.target.value });
						}}
						required
					/>
					<label htmlFor="category">Category</label>
					<input
						id="category"
						onChange={(e) => {
							setProduct({ ...product, category: e.target.value });
						}}
						required
					/>
					<label htmlFor="desc">Description</label>
					<textarea
						id="desc"
						rows={5}
						onChange={(e) => {
							setProduct({ ...product, description: e.target.value });
						}}
						required
					/>
					<label htmlFor="price">Price</label>
					<input
						type="number"
						id="price"
						onChange={(e) => {
							setProduct({ ...product, price: Number(e.target.value) });
						}}
						required
					/>
					<label htmlFor="SKU">SKU</label>
					<input
						type="number"
						id="SKU"
						onChange={(e) => {
							setProduct({ ...product, SKU: Number(e.target.value) });
						}}
						required
					/>
				</div>
			</div>
		</form>
	);
}
