import { Box, Input, Typography } from "@mui/joy";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CustomAutocomplete from "../components/CustomAutocomplete";

function Welcome() {

  return (
    <div>
      <Typography level="h2">Welcome</Typography>
      <Box sx={{ my: 2, }}>
        <CustomAutocomplete placeholder={"Start typing"} options={top100Films} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
    </div>
  );
}

export default Welcome;

const top100Films = [
  { label: 'The Shawshank Redemption', value: 1994 },
  { label: 'The Godfather', value: 1972 },
  { label: 'The Godfather: Part II', value: 1974 },
  { label: 'The Dark Knight', value: 2008 },
  { label: '12 Angry Men', value: 1957 },
  { label: "Schindler's List", value: 1993 },
  { label: 'Pulp Fiction', value: 1994 },
]