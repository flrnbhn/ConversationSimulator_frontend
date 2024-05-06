import React from "react";
import { Routes, Route } from "react-router";
import {Chat} from "../../pages/chat/Chat";
import {Test} from "../../pages/Test/Test";

export const Main = () => {
    return (
        <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
}
