export interface IProduct {
    id: string,
    title: string,
    price: number,
    brand: string,
    stock: number,
    rating: number,
    details: string,
    category: string,
    for: string,
    img: string
}
export interface ICart {
    id: string,
    title: string,
    price: number,
    brand: string,
    stock: number,
    rating: number,
    details: string,
    category: string,
    for: string,
    img: string,
    quantity: number
}
export interface InitialState {
    products: IProduct[],
    status: TStatus,
    womenSelectedCategory: TWomenSelectedCategory,
    women: IProduct[],
    cart: ICart[],
    menSelectedCategory: TMenSelectedCategory,
    men: IProduct[]
  }

export type TWomenSelectedCategory = "tanks" | "dress" | "skirt";
export type TMenSelectedCategory = "t-shirt" | "hoodie" | "jeans";
export type TStatus= 'idle' | 'loading' | 'failed' | 'successful';