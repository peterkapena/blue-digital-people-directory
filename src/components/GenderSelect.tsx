import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormControlProps, FormHelperText, FormLabel, Select } from "@mui/joy";
import Option from '@mui/joy/Option';
import { FieldError } from "react-hook-form";


interface GenderSelectProps extends FormControlProps {
  setFormValue: (option: any) => void;
  showTheAllOption?: boolean;
  fieldError?: FieldError | undefined;
}

function GenderSelect(props: GenderSelectProps) {
  const { sx, setFormValue, showTheAllOption, fieldError } = props;
  return (
    <FormControl >
      <FormLabel>Gender</FormLabel>
      <Select placeholder="Select"
        onChange={(_, option) => {
          if (option) {
            setFormValue(option)
          }
        }}>
        {showTheAllOption && <Option value="all">All</Option>}
        <Option value="M">M</Option>
        <Option value="F">F</Option>
        <Option value="Other">Other</Option>
      </Select>
      {fieldError?.message && (
        <FormHelperText sx={{ color: "red" }}>
          <InfoOutlined color="error" />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default GenderSelect