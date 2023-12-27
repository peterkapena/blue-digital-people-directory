import Autocomplete from '@mui/joy/Autocomplete';

interface CustomAutocompleteProps {
    options: { label: string, value: any }[],
    placeholder: string,
    onChange: (option: any) => void
}

export default function CustomAutocomplete({ options, placeholder, onChange }: CustomAutocompleteProps) {

    return (
        <Autocomplete
            clearOnEscape={true}
            onInputChange={(_, text) => !text && onChange(null)}
            onChange={(_, option) => onChange(option)}
            type="search"
            freeSolo
            disableClearable
            placeholder={placeholder}
            options={options}
            sx={{ width: 300 }}
        />
    );
}