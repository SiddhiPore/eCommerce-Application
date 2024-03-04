export interface signUp{
    name: string,
    password: string,
    email: string
}
export interface login{
   

    email: string,
    password: string
}

export interface product
{
   id:number,
   name: string,
   price: number,
   category: string,
   color: string,
   description : string,
   image: string,
   quantity: number | undefined,
   productId : undefined | number
}
export interface cart{
    id:number | undefined,
    userId : number,
    name: string,
    price: number,
    category: string,
    color: string,
    description : string,
    image: string,
    quantity: number | undefined,
    productId : number

}

export interface priceSummary{
    price : number,
    discount: number,
    tax: number,
    delivery : number,
    total: number
}
export interface paymethod{
    value: string,
    viewValue : string
}
export interface order{
    email: string,
    address: string,
    details: string,
    totalPrice: number,
    userId: string,
    id: number| undefined,
 
}