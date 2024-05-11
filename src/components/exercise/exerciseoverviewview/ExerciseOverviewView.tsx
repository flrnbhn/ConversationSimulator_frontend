import {useExercise} from "../../../hooks/exercisehook/useExercise";
import {useEffect} from "react";
import {ExerciseTile} from "../exercisetile/ExerciseTile";
import {useConversation} from "../../../hooks/conversationhook/useConversation";
import {useNavigate} from "react-router";


export const ExerciseOverviewView = () => {
    const {fetchAllExercises, allExercisesState} = useExercise();
    const {postNewConversation, currentConversationId} = useConversation();
    const navigate = useNavigate();


    useEffect(() => {
        fetchAllExercises();
    }, []);


    useEffect(() => {
        console.log(allExercisesState);
    }, [allExercisesState]);

    const enterConversation = (exerciseId: number) => {
        postNewConversation(exerciseId);
        navigate('/chat');
    }


    return (
        <>
            <div>
                Übungsübersicht
            </div>
            <div>
                {allExercisesState.map((exercise) => (
                    <div key={exercise.exerciseId}>
                        <ExerciseTile exerciseData={exercise}
                                      buttonFunction={() => enterConversation(exercise.exerciseId)}/>
                    </div>
                ))}
            </div>
        </>
    );
};