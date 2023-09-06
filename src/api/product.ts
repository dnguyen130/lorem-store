import axios from "axios";
import { ProductState } from "@/types/product";

export const CreateProduct = async (product: ProductState) => {
	try {
		await axios.post("/product", product);
	} catch (err) {
		console.log(err);
	}
};
