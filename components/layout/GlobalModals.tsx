"use client";

import { useModalStore } from "@/stores/useModalStore";
import { CreateMovementModal } from "../movements/CreateMovementModal";
import { CreateAccountModal } from "../movements/CreateAccountModal";

export const GlobalModals = () => {
	const { type, props, openModal, closeModal } = useModalStore();

	return (
		<>
			{type === "createMovement" && (
				<CreateMovementModal
					open={true}
					onClose={closeModal}
					categoryId={props?.category_id}
					accountId={props?.account_id}
					amount={props?.amount}
				/>
			)}
			{type === "createAccount" && (
				<CreateAccountModal open={true} onClose={closeModal} />
			)}
		</>
	);
};
