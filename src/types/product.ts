export interface ProductState {
	id: number;
	name: string;
	description: string;
	brand: string;
	image: string;
	SKU: number;
	category: string;
	size: string;
	price: number;
	discount_id?: number;
	created_at?: Date;
	modified_at?: Date;
}

export const initialProductState = {
	name: "",
	brand: "",
	description: "",
	price: 0,
	SKU: 0,
	image: "",
	category: "",
	size: ""
};
