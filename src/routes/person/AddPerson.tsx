import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Divider,
  FormLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { useParams } from "react-router-dom";
import useApi, { API_RSRC_LINKS } from "../../api/useApi";
import { PersonOutModel } from "../../api/people";
import CountrySelector, { countries } from "../../components/CountrySelector";
import TextField from '../../components/TextField';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import GenderSelect from '../../components/GenderSelect';
import { IS_DEVELOPER } from '../../common';
import { SubmitButton } from '../../components/SubmitButton';
import { Notice } from '../../components/Notice';
import { DeleteRounded } from "@mui/icons-material";

const AddPerson = () => {
  const { id } = useParams()
  const { data, fetchData } = useApi<PersonOutModel, PersonOutModel>(API_RSRC_LINKS.people + (id || ""),
    {
      method: id ? "GET" : "POST",
      triggerOnLoad: Boolean(id)
    });

  const { fetchData: putPerson } = useApi<PersonOutModel, PersonOutModel>(API_RSRC_LINKS.people + (id || ""),
    {
      method: "PUT",
      triggerOnLoad: false
    });

  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([])

  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    if (data) {
      // console.log(data)
      reset({
        country: data.country || "",
        emailAddress: data.emailAddress || "",
        gender: data.gender || "",
        mobileNumber: data.mobileNumber || "",
        name: data.name || "",
        surname: data.surname || ""
      });
    }
  }, [data, reset]);

  const processForm: SubmitHandler<FormSchemaType> = async (form_data) => {
    let rtn;
    if (id) {
      rtn = await putPerson({ id: Number(id), profilePictureUrl: "", city: "", ...form_data })
      setMessages(['Success!']);
      IS_DEVELOPER && console.log(rtn)
    } else {
      rtn = await fetchData({ id: 0, profilePictureUrl: "", city: "", ...form_data })
      if (rtn?.id) {
        setMessages(['Success!']);
      } else {
        setMessages(['An error happened or this user already exists in the system']);
      }
    }

    setShowSubmitButton(false);
    !IS_DEVELOPER && !id && reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{
          mb: 1,
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          <div>
            <Typography level="title-md">{data ? `${data.name} ${data.surname}` : "Person info"}</Typography>
            <Typography level="body-sm">
              {data ? `Editing ${data.name} ${data.surname}` : "Add a person to the directory"}
            </Typography>
          </div>
          <IconButton color="danger">
            <DeleteRounded />
          </IconButton>
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
                disabled={!showSubmitButton}
                label={""}
                fieldName="name"
                placeholder="First name"
                register={register}
                fieldError={errors.name}
                type="text"
              />
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
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <GenderSelect
                    setFormValue={(option) => {
                      setValue(field.name, option)
                    }}
                    value={field.value}
                    name={field.name}
                    fieldError={errors.gender}
                  />
                )}
              />
            </Stack>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelector
                  onChange={field.onChange}
                  value={field.value}
                  fieldError={errors.country}
                />
              )}
            />
          </Stack>
        </Stack>
        {showSubmitButton && <SubmitButton></SubmitButton>}
        {!showSubmitButton && messages.length > 0 && (
          <Notice messages={messages} isSuccess={messages.length > 0} onClose={() => { setMessages([]); setShowSubmitButton(true); }} />
        )}
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