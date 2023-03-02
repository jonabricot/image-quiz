export const QuizContext = createContext([{ questions: [] }, {}]);

import {quizStore} from '~/store/quiz'

export function QuizProvider(props) {
    return <QuizContext.Provider value={quizStore}>
        {props.children}
    </QuizContext.Provider>
}