import { create } from 'zustand'

export const useSearchStore = create((set, get) => ({
	openSide: true,
	toggleOpen: params =>
		set(state => ({
			openSide:
				((state.openSide = params), console.log(params, state.openSide)),
		})),
}))
