import axios from "axios";
import { ProductType } from "@/types/product";

export const CreateProduct = async (product: ProductType) => {
	try {
		await axios.post("/product", product);
	} catch (err) {
		console.log(err);
	}
};
