import React from "react";
import {useTest} from "../../hooks/testhook/useTest";


export const TestView = () => {

    const {fetchTestString} = useTest();

    function handleSend() {
        fetchTestString();
    }

    return (
        <>
            <div>
                Test
                <br/>
                <button onClick={handleSend}>Click Me!</button>
                <br/>

            </div>
        </>
    );
}
