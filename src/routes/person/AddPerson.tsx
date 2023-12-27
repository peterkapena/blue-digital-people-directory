import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Divider,
  FormLabel,
  Stack,
  Typography,
} from "@mui/joy";
import { useParams } from "react-router-dom";
import useApi, { API_RSRC_LINKS } from "../../api/useApi";
import { PersonOutModel } from "../../api/people";
import CountrySelector from "../../components/CountrySelector";
import TextField from '../../components/TextField';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import GenderSelect from '../../components/GenderSelect';
import { IS_DEVELOPER } from '../../common';
import { SubmitButton } from '../../components/SubmitButton';
import { Notice } from '../../components/Notice';

const AddPerson = () => {
  const { data, fetchData } = useApi<PersonOutModel, PersonOutModel>(API_RSRC_LINKS.people,
    {
      method: "POST",
      triggerOnLoad: false
    });
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset, control, setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: data?.country || "",
      emailAddress: data?.emailAddress || "",
      gender: data?.gender || "",
      mobileNumber: data?.mobileNumber || "",
      name: data?.name,
      surname: data?.surname
    }
  });

  const processForm: SubmitHandler<FormSchemaType> = async (form_data) => {
    // console.log(form_data)
    const rtn = await fetchData({ id: 0, profilePictureUrl: "", city: "", ...form_data })
    IS_DEVELOPER && console.log(data)

    if (!rtn?.id) {
      setMessages(['An error happened or this user already exists in the system']);
    } else {
      setMessages(['Person has been added']);
    }
    setShowSubmitButton(false);
    !IS_DEVELOPER && reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Person info</Typography>
          <Typography level="body-sm">
            Edit person
          </Typography>
        </Box>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
            <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
            >
              <Avatar></Avatar>
            </AspectRatio>
          </Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <TextField
                disabled={Boolean(!showSubmitButton)}
                label={""}
                fieldName="name"
                placeholder="First name"
                register={register}
                fieldError={errors.name}
                type="text"
              ></TextField>
              <TextField
                disabled={Boolean(!showSubmitButton)}
                label={""}
                fieldName="surname"
                placeholder="Surname"
                register={register}
                fieldError={errors.surname}
                type="text"
              ></TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField defaultValue={data?.name}
                disabled={Boolean(!showSubmitButton)}
                label={"Mobile number"}
                fieldName="mobileNumber"
                placeholder="0812177777"
                register={register}
                fieldError={errors.mobileNumber}
                type="tel"
              ></TextField>
              <TextField
                disabled={Boolean(!showSubmitButton)}
                label={"Email"}
                fieldName="emailAddress"
                placeholder="jhon@ex.o"
                register={register}
                fieldError={errors.emailAddress}
                type="text"
              ></TextField>
              <GenderSelect fieldError={errors.gender}
                setFormValue={(value) => {
                  console.log(value)
                  setValue("gender", value)
                }}></GenderSelect>
            </Stack>
            <div>
              <CountrySelector fieldError={errors.country}
                setFormValue={(option) => {
                  console.log(option)
                  setValue("country", option?.label || "")
                }} />
            </div>
          </Stack>
        </Stack>
        {showSubmitButton && <SubmitButton></SubmitButton>}
        {!showSubmitButton && messages.length > 0 && (
          <Notice messages={messages} isSuccess={messages.length > 0} onClose={() => { setMessages([]); setShowSubmitButton(true); }} />
        )}

        {/* <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="sm" type='submit' variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow> */}

      </form>
    </Card>
  );
};

export default AddPerson;

const FormSchema = z.object({
  name: z
    .string({})
    .min(1, "this is required")
    .min(3, "Not shorter than 3")
    .max(100, "This must be less than 100 characters long"),
  surname: z
    .string({})
    .min(1, "this is required")
    .min(3, "Not shorter than 3")
    .max(100, "This must be less than 100 characters long"),
  mobileNumber: z
    .string({})
    .min(1, "this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  gender: z
    .string({})
    .min(1, "this is required")
    .max(100, "This must be less than 100 characters long"),
  country: z
    .string({})
    .min(1, "this is required")
    .max(100, "This must be less than 100 characters long"),
  emailAddress: z
    .string({})
    .min(1, "this is required")
    .email("Invalid email")
    .max(100, "This must be less than 100 characters long"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  _id?: string;
}