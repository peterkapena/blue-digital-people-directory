"use client";
import { Card, Grid, Typography } from "@mui/joy";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "../../components/TextField";
import { SubmitButton } from "../../components/SubmitButton";
import useApi, { API_RSRC_LINKS, CommonOutputModel } from "../../api/useApi";
import { RegisterModelIn } from "../../api/register_or_add_user";
import Password from "../../components/Password";
import { IS_DEVELOPER } from "../../common";
import { CustomSelect } from "../../components/CustomSelect";
import ConfirmPassword from "../../components/ConfirmPassword";
import { Notice } from "../../components/Notice";

const UserCreate = () => {
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const { isLoading, data, error, fetchData } = useApi<CommonOutputModel, RegisterModelIn>(API_RSRC_LINKS.register, { triggerOnLoad: false, method: "POST" });
    const [messages, setMessages] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        reset, control, setValue,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });

    const processForm: SubmitHandler<FormSchemaType> = async (form_data) => {
        const rtn = await fetchData({ email: form_data.email_or_username, password: form_data.password, role: form_data.role.value })
        IS_DEVELOPER && console.log(data)

        if (rtn?.errors && rtn?.errors.length > 0) {
            setMessages(['An error happened or this user already exists in the system']);
        } else {
            setMessages(['Use has been added']);
        }
        setShowSubmitButton(false);
        !IS_DEVELOPER && reset();
    };
    return (
        <Card>
            <div>
                <Typography level="h2">Add a user to the platform</Typography>
            </div>
            <form onSubmit={handleSubmit(processForm)}>
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
                    <Grid xs={12} sm={12} md={4} >
                        <TextField
                            disabled={Boolean(!showSubmitButton)}
                            label={"Email or username"}
                            fieldName="email_or_username"
                            placeholder="johndoe@example.com"
                            register={register}
                            fieldError={errors.email_or_username}
                            type="text"
                        ></TextField>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Password
                            showSubmitButton={showSubmitButton}
                            error={errors.password}
                            register={register}
                        ></Password>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <ConfirmPassword showSubmitButton={showSubmitButton} error={errors.confirm_password} register={register}
                        ></ConfirmPassword>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <CustomSelect label="Role" placeholder={"Select a role"} control={control} setValue={setValue} fieldError={errors.role?.value} />
                    </Grid>
                </Grid>
                {showSubmitButton && <SubmitButton></SubmitButton>}
                {!showSubmitButton && messages.length > 0 && (
                    <Notice messages={messages} isSuccess={data?.errors.length === 0} onClose={() => { setMessages([]); setShowSubmitButton(true); }} />
                )}
            </form>
        </Card>
    );
};

export default UserCreate;

const FormSchema = z.object({
    password: z
        .string({})
        .nonempty("this is required")
        .min(8, "Not shorter than 8")
        .max(100, "This must be less than 100 characters long"),
    confirm_password: z
        .string({})
        .nonempty("this is required")
        .min(8, "Not shorter than 8")
        .max(100, "This must be less than 100 characters long"),
    email_or_username: z
        .string({})
        .nonempty("this is required")
        //.email("Invalid email")
        .max(100, "This must be less than 100 characters long"),
    role: z.object({
        label: z.string(),
        value: z.enum(["ADMIN", "CLIENT"]),
    }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});
type FormSchemaType = z.infer<typeof FormSchema>;

interface ValidationResult {
    success: boolean;
    data: FormSchemaType;
    _id?: string;
}


