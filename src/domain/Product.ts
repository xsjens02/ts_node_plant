import { Identification } from "./Identification.js";

export interface Product extends Identification {
    title: string;
    description: string;
    price: number; 
}