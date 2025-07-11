import product from '../data/data.json'
import type { Product } from '../types/product'

export const fetchProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(product)
        }, 1000)
    })
}
