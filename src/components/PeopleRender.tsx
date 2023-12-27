import { Box, Button, FormControl, FormLabel, Select, Typography } from "@mui/joy";
import CustomAutocomplete from "./CustomAutocomplete";
import { DownloadDoneRounded } from "@mui/icons-material";
import CustomTable from "./CustomTable";
import Option from '@mui/joy/Option';
import useApi, { API_RSRC_LINKS } from "../api/useApi";
import { PersonOutModel } from "../api/people";
import { useMemo, useState } from "react";
import { ROUTES } from "../common";

const columns = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'surname', numeric: false, label: 'Surname' },
  { id: 'emailAddress', numeric: false, label: 'Email address' },
];

export function PeopleRender() {
  const { data } = useApi<PersonOutModel[]>(API_RSRC_LINKS.getpeople, { method: "GET" });
  const [filteredData, setFilteredData] = useState<PersonOutModel[]>([]);

  const tableData = useMemo(() => {
    return filteredData.length > 0 ? filteredData : data;
  }, [filteredData, data]);

  const handleAutocompleteChange = (option: any) => {
    console.log(option?.value)
    if (!option?.value && data) {
      setFilteredData(data);
    } else if (data) {
      const filtered = data.filter(person => person.id === option.value.id);
      setFilteredData(filtered);
    }
  };

  if (!data || data.length === 0)
    return <div>No data</div>

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          People
        </Typography>
        <Button
          color="primary"
          startDecorator={<DownloadDoneRounded />}
          size="sm"
        >
          Add a person
        </Button>
      </Box>

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for a person</FormLabel>
          <CustomAutocomplete
            onChange={handleAutocompleteChange}
            placeholder={"Start typing"} options={data.map(p => ({ label: `${p.name} ${p.surname}`, value: p }))} />
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Country</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by country"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="refunded">Refunded</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>City</FormLabel>
          <Select size="sm" placeholder="All">
            <Option value="all">All</Option>
            <Option value="refund">Refund</Option>
            <Option value="purchase">Purchase</Option>
            <Option value="debit">Debit</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Gender</FormLabel>
          <Select size="sm" placeholder="All">
            <Option value="all">All</Option>
            <Option value="M">M</Option>
            <Option value="F">F</Option>
            <Option value="Other">Other</Option>
          </Select>
        </FormControl>
      </Box>

      {tableData && <CustomTable
        data={tableData.map(p => ({
          "name": p.name,
          "surname": p.surname,
          "emailAddress": p.emailAddress || "",
          "id": p.id
        }))}
        editPage={ROUTES.PERSON}
        columns={columns}
        title="People directory"
      />}
    </Box>
  );
}
