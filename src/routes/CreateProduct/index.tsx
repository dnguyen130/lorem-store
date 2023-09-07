// React
import { ReactElement, useState } from "react";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductState } from "@/types/product";

export default function CreateProduct(): ReactElement {
	const [image, setImage] = useState<string>("");
	const [product, setProduct] = useState<ProductState>({
		id: 0,
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
		setImage(URL.createObjectURL(file ? file : new Blob()));
	}

	return (
		<div className={styles.container}>
			<h2>Create Product</h2>
			<div className={styles.row}>
				<div className={styles.column}>
					<label htmlFor="image">Upload Image</label>
					<input
						type="file"
						accept="image/png, image/gif, image/jpeg, image/webp"
						onChange={HandleImageChange}
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
					/>
					<label htmlFor="desc">Description</label>
					<textarea
						id="desc"
						rows={5}
						onChange={(e) => {
							setProduct({ ...product, description: e.target.value });
						}}
					/>
					<label htmlFor="price">Price</label>
					<input
						type="number"
						id="price"
						onChange={(e) => {
							setProduct({ ...product, price: Number(e.target.value) });
						}}
					/>
				</div>
			</div>
		</div>
	);
}
