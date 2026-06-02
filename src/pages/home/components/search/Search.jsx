import { Box, Button } from "@mantine/core";
import classes from "./Search.module.css";
import { useState } from "react";


export default function Search({setSearchValue , setIsValueSearch , setIsValue}) {
const [ value , setValue]=useState("")

// in here to convert to true for search and false for filter to get data with search
function handleSearch() {
setIsValueSearch(false)
setIsValue(false)
}

  return (
    <Box className={classes.containerSearch}>
      <form>
        <Box
          className={classes.filterForm}
        >
          <input
            type="text"
            name="search"
            placeholder="Search.."
            className={classes.inputFilter}
            style={{ width: "71%", marginBottom: "10px" }}
            width={"100%"}
            onChange={(e)=>{
              setSearchValue(e.target.value),
              setValue(e.target.value),
              console.log(e.target.value);
            }}
          />
          
          <Button className={classes.btnFormFilter} onClick={()=>{ setSearchValue(value) ,handleSearch() }}>
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
}
