/* eslint-disable no-unused-vars */
import { Box, Button, Select } from "@mantine/core";
import classes from "./Filter.module.css";
import { useEffect, useRef, useState } from "react";
import API_CONFIG from "../../../../core/utils/apiConfig";

// category=Shoes&price_gte=50&name:contains=a&brand=Adidas
const endpointForCategories = API_CONFIG.endpoints.categories.allCategories;

export default function Filter({setFilterQuery, setIsValue}) {
  // to get category value from select
  const selectRef = useRef();

  const [categories, setCategories] = useState([]);
  // to get data from form and convert it to query string
  const [formData , setFormData]=useState({ 
    name:"",
    brand:"",
    price_gte: 0
  })


  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForCategories)
      .then((res) => res.json())
      .then((data) => {
        ( setCategories(data));
      });
  }, []);

  
  
  // to get data from form and convert it to query string
  function handleData(e){
    setFormData({...formData ,[e.target.name] : e.target.value })
    // console.log(formData);
  }

  useEffect(() => {
  // console.log(formData);
}, [formData]);

// to submit form and convert data to query string
function formSubmit(e) {
  e.preventDefault();
  // to convert to true for filter and false for search to get data with filter
  setIsValue(true)

  let queryArr = [];
// to loop on form data and convert it to query string and push it to queryArr
  for (let key in formData) {
    let value = formData[key];
// to check if there is value in form data 
    if (value) {
      // edit brand
      // to make first letter capital in brand value because in backend the brand name start with capital letter
      if (key === "brand") {
        value = value[0].toUpperCase() + value.slice(1);
      }

      // edit key for name
      // to make name:contains in key because in backend we use name:contains for search by name and if we send name it will search for exact match
      if (key === "name") {
        key = "name:contains";
      }
// to push key and value to queryArr in format key=value
      queryArr.push(`${key}=${value}`);
    }
  }

  // add category
  const category = selectRef.current?.value;

  if (category) {
    queryArr.push(`category=${category}`);
  }

  const queryString = queryArr.join("&");
  setFilterQuery(queryString);
}


  
  return (
    <Box className={classes.container}>
      <form className={classes.filterForm}>
        <Box className={classes.containerInput}>
          <input
          onChange={handleData}
            type="text"
            name="name"
            placeholder="Product"
            value={formData.name}
            className={classes.inputFilter}
          />
          <input
          onChange={handleData}
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            className={classes.inputFilter}
          />
        </Box>

        <Box className={classes.containerInput}>
          <Select    
            className={classes.inputSelect}
            placeholder="Select Category"
            data={categories.map((ele) => ele.name)}
            clearable
            ref={selectRef}
            styles={{input:{
              border:"0px solid #ccc",
            }}}
            />
          <input
          onChange={handleData}
            type="number"
            name="price_gte"
            value={formData.price_gte}
            placeholder="Price"
            className={classes.inputFilter}
          />
        </Box>
        <Box className={classes.containerBtn}>
          <Button onClick={formSubmit} className={classes.btnFormFilter} >
            Search
          </Button>
          <Button className={classes.btnFormFilter} type="reset" onClick={()=>{ setFilterQuery(""), setFormData({name:"" , brand:"" , price_gte:0})}}>
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
}
