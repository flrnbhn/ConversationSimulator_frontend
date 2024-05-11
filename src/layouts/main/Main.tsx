import React from "react";
import {Route, Routes} from "react-router";
import {Chat} from "../../pages/chat/Chat";
import {Test} from "../../pages/Test/Test";
import {ExerciseOverview} from "../../pages/exercise/ExerciseOverview";

export const Main = () => {
    return (
        <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/test" element={<Test />} />
            <Route path="/exercises" element={<ExerciseOverview/>}/>
        </Routes>
    );
}
