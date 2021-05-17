import React, { useEffect, useState } from 'react';

import {Button} from "@material-ui/core"
import  TextField from '@material-ui/core/TextField'
import  {Radio, RadioGroup, FormControlLabel, FormControl} from '@material-ui/core'



function Form() {

  const [json, setJson] = useState({questions: []})
     
  useEffect (() => {
    fetchQuestion();
    
    },[])

  const saveAnswer = async (answertosave) => {
    console.log(answertosave)

    await fetch('https://formproject6.herokuapp.com/answers',
    {
      method: 'POST',
      body: JSON.stringify(answertosave),
      headers: { 'Content-type' : 'application/json'  }
    })
    //.then(_ => fetchQuestion())
    .catch(err => console.error(err))
  }
  
  const fetchQuestion = async () => {
    await fetch('https://formproject6.herokuapp.com/questions')
      .then(response => response.json())
      .then(data => {
        let jsonQ = {
          questions: [
           ]
        }
        let i = 0;
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

  const onComplete = () => {
    console.log("Survey set to true")
    let answers = []
    for(let i = 0; i < json.questions.length; i++) {
      answers[i] = {question: {questionid: json.questions[i].id}, input: document.getElementById(json.questions[i].id).value}
    }
    console.log(answers)

    for(let i = 0; i < answers.length; i++) {
      if (answers[i].input === undefined) {
        continue
      } else if (answers[i].input.length === 0) {
        continue
      } else {
        saveAnswer(answers[i])
        console.log(answers[i] + "saved to db")
      }

    }
  }


  

  return (
    <div>
    <FormControl  id="quiz">
      {json.questions.map((question, index) => {
        if (question.type === "text") {
          return <TextField style={{marginHorizontal: 10, padding: 10}} label={question.title} id={question.id} key={index} />

        } else if(question.type === "checkbox" && question.choices != null){
          
           return(
              <RadioGroup id={question.id} key={index} name={question.title} aria-label="choices">
                {question.choices.map((choice, index) => {
                  return <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                })}
              </RadioGroup>
            )
            
          } else {
            return <p key={index}>nulli</p>
          }
      }
      )
      }
      <Button type="submit" onClick={onComplete}>Submit</Button>
    </FormControl>
    
    </div>

  );
}

export default Form; 