import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxios from "../Hooks/useAxios"
import { handleScoreChange } from "../redux/actions"
import {decode} from 'html-entities';


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}


const Questions = () => {

  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,

  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;

  if(question_category){
    apiUrl = apiUrl.concat(`&category=${question_category}`)
  }

  if(question_difficulty){
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`)
  }
  if(question_type){
    apiUrl = apiUrl.concat(`&type=${question_type}`)
  }
  
  const {response,loading} = useAxios({ url : apiUrl});console.log(response);
  const [questionIndex , setQuestionIndex] = useState(0);
  const [options,setOptions] = useState([]);
  

  useEffect(()=>{
    if(response?.results.length){
      const question = response.results[questionIndex];
      console.log(question)
      let answers = [...question.incorrect_answers];
       answers.splice(
        getRandomInt(question.incorrect_answers.length),
       0 ,
       question.correct_answer
       );
       setOptions(answers);
      
    }

  } , [response , questionIndex]);

  if(loading){
    return (
      <Box mt={20}>
        <CircularProgress />

      </Box>
    )
  }

  const  handleClickAnswer = (e) => {

    const question = response.results[questionIndex];
    if(e.target.textContent === question.correct_answer){
      dispatch(handleScoreChange(score+1));
      
      

    }
    if(questionIndex + 1 < response.results.length){
      setQuestionIndex(questionIndex + 1);
    } 
    else {
      navigate('/score');

    }
  }

  return (
    <Box>
      <Typography variant="h4">Question {questionIndex + 1}</Typography>
      <Typography mt={5}>{ decode(response.results[questionIndex].question)}</Typography>
      {options.map((data , id) => (
          <Box mt={2} key={id}>
           <Button onClick={handleClickAnswer} variant="contained">{decode(data)}</Button>

           </Box>
      ))
      }
      <Box mt={5}>
     <Button> Score: {score}/{response.results.length}</Button>
      </Box>
      </Box>
            
    
  )
}

export default Questions