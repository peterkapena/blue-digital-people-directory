import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormLabel, Select, FormHelperText } from "@mui/joy";
import Option from '@mui/joy/Option';
import { FieldError } from "react-hook-form";

interface GenderSelectProps {
  setFormValue: (option: any) => void;
  showTheAllOption?: boolean;
  fieldError?: FieldError;
  value?: string;
  name?: string;
}

function GenderSelect(props: GenderSelectProps) {
  const { setFormValue, showTheAllOption, fieldError, value, name } = props;

  return (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <Select
        name={name}
        placeholder="Select"
        value={value || null}
        onChange={(_, option) => setFormValue(option)}>
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
  );
}

export default GenderSelect;
