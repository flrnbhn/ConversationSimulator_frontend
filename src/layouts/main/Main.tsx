import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import {Chat} from "../../pages/chat/Chat";

export const Main = () => {
    return (
        <Routes>
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}
