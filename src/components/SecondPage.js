import axios from 'axios'
import React from 'react'
import {nanoid} from 'nanoid'
import QuizComponent from './QuizComponent';
import Confetti from 'react-confetti'


export default function SecondPage() {
    const [data, setData] = React.useState([])
    const [track, setTrack] = React.useState(true)
    const [changeData, setChangeData] = React.useState(true)
    const [score, setScore] = React.useState(0)

    React.useEffect(() => {
         axios('https://the-trivia-api.com/api/questions')
         .then(data => (data.data))
         .then(data => setData(data.map(questionObject => {
            const options = [...(questionObject.incorrectAnswers),questionObject.correctAnswer];
            const optionObject = options.map(option => {
                return {
                    id: nanoid(),
                    value:option,
                    isHeld:0 
                }
            })
            return {
                id:questionObject.id,
                question:questionObject.question,
                options:optionObject,
                correctAnswer:questionObject.correctAnswer
            }
         })))
    }, [changeData])

    const handleClick = (questionId, optionId) => {
        setData(data.map(questionObject => {
            if(questionObject.id === questionId){
                const updatedOption = questionObject.options.map(optionObject => {
                    if(optionObject.id === optionId){
                        if(!optionObject.isHeld){ return {...optionObject, isHeld:1} }
                        return {...optionObject, isHeld:0}
                    }
                    return {...optionObject, isHeld:0};
                })
                return {...questionObject, options:updatedOption}
            }
            return questionObject
        }))
    }

    const checkAnswers = () => {
        setData(data.map(questionObject => {
            const answer = questionObject.correctAnswer;
            const op = questionObject.options.map(optionObject => {
                if(optionObject.isHeld===1){
                    if(optionObject.value===answer){
                        setScore(prev => prev+1)
                        return {...optionObject, isHeld:2};
                    }
                    return {...optionObject, isHeld:3}
                }
                return {...optionObject}
            })
            return {...questionObject, options:op}
        }))
        setTrack(prev => !prev)
    }

    const changePage = () =>{
        setScore(0)
        setTrack(previousValue => !previousValue)
        setChangeData(previousValue => !previousValue)
    }

    const quizElements = data.map(obj => {
        return <QuizComponent 
                key = {obj.id}
                id = {obj.id}
                question={obj.question} 
                options={obj.options}
                handleClick = {handleClick}
                />
    })

    return(
        <div className='secondpage'>
            <div>
                {quizElements}
            </div>
            <div className='button-container'>
                {score > 8 && <Confetti />}
                {!track && <a>You've scored {score}/10 correct answers</a>}
                {track && <button className='check--answers--button' onClick={checkAnswers}>Check answers</button>}
                {!track && <button className='check--answers--button' onClick={changePage}>Play again</button>}
            </div>
            
        </div>
    )
} 