import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { useNavigate } from 'react-router-dom';
import SelectField from "../components/SelectField"
import TextFieldcomp from "../components/TextFieldcomp"
import useAxios from "../Hooks/useAxios"


const Settings = () => {

  const {response , error , loading} = useAxios({ url : "/api_category.php"}) ;
  const navigate = useNavigate();

  if(loading){
    return (
      <Box mt={20}>
        <CircularProgress />

      </Box>
    )
  }

  if(error){
    return (
      <Typography variant="h6" mt={20} color="red">
        something wrong

      </Typography>
    )
  }

  const diffcultyOptions = [
    { id : "easy" , name : "Easy"},
    { id : "medium" , name : "Medium"},
    { id : "hard" , name : "Hard"},
  ]

  const typeOptions = [
    {id: "multiple" , name : "Multiple Choice"},
    {id: "boolean" , name : "True/False"},
  ]

  const handleSubmit = (e) => {
  
  navigate("/Questions");
  

};

  return ( 
    <> 
    <Typography variant="h2" fontWeight="bold">quiz app</Typography>
    <form onSubmit={handleSubmit}>
      <SelectField options = {response.trivia_categories}  label="Category"/>
      <SelectField options={diffcultyOptions} label="Difficulty"/>
      <SelectField  options={typeOptions} label="Type"/>
      <TextFieldcomp />
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">Get Started</Button>
      </Box>

    </form>
  </> 
  )
   
}

export default Settings