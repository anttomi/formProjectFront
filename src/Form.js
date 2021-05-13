import React, { useEffect, useState } from 'react';
import Text from "./components/Text"
import {Button} from "@material-ui/core"
import  TextField from '@material-ui/core/TextField'
import  {Radio, RadioGroup, FormControlLabel} from '@material-ui/core'



function Form() {
  /**
  const [question, setQuestion] = useState({id: null, title: "", type: "", choices: ([]) });
  const [answer, setAnswer] = useState()
   */
  const [complete, setComplete] = useState(false)
  const [json, setJson] = useState({questions: []})
  const [answer, setAnswer] = React.useState({question: {questionid: 3}, input: ''})
  const [answers, setAnswers] = React.useState([])
  const [question, setQuestion] = useState({title: "toinen ksymys",type: "checkbox",choices: [ "kyllä","en tiedä",  "ei"]})
  const [questiontwo, setQuestiontwo] = useState({title: "toinen ksymys",type: "text"})
     
  useEffect (() => {
    fetchQuestion();
    
    },[])

  const saveAnswer = async () => {
    console.log(answer)

    await fetch('http://localhost:8080/answers',
    {
      method: 'POST',
      body: JSON.stringify(answer),
      headers: { 'Content-type' : 'application/json'  }
    })
    //.then(_ => fetchQuestion())
    .catch(err => console.error(err))
  }

  const inputChanged = (event) => {
    setAnswer({ ...answer, [event.target.name]: event.target.value });
  }

  const saveQuestion = async () => {
    console.log(question)

    await fetch('http://localhost:8080/questions',
    {
      method: 'POST',
      body: JSON.stringify(questiontwo),
      headers: { 'Content-type' : 'application/json'  }
    })
    //.then(_ => fetchQuestion())
    .catch(err => console.error(err))
  }
  
  const fetchQuestion = async () => {
    await fetch('http://localhost:8080/questions')
      .then(response => response.json())
      .then(data => {
        let jsonQ = {
          questions: [
           ]
        }
        let i = 0;
        while (i < data.length) {
          jsonQ.questions[i] = {
            id: data[i].id,
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
    setComplete(true);
    saveAnswer();
    
  }

  

  return (
    <div>
    <form  id="quiz" action="#" onSubmit={onComplete}>
      {json.questions.map((question, index) => {
        if (question.type === "text") {
          return <TextField style={{marginHorizontal: 10, padding: 10}} label={question.title} id={question.id} key={index} />

        } else if(question.type === "checkbox"){
          
           return(
              <RadioGroup id={question.id} key={index} name={question.title} aria-label="choices">
                {question.choices.map((choice, index) => {
                  return <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                })}
              </RadioGroup>
            )
            
          } else {
            return <p>nulli</p>
          }
      }
      )
      }
      <Button>Submit</Button>
    </form>
    <button onClick={saveQuestion}>Lähetä</button>
    </div>

  );
}

export default Form;