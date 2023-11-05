import Product from "./Products";

export default interface ProductState{
    products: Product[];
    error?: string;
}