import { getCards } from "@/services/cardService";
import { defineStore } from "pinia";

export interface ICard {
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: {
        name: string
    }[]
}

export type INullableCards = ICard[] | null


export const useCardStore = defineStore('card-store', {
    state: () => ({
        isLoading: false,
        cards: null as INullableCards
    }),
    actions: {
        async fetchCards() {
            this.isLoading = true
            this.cards = await getCards()
            this.isLoading = false
        }
    }
})