"use client";
import { FormControl, FormHelperText, FormLabel, Select } from "@mui/joy";
import { Controller, FieldError } from "react-hook-form";
import Option from '@mui/joy/Option';
import { InfoOutlined } from "@mui/icons-material";

type SelectProps = {
    control: any; setValue: any;
    fieldError: FieldError | undefined;
    label: string;
    placeholder: string
};

export function CustomSelect({ control, setValue, fieldError, label,placeholder }: SelectProps) {
    return <Controller
        name="role"
        control={control}
        render={({ field: { name } }) =>
            <FormControl sx={{ my: 1 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                    {label}
                </FormLabel>
                <Select
                    name={name}
                    placeholder={placeholder}
                    onChange={(_: any, value: any) => {
                        console.log(value);
                        setValue("role", { label: String(value), value: value });
                    }}
                >
                    <Option value="CLIENT">Client</Option>
                    <Option value="ADMIN">Admin</Option>
                </Select>
                {fieldError?.message && (
                    <FormHelperText sx={{ color: "red" }}>
                        <InfoOutlined color="error" />
                        {fieldError.message}
                    </FormHelperText>
                )}
            </FormControl>} />;
}
