import { writable } from 'svelte/store'

/** Store do estado selecionado */
export const estado = writable({})

/** Store da cidade selecionada */
export const cidade = writable('')

/** Store da concessionária de energia */
export const concessionaria = writable('')

/** Store do preço que o cliente paga da energia */
export const preco = writable('')

/** Store dos dados pessoais do cliente */
export const dadosCliente = writable({})
