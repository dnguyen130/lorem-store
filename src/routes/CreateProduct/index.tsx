// Packages
import { ReactElement, useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";

import CreateModal from "@/components/modals/createModal";

// Styles
import styles from "@/styles/routes/createProduct.module.css";

// Types
import { ProductType } from "@/types/product";

// Redux
import {
	useAddNewProductMutation,
	useGetProductsByPageQuery
} from "@/slices/product/productSlice";
import { useAppDispatch } from "@/app/hooks";
import { setIsCreateProductModal } from "@/slices/modal/modalSlice";
import {
	setActiveProduct,
	clearActiveProduct
} from "@/slices/product/productSlice";
import { NumericFormat } from "react-number-format";

const MAX_FILE_SIZE = 5120;

export default function CreateProduct(): ReactElement {
	const dispatch = useAppDispatch();
	const [addNewProduct] = useAddNewProductMutation();
	const { refetch } = useGetProductsByPageQuery("1");
	const {
		register,
		handleSubmit,
		reset,
		watch,
		trigger,
		control,
		formState: { errors }
	} = useForm<ProductType>({
		mode: "onBlur",
		defaultValues: {
			SKU: 0,
			price: 0
		}
	});

	const watchAllFields = watch();

	const [image, setImage] = useState<Blob>(new Blob());
	const [preview, setPreview] = useState<string>("");

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

	const onSubmit: SubmitHandler<ProductType> = async (data) => {
		const formData = new FormData();
		let image_url;
		try {
			if (image.size !== 0) {
				formData.append("file", image);
				formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
				const cloud_res = await axios.post(
					`https://api.cloudinary.com/v1_1/${
						import.meta.env.VITE_CLOUD_NAME
					}/image/upload`,
					formData
				);
				image_url = cloud_res.data.secure_url;
			} else {
				image_url =
					"https://res.cloudinary.com/dpc1qjocu/image/upload/v1695069291/default_acbtxk.jpg";
			}
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
			alert("Product successfully created!");
			dispatch(setIsCreateProductModal(false));
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	const formElement = useRef<HTMLFormElement>(null);

	return (
		<form
			className={styles.container}
			onSubmit={handleSubmit(onSubmit)}
			ref={formElement}
		>
			<div className={styles.row}>
				<div className={`${styles.column} ${styles.spaced}`}>
					<img
						src={
							preview
								? preview
								: "https://res.cloudinary.com/dpc1qjocu/image/upload/v1695069291/default_acbtxk.jpg"
						}
						alt="image preview"
					/>
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
								onBlur: () => trigger("name"),
								maxLength: {
									value: 80,
									message: "Name exceeds limit"
								}
							})}
							className={errors.name ? styles.input_error : null}
						/>
					</div>
					<div className={styles.input_row}>
						<div className={styles.input_group}>
							<div className={styles.label_group}>
								<label
									htmlFor="brand"
									className={errors.brand ? styles.error : null}
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
									onBlur: () => trigger("brand"),
									required: "Required"
								})}
								className={errors.brand ? styles.input_error : null}
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
								{errors.category && (
									<span className={styles.error}>
										{errors.category?.message}
									</span>
								)}
							</div>
							<input
								formNoValidate
								id="category"
								{...register("category", {
									onBlur: () => trigger("category"),
									required: "Required"
								})}
								className={errors.category ? styles.input_error : null}
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
							{...register("description", {
								onBlur: () => trigger("description"),
								required: "Required"
							})}
							className={errors.description ? styles.input_error : null}
						/>
						<div className={styles.input_row}>
							<div className={styles.input_group}>
								<div className={styles.label_group}>
									<label
										htmlFor="price"
										className={errors.price ? styles.error : null}
									>
										Price
									</label>
									{errors.price?.type === "max" && (
										<span className={styles.error}>max is 10000</span>
									)}
									{errors.price?.type === "min" && (
										<span className={styles.error}>min is $0.01</span>
									)}
								</div>
								<Controller
									control={control}
									name="price"
									rules={{ min: 0.01, max: 10000, required: true }}
									render={({ field: { onChange, onBlur, value, name } }) => (
										<NumericFormat
											allowNegative={false}
											decimalScale={2}
											fixedDecimalScale
											prefix="$ "
											value={value}
											name={name}
											onValueChange={(v) => onChange(v.value)}
											className={errors.price ? styles.input_error : null}
											onBlur={onBlur}
										/>
									)}
								/>
							</div>
							<div className={styles.input_group}>
								<div className={styles.label_group}>
									<label
										htmlFor="SKU"
										className={errors.SKU ? styles.error : null}
									>
										SKU
									</label>
									{errors.SKU?.type === "minLength" ||
										(errors.SKU?.type === "min" && (
											<span className={styles.error}>Min length 8</span>
										))}
									{errors.SKU?.type === "maxLength" && (
										<span className={styles.error}>Max length 12</span>
									)}
								</div>
								<Controller
									control={control}
									name="SKU"
									rules={{
										minLength: 8,
										maxLength: 12,
										required: true,
										min: 1
									}}
									render={({ field: { onChange, value, name, onBlur } }) => (
										<NumericFormat
											decimalScale={0}
											value={value}
											name={name}
											onValueChange={(v) => onChange(v.value)}
											className={errors.SKU ? styles.input_error : null}
											onBlur={onBlur}
										/>
									)}
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
						{errors.size && (
							<span className={styles.error}>{errors.size?.message}</span>
						)}
					</div>
					<input
						formNoValidate
						id="size"
						{...register("size", {
							required: "Required"
						})}
						className={errors.size ? styles.input_error : null}
					/>
				</div>
			</div>
			<div className={styles.submit_row}>
				<button
					onClick={async () => {
						const res = await trigger();
						if (res) {
							dispatch(setIsCreateProductModal(true));
							dispatch(setActiveProduct(watchAllFields));
						} else {
							console.log(errors);
						}
					}}
					type="button"
					className={styles.submit}
				>
					Create Product
				</button>
				<button
					className={styles.clear}
					type="button"
					onClick={() => {
						reset(), clearActiveProduct();
					}}
				>
					Clear
				</button>
			</div>
			<CreateModal
				onClick={() => {
					formElement.current?.requestSubmit;
				}}
			/>
		</form>
	);
}
