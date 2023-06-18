import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, styled, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";

type FormValues = {
	author: string,
	theme: string,
	title: string,
	text: string,
	publishDate: number,
}

type AddArticleProps = {
	className?: string,
	defaultValues?: Partial<FormValues>,
	title: string,
	onSubmit: (data: FormValues) => void,
	loading?: boolean,
}

const AddArticleForm: React.FC<AddArticleProps> = (
	{
		className,
		defaultValues = {},
		title,
		onSubmit,
		loading,
	}
) => {
	const {
		control,
		handleSubmit
	} = useForm<FormValues>({
		defaultValues: {
			publishDate: Date.now(),
			...defaultValues,
		},
	});

	const textRequiredRules = {
		required: "Обязательное поле",
		validate: {
			trimRequired: (value: string) => {
				if (value.trim() === "") return "Обязательное поле";
				return true;
			}
		}
	};

	return <Root
		className={className}
		maxWidth={"md"}
	>
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Typography variant={"h4"}>
				{title}
			</Typography>
			<Controller
				control={control}
				name={"author"}
				render={({ field, fieldState }) => {
					return <TextField
						value={field.value || ""}
						onChange={field.onChange}
						placeholder={defaultValues.author}

						helperText={fieldState.error?.message}
						error={!!fieldState.error?.message}

						label={"Автор*"}
						variant={"filled"}
						disabled={loading}
					/>;
				}}
				rules={{
					...textRequiredRules
				}}
			/>
			<Controller
				control={control}
				name={"theme"}
				render={({ field, fieldState }) => {
					return <TextField
						value={field.value || ""}
						onChange={field.onChange}
						placeholder={defaultValues.theme}

						helperText={fieldState.error?.message}
						error={!!fieldState.error?.message}

						label={"Тема*"}
						variant={"filled"}
						disabled={loading}
					/>;
				}}
				rules={{
					...textRequiredRules
				}}
			/>
			<Controller
				control={control}
				name={"title"}
				render={({ field, fieldState }) => {
					return <TextField
						value={field.value || ""}
						onChange={field.onChange}
						placeholder={defaultValues.theme}

						helperText={fieldState.error?.message}
						error={!!fieldState.error?.message}

						label={"Заголовок*"}
						variant={"filled"}
						disabled={loading}
					/>;
				}}
				rules={{
					...textRequiredRules
				}}
			/>
			<Controller
				control={control}
				name={"text"}
				render={({ field, fieldState }) => {
					return <TextField
						value={field.value || ""}
						onChange={field.onChange}

						helperText={fieldState.error?.message}
						error={!!fieldState.error?.message}

						label={"Текст*"}
						variant={"filled"}
						multiline
						minRows={5}
						disabled={loading}
					/>;
				}}
				rules={{
					...textRequiredRules
				}}
			/>
			<Controller
				control={control}
				name={"publishDate"}
				render={({ field, fieldState }) => {
					return <DatePicker<Dayjs>
						onChange={value => {
							const formValue = value === null ? null : value.toDate().getTime();
							field.onChange(formValue);
						}}
						value={field.value === null ? null : dayjs(field.value)}

						label={"Дата*"}
						slotProps={{
							actionBar: {
								actions: ['clear'],
							},
							textField: {
								variant: "filled",
								helperText: fieldState.error?.message,
								error: !!fieldState.error?.message,
							}
						}}
						format={"DD/MM/YYYY"}
						disabled={loading}
					/>;
				}}
				rules={{
					validate: {
						required: value => {
							if (value === null) return "Обязательное поле";
							return true;
						}
					}
				}}
			/>
			<FormActions>
				<LoadingButton
					variant={"contained"}
					type={"submit"}
					disabled={loading}
					loading={loading}
				>
					Сохранить
				</LoadingButton>
			</FormActions>
		</Form>
	</Root>;
};

const Root = styled(Container)`
  position: relative;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(2)};
  overflow: hidden;
  padding: ${p => p.theme.spacing(3)};
  border-bottom-left-radius: ${p => p.theme.shape.borderRadius * 2}px;
  border-bottom-right-radius: ${p => p.theme.shape.borderRadius * 2}px;
  background: ${p => p.theme.palette.background.paper};
`;

const FormActions = styled("div")`
  display: flex;
  gap: ${p => p.theme.spacing(1)};
  margin-top: ${p => p.theme.spacing(1)};
`;

export default AddArticleForm;
