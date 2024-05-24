import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConversationProvider} from "./context/conversationcontext/ConversationContext";
import {ExerciseProvider} from "./context/exercisecontext/ExerciseContext";
import {LearnerProvider} from "./context/learnercontext/LearnerContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <>
        <LearnerProvider>
            <ExerciseProvider>
                <ConversationProvider>
                    <App/>
                </ConversationProvider>
            </ExerciseProvider>
        </LearnerProvider>
    </>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
