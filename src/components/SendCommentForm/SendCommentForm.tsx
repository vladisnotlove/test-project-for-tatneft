import React from "react";
import { Button, styled, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

type FormValues = {
	author?: string,
	text: string,
}

type SendCommentFormProps = {
	className?: string,
	children?: React.ReactNode,
	onSubmit: (data: FormValues) => void,
	loading?: boolean,
}

const SendCommentForm: React.FC<SendCommentFormProps> = (
	{
		className,
		onSubmit,
		loading,
	}
) => {
	const {register, handleSubmit, formState} = useForm<FormValues>();

	return <Root
		className={className}
		onSubmit={handleSubmit(onSubmit)}
	>
		<TextField
			{...register("author")}
			variant={"filled"}
			label={"Ваше имя"}
			placeholder={"Иван Иванов"}
			disabled={loading}
		/>
		<TextField
			{...register("text", {
				required: "Текст комментария не написан",
				validate: {
					trimRequired: (value: string) => {
						if (!value || value.trim() === "") return "Текст комментария не написан";
						return true;
					}
				}
			})}

			error={!!formState.errors.text?.message}
			helperText={formState.errors.text?.message}

			variant={"filled"}
			placeholder={"Написать комментарий"}
			hiddenLabel={true}
			multiline
			minRows={3}
			fullWidth
			disabled={loading}
		/>
		<LoadingButton
			variant={"contained"}
			type={"submit"}
			loading={loading}
			disabled={loading}
		>
			Отправить
		</LoadingButton>
	</Root>;
};

const Root = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${p => p.theme.spacing(2)};
`;

export default SendCommentForm;
