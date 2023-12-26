import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { IS_DEVELOPER, ROUTES } from "../common";
import ConfirmPassword from "../components/ConfirmPassword";
import { Notice } from "../components/Notice";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import UserName from "../components/UserName";
import Email from "../components/Email";
import Password from "../components/Password";

const AUTO_SIGNIN_TIMEOUT_REDIRECT = 5;

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      password: IS_DEVELOPER ? "1234567P" : "",
      username: IS_DEVELOPER ? "peterkapenapeter@gmail.com" : "",
      confirm_password: IS_DEVELOPER ? "1234567P" : "",
    },
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      const rtn = await signup(data.email, data.password);
      if (IS_DEVELOPER) console.log(rtn);

      setShowSubmitButton(false);
      if (rtn) {
        setMessages([
          ...messages,
          "Sign up was successful. You will be redirected to sign-in in " +
          AUTO_SIGNIN_TIMEOUT_REDIRECT +
          " seconds or signin now.",
        ]);
        setTimeout(
          () => (window.location.href = "/"),
          AUTO_SIGNIN_TIMEOUT_REDIRECT * 1000
        );
      } else {
        setMessages([
          ...messages,
          "Sign up failed. Try using different credentials. Otherwise, please contact support.",
        ]);
      }
      setIsSuccess(Boolean(rtn));
    } catch (error) {
    } finally {
      setIsLoading(false);
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
              <b>Register or Sign up!</b>
            </Typography>
            <Typography  >
              Sign up or register your account so to start making literatures'
              order or generate field service partners.
            </Typography>
          </div>
        </Box>
        <UserName
          showSubmitButton={showSubmitButton}
          error={errors.username}
          register={register}
        ></UserName>
        <Email
          showSubmitButton={showSubmitButton}
          error={errors.email}
          register={register}
        ></Email>

        <Password
          showSubmitButton={showSubmitButton}
          error={errors.password}
          register={register}
        ></Password>
        <ConfirmPassword
          showSubmitButton={showSubmitButton}
          error={errors.confirm_password}
          register={register}
        ></ConfirmPassword>

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
            onClick={() => navigate(ROUTES.SIGNIN)}
          >
            Already have an account? Sign in now!
          </Button>
        </Box>
        {showSubmitButton && (
          <SubmitLoadingButton
            isLoading={isLoading}
            title="Sign up "
          ></SubmitLoadingButton>
        )}

        {!showSubmitButton && messages.length > 0 && (
          <Notice
            isSuccess={isSuccess}
            onClose={() => {
              setShowSubmitButton(true);
              setMessages([]);
              reset();
              isSuccess && navigate(ROUTES.SIGNIN);
            }}
            messages={messages}
          />
        )}
      </form>
    </Sheet>
  );
}

export const FormSchema = z
  .object({
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
    email: z
      .string({})
      .nonempty("this is required")
      .email("Invalid email")
      .max(100, "This must be less than 100 characters long"),
    username: z
      .string()
      .nonempty("this is required")
      .max(100, "Notes must be less than 500 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type FormSchemaType = z.infer<typeof FormSchema>;

export interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  _id?: string;
}
async function signup(email: string, password: string): Promise<any> {
  throw new Error("Function not implemented.");
}

