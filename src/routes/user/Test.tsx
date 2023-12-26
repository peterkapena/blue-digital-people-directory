import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import Select from 'react-select'; // Assuming you're using react-select
import Input from '@mui/material/Input'; // Assuming MUI for input
import { Option, Select } from '@mui/joy';

// Define the schema using Zod
const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    iceCreamType: z.object({
        label: z.string(),
        value: z.enum(['chocolate', 'strawberry', 'vanilla']),
    }),
});

interface IFormInput {
    firstName: string;
    lastName: string;
    iceCreamType: string;
}

export const TestSelect = () => {
    const { control, handleSubmit, setValue } = useForm<IFormInput>({
        resolver: zodResolver(schema), // Use the Zod resolver
        defaultValues: {
            firstName: '',
            lastName: '',
            iceCreamType: ''
        }
    });

    const processForm: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(processForm)}>
            {/* <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input {...field} />}
            /> */}
            <Controller
                name="iceCreamType"
                control={control}
                render={({ field: { value, onChange, name, } }) => <Select
                    name={name}
                    // value={value}
                    onChange={(e, value) => {
                        onChange(e)
                        console.log(value)
                        setValue("iceCreamType", String(value))
                    }}
                // onChange={onChange}
                // {...field}
                // onChange={}
                // options={[
                //     { value: "chocolate", label: "Chocolate" },
                //     { value: "strawberry", label: "Strawberry" },
                //     { value: "vanilla", label: "Vanilla" }
                // ]}
                >
                    <Option value="chocolate">chocolate</Option>
                    <Option value="vanilla">vanilla</Option>
                    <Option value="strawberry">strawberry</Option>

                </Select>}
            />
            <input type="button" value="Submit" onClick={() => console.log(control._formValues)} />
        </form>
    );
};
