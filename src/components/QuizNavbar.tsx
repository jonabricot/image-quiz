
import { Button } from '~/components/Button'
import { AnimatedSection } from '~/components/layout/AnimatedSection'
import { Component, For, Show, useContext } from 'solid-js';
import classNames from 'classnames'
import { QuizContext } from '~/routes/quiz/[id]';
import { useNavigate } from 'solid-start';

export const QuizNavbar: Component = () => {
  const navigate = useNavigate()
  const {state, setState, saveAnswer, hasRespondedCurrentQuestion, hasNextIndex} = useContext(QuizContext);

  function next() {
    if (state.state === 'result') {
      navigate('/home')
    } else if (!hasRespondedCurrentQuestion()) {
      saveAnswer(state.selectedIndex)
    } else if (hasNextIndex()) {
      setState({
        index: state.index + 1,
        selectedIndex: -1
      })
    } else {
      setState({
        state: "result"
      })
    }
  }

  const canNext = () => {
    if (state.state === 'quiz' && state.selectedIndex === -1) return false
    else return true
  }

  return <div class="bg-gray-800 bg-opacity-50 p-4 grid gap-4">
    <div class="grid items-center" style="grid-template-columns: 1fr auto">
      <div v-if="store.state ==='quiz'" class="relative h-full">
        <For each={state.questions}>
          {(question, index) => <AnimatedSection
            show={state.index === index() && state.state === 'quiz'}
            class="flex items-center"
          >
            {question.description}
          </AnimatedSection>}
        </For>
      </div>
      <div class="justify-self-center">
        <Button 
          class={classNames({'opacity-50 pointer-events-none': !canNext(), 'transition-all': true})}
          onClick={next}
        >
          <Show when={state.state === 'quiz'}>Suivant</Show>
          <Show when={state.state === 'result'}>Page d'accueil</Show>
        </Button>
      </div>
    </div>
  </div>
}

  