import { Input, Typography } from "@mui/joy";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Welcome() {

  return (
    <div>
      <Typography level="h2">Welcome</Typography>
      <br />
      <br />
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
    </div>
  );
}

export default Welcome;
