import Autocomplete from '@mui/joy/Autocomplete';

interface CustomAutocompleteProps {
    options: { label: string, value: any }[],
    placeholder: string
}

export default function CustomAutocomplete({ options, placeholder }: CustomAutocompleteProps) {
    return (
        <Autocomplete
            placeholder={placeholder}
            options={options}
            sx={{ width: 300 }}
        />
    );
}