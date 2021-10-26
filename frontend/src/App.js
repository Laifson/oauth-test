import Header from './components/Header'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import Homepage from './pages/Homepage'
import AddQuestion from './pages/Add-Question'
import useQuestions from './hooks/useQuestions'
import Play from "./pages/Play";
import {useContext, useEffect, useState} from "react";
import {getQuestion} from "./service/devQuizApiService";
import LoginPage from './pages/LoginPage'
import {AuthContext} from "./context/AuthProvider";
import PrivateRoute from "./routing/PrivateRoute";

function App() {

    const {questions, saveQuestion} = useQuestions()
    const [playQuestion, setPlayQuestion] = useState()
    const {token} = useContext(AuthContext)


    const getNextQuestion = () => {
        getQuestion(token).then(result => {
            setPlayQuestion(result)
        })
    }

    useEffect(() => {
        getNextQuestion();
    }, []);

     return (
        <div className="App">
            <Header/>
            <Switch>
                <PrivateRoute exact path="/">
                    <Homepage questions={questions}/>
                </PrivateRoute>
                <PrivateRoute exact path="/add-question">
                    <AddQuestion saveQuestion={saveQuestion}/>
                </PrivateRoute>
                <PrivateRoute path="/play">
                    {playQuestion && <Play question={playQuestion} playNext={getNextQuestion}/>}
                </PrivateRoute>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
