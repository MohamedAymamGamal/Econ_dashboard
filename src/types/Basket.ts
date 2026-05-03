export interface Root {
  id: string
  basketItems: BasketItem[]
}

export interface BasketItem {
  id: number
  name: string
  image: string
  description: string
  quantity: number
  price: number
  category: string
}
