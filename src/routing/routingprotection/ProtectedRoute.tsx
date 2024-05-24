import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {LearnerContext} from "../../context/learnercontext/LearnerContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const context = useContext(LearnerContext);

    if (context === null) {
        return null;
    }

    const {learnerId} = context;

    if (learnerId === null || learnerId === -1) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
