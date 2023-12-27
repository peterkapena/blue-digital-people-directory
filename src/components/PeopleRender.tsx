import { Box, Button, FormControl, FormLabel, Typography } from "@mui/joy";
import CustomAutocomplete from "./CustomAutocomplete";
import { DownloadDoneRounded } from "@mui/icons-material";
import CustomTable from "./CustomTable";
import useApi, { API_RSRC_LINKS } from "../api/useApi";
import { PersonOutModel } from "../api/people";
import { useMemo, useState } from "react";
import { ROUTES } from "../common";
import CountrySelector from "./CountrySelector";
import GenderSelect from "./GenderSelect";

const columns = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'surname', numeric: false, label: 'Surname' },
  { id: 'emailAddress', numeric: false, label: 'Email address' },
];

export function PeopleRender() {
  const { data } = useApi<PersonOutModel[]>(API_RSRC_LINKS.getpeople, { method: "GET" });
  const [filterPerson, setFilterPerson] = useState<PersonOutModel | null>();
  const [filterCountry, setFilterCountry] = useState<string | null>("");
  const [filterGender, setFilterGender] = useState<string | null>("");

  const handleAutocompleteChange = (option: any) => {
    if (option && option.value) {
      setFilterPerson(option.value);
    } else {
      setFilterPerson(null); // Reset filter when selection is cleared
    }
  };

  const handleCountryFilter = (country: any) => {
    if (country) {
      setFilterCountry(country);
    } else {
      setFilterCountry(""); // Reset filter when selection is cleared
    }
  };

  const handleGenderFilter = (gender: string) => {
    if (gender && gender !== "all") {
      setFilterGender(gender);
    } else {
      setFilterGender(null); // Reset filter when selection is cleared
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((person) => {

      return (
        (!filterPerson || person.id === filterPerson.id) &&
        (!filterCountry || person.country === filterCountry) &&
        (!filterGender || person.gender === filterGender)
      );
    });
  }, [data, filterPerson, filterCountry, filterGender]);

  if (!data || data.length === 0)
    return <div>No data</div>;

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
          {/* <CustomAutocomplete
            onChange={handleAutocompleteChange}
            placeholder={"Start typing"}
            options={data.map(p => ({ label: `${p.name} ${p.surname}`, value: p }))}
          /> */}

        </FormControl>
        <CountrySelector setFormValue={(option) => handleCountryFilter(option?.label)} />
        <GenderSelect setFormValue={(option) => option && handleGenderFilter(option)} />
      </Box>

      {filteredData && <CustomTable
        data={filteredData.map(p => ({
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
