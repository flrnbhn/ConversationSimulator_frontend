import React from "react";
import {Navigate, Route, Routes} from "react-router";
import {Chat} from "../../pages/chat/Chat";
import {Test} from "../../pages/Test/Test";
import {ExerciseOverview} from "../../pages/exercise/ExerciseOverview";
import {Evaluation} from "../../pages/evaluation/Evaluation";
import {Login} from "../../pages/login/Login";
import {Registration} from "../../pages/registration/Registration";
import ProtectedRoute from "../../routing/routingprotection/ProtectedRoute";
import {LearnProgress} from "../../pages/learnprogress/LearnProgress";
import {Home} from "../../pages/home/Home";
import {Achievement} from "../../pages/achievement/Achievement";

export const Main: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <Chat/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/test"
                element={
                    <ProtectedRoute>
                        <Test/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/exercises"
                element={
                    <ProtectedRoute>
                        <ExerciseOverview/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/evaluation"
                element={
                    <ProtectedRoute>
                        <Evaluation/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learnProgress"
                element={
                    <ProtectedRoute>
                        <LearnProgress/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/achievement"
                element={
                    <ProtectedRoute>
                        <Achievement/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/login" replace/>}/> {}
        </Routes>
    );
};