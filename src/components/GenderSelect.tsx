import { FormControl, FormControlProps, FormLabel, Select } from "@mui/joy";
import Option from '@mui/joy/Option';


interface GenderSelectProps extends FormControlProps {
  setFormValue: (option: any) => void
}

function GenderSelect(props: GenderSelectProps) {
  const { sx, setFormValue, } = props;
  return (
    <FormControl size="sm">
      <FormLabel>Gender</FormLabel>
      <Select size="sm" placeholder="All" onChange={(_, option) => {
        if (option) {
          setFormValue(option)
         }
      }}>
        <Option value="all">All</Option>
        <Option value="M">M</Option>
        <Option value="F">F</Option>
        <Option value="Other">Other</Option>
      </Select>
    </FormControl>
  )
}

export default GenderSelect