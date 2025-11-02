import { create } from "zustand";

type ModalType =
	| "createMovement"
	| "createAccount"
	| "createCardExpense"
	| "editMovement"
	| null;

type ModalState = {
	type: ModalType;
	props?: Record<string, any>;
	openModal: (type: ModalType, props?: Record<string, any>) => void;
	closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
	type: null,
	props: undefined,
	openModal: (type, props) => set({ type, props }),
	closeModal: () => set({ type: null, props: undefined }),
}));
