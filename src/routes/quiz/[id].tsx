
import { Center } from '~/components/layout/Center';
import { AnimatedSection } from '~/components/layout/AnimatedSection';
import { QuizResult } from '~/components/QuizResult';
import { QuizLayout } from '~/components/layout/QuizLayout';
import { createQuizStore, QuizzStoreType } from '~/stores/quiz'
import { createContext, For } from 'solid-js';
import { PageLayout } from '~/components/layout/PageLayout';
import { Quiz } from '~/components/Quiz';
import { useLocalStorage } from 'solidjs-hooks';
import { useParams } from 'solid-start';

export const QuizContext = createContext({} as QuizzStoreType);

export default function QuizPage() {
  const currentParams = useParams()
  console.log(currentParams.id)
  const store = createQuizStore(currentParams.id)

  function getQuizState(index: number) {
      if (store.state.answers[index] !== undefined) {
          return 'result'
      }
      else if (store.state.selectedIndex !== -1) {
          return 'selected'
      } 

      return 'idle' 
  }

  return <QuizContext.Provider value={store}>
    <PageLayout>
      <QuizLayout>
        <div class="h-full w-full relative overflow-hidden">
          <For each={store.state.questions}>
            {(question, index) => <AnimatedSection
              show={index() === store.state.index && store.state.state === 'quiz'}
              before={index() < store.state.index}
              after={index() > store.state.index}
              class="flex overflow-auto justify-center"
            >
              <Quiz
                class="self-center"
                state={getQuizState(index())}
                onSelect={(e) => store.setState({selectedIndex: e})}
                {...question}
              />
            </AnimatedSection>}
          </For>
            

          <AnimatedSection
            show={store.state.state === 'result'}
            after={store.state.state !== 'result'}
          >
            <Center class="p-4">
              <QuizResult />
            </Center>
          </AnimatedSection>
        </div>
      </QuizLayout>
    </PageLayout>
  </QuizContext.Provider>
}
