import Option from '@mui/joy/Option';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { AccessTimeFilledOutlined, EditRounded, EmailRounded, Person2Outlined } from "@mui/icons-material";
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

const Person = () => {
  const { id } = useParams();
  const { data } = useApi<PersonOutModel>(API_RSRC_LINKS.getpeople + id, { method: "GET" });
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([])
  const [filterCountry, setFilterCountry] = useState("")

  const {
    register,
    handleSubmit,
    reset, control, setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (form_data) => {
    // const rtn = await fetchData({ email: form_data.email_or_username, password: form_data.password, role: form_data.role.value })
    // IS_DEVELOPER && console.log(data)

    // if (rtn?.errors && rtn?.errors.length > 0) {
    //     setMessages(['An error happened or this user already exists in the system']);
    // } else {
    //     setMessages(['Use has been added']);
    // }
    // setShowSubmitButton(false);
    // !IS_DEVELOPER && reset();
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
              <TextField
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
              {/* <GenderSelect></GenderSelect> */}
            </Stack>
            <div>
              <CountrySelector setFormValue={(option) => {
                option && setFilterCountry(option.label)
              }} />
            </div>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={108}
                sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 85,
                  top: 180,
                  boxShadow: 'sm',
                }}
              >
                <EditRounded />
              </IconButton>
            </Stack>
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: 'flex-column',
                    md: 'flex-row',
                  },
                  gap: 2,
                }}
              >
                <Input size="sm" placeholder="First name" />
                <Input size="sm" placeholder="Last name" />
              </FormControl>
            </Stack>
          </Stack>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input size="sm" defaultValue="UI Developer" />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>Email</FormLabel>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRounded />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
          <div>
            <FormControl sx={{ display: { sm: 'contents' } }}>
              <FormLabel>Timezone</FormLabel>
              <Select
                size="sm"
                startDecorator={<AccessTimeFilledOutlined />}
                defaultValue="1"
              >
                <Option value="1">
                  Indochina Time (Bangkok){' '}
                  <Typography textColor="text.tertiary" ml={0.5}>
                    — GMT+07:00
                  </Typography>
                </Option>
                <Option value="2">
                  Indochina Time (Ho Chi Minh City){' '}
                  <Typography textColor="text.tertiary" ml={0.5}>
                    — GMT+07:00
                  </Typography>
                </Option>
              </Select>
            </FormControl>
          </div>
        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>

      </form>
    </Card>
  );
};

export default Person;

const FormSchema = z.object({
  name: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  surname: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  profilePictureUrl: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  mobileNumber: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  gender: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  country: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  city: z
    .string({})
    .nonempty("this is required")
    .min(8, "Not shorter than 8")
    .max(100, "This must be less than 100 characters long"),
  emailAddress: z
    .string({})
    .nonempty("this is required")
    //.email("Invalid email")
    .max(100, "This must be less than 100 characters long"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface ValidationResult {
  success: boolean;
  data: FormSchemaType;
  _id?: string;
}