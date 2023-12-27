import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { IS_DEVELOPER, ROUTES, STR_TOKEN } from "../common";
import TextField from "../components/TextField";
import Password from "../components/Password";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import { Notice } from "../components/Notice";
import { LoginModelIn, LoginModelOut } from "../api/login";
import useApi, { API_RSRC_LINKS } from "../api/useApi";

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const { isLoading, error, fetchData } = useApi<LoginModelOut, LoginModelIn>(API_RSRC_LINKS.login, { triggerOnLoad: false, method: "POST" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email_or_username: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "PPPPPPP@PPPPP" : "",
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (form_data) => {
    try {
      if (IS_DEVELOPER) console.log(form_data);
      const rtn = await fetchData({ email: form_data.email_or_username, password: form_data.password })

      if (!rtn || rtn?.errors.length > 0) {
        setMessages(["Login failed"]);
      } else if (rtn?.token) {
        sessionStorage.setItem(STR_TOKEN, rtn?.token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = ROUTES.HOME;
      }
      setIsSuccess(rtn?.errors.length === 0);
    } catch (err) {
      setMessages(["Login failed"]);
      console.error(error);
      console.error(err);
    }
  };

  return (
    <Sheet
      sx={{
        mt: 2,
        width: 500,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography component="h1" sx={{ mb: 2 }}>
              <b>Sign in!</b>
            </Typography>
            <Typography>Sign in to continue.</Typography>
          </div>
        </Box>
        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Email or username"}
          fieldName="email_or_username"
          placeholder="johndoe@example.com"
          register={register}
          fieldError={errors.email_or_username}
          type="text"
        ></TextField>
        <Password
          showSubmitButton={showSubmitButton}
          error={errors.password}
          register={register}
        ></Password>

        <Box
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="plain"
            size="sm"
            onClick={() => navigate(ROUTES.SIGNUP)}
          >
            Do not have an account? Click here to create one.
          </Button>
        </Box>
        {messages.length === 0 && showSubmitButton && (
          <SubmitLoadingButton
            isLoading={isLoading}
            title="Sign in"
          ></SubmitLoadingButton>
        )}

        {messages.length > 0 && (
          <Notice
            isSuccess={isSuccess}
            onClose={() => {
              setShowSubmitButton(true);
              setMessages([]);
            }}
            messages={messages}
          />
        )}
      </form>
    </Sheet>
  );
}

const FormSchema = z.object({
  password: z
    .string({})
    .min(1, "this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  email_or_username: z
    .string({})
    .min(1, "this is required")
    //.email("Invalid email")
    .max(100, "This must be less than 100 characters long"),
});

type FormSchemaType = z.infer<typeof FormSchema>;
