import React, { useEffect, useState } from 'react';

import {Button} from "@material-ui/core"
import  TextField from '@material-ui/core/TextField'
import  {Radio, FormLabel, RadioGroup, FormControlLabel, FormControl} from '@material-ui/core'



function Form() {


  //Hooks for fetched questions and checkbox answers
  const [json, setJson] = useState({questions: []})
  const [radioChoices, setChoice] = useState([])
     
  useEffect (() => {
    fetchQuestion();
    },[])


  //checkbox questions selected choices
  const handleChange = (event) => {
    setChoice({...radioChoices, [event.target.name]: event.target.value});
    console.log(radioChoices)
  };


  //Saving an answer to and linking a question for it
  const saveAnswer = async (answertosave) => {
    await fetch('https://formproject6.herokuapp.com/answers',
    {
      method: 'POST',
      body: JSON.stringify(answertosave),
      headers: { 'Content-type' : 'application/json'  }
    })
    //.then(_ => fetchQuestion())
    .catch(err => console.error(err))
    console.log("\"" + answertosave.input + "\"" + " saved to db")
  }
  
  //Fetching all the questions from the backend
  const fetchQuestion = async () => {
    await fetch('https://formproject6.herokuapp.com/questions')
      .then(response => response.json())
      .then(data => {
        let jsonQ = {
          questions: [
           ]
        }
        let i = 0;
        //data from backend to right object format, then setting it as hooks content
        while (i < data.length) {
          jsonQ.questions[i] = {
            id: String(data[i].questionid),
            type: data[i].type,
            name: String(i),
            title: data[i].title,
            choices: data[i].choices
          }
          i++; 
          
        }
        setJson(jsonQ)
      }
      )
      .catch(err => console.error(err))
  }


  //Function to run when submit is fired
  const onComplete = () => {
    let answers = []

    //Getting all the answers from DOM, forming answer objects, then putting them to an array
    for(let i = 0; i < json.questions.length; i++) {
      if (json.questions[i].type === "checkbox") {
        answers[i] = {question: {questionid: json.questions[i].id}, input: radioChoices[json.questions[i].title]}
      } else {
        answers[i] = {question: {questionid: json.questions[i].id}, input: document.getElementById(json.questions[i].id).value}
      }
    }

    //Calling save function for each answer, but checking if input is not empty or undefined so that empty answers cannot be sent
    for(let i = 0; i < answers.length; i++) {
      if (answers[i].input === undefined) {
        continue
      } else if (answers[i].input.length === 0) {
        continue
      } else {
        saveAnswer(answers[i])
      }

    }
  }


  
  //Mapping questions with correct data, creating checkbox or text question depending on type
  return (
    <div>
      <FormControl  id="quiz">
        {json.questions.map((question, index) => {
          if (question.type === "text") {
            return <TextField style={{marginHorizontal: 10, padding: 10}} label={question.title} id={question.id} key={index} />
          } else if(question.type === "checkbox" && question.choices != null){
            return(
              <FormLabel key={index}>{question.title}
                <RadioGroup id={question.id} name={question.title} value={radioChoices[index]} onChange={handleChange} aria-label="choices">
                  {question.choices.map((choice, index) => {
                    return <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                  })}
                </RadioGroup>
              </FormLabel>
              )
            } else {
              return <p id={question.id} key={index}>nulli</p>
            }
          })
        }
        <Button type="submit" onClick={onComplete}>Submit</Button>
      </FormControl>
    </div>

  );
}

export default Form; 