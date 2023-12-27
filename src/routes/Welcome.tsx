import { Input } from "@mui/joy";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SearchOffRounded, } from "@mui/icons-material";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";
import { PersonOutModel } from "../api/people";
import React from "react";
import { PeopleRender } from "../components/PeopleRender";


function Welcome() {

  return (
    <div>
      <PeopleRender />
    </div>
  );
}

export default Welcome;

