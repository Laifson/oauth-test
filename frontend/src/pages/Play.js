import styled from "styled-components";
import Question from "../components/Question";
import * as React from "react";
import * as PropTypes from "prop-types";
import {checkAnswer} from "../service/devQuizApiService";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";

Play.propTypes = {
    question: PropTypes.object
}

export default function Play({question, playNext}) {

const [answerIsCorrect, setAnswerIsCorrect] = useState();
const {token} = useContext(AuthContext);

const resetAnswers = () => setAnswerIsCorrect();

const checkIfCorrect = (question, chosenId) => {
    checkAnswer(question, chosenId, token).then((data) => setAnswerIsCorrect(data))
}

    return (
        <div>
            <QuestionsContainer>
                <Question question={question} checkIfCorrect={checkIfCorrect} answerIsCorrect={answerIsCorrect} playNext={playNext} resetAnswers={resetAnswers}/>
            </QuestionsContainer>
        </div>
    )
}

const QuestionsContainer = styled.section`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #424B54;
  padding: 50px;
`