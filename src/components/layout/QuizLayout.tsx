import { ParentComponent, Show, useContext } from 'solid-js';
import { QuizNavbar } from '~/components/QuizNavbar'
import { QuizProgressBar } from '~/components/QuizProgressBar'
import { QuizContext } from '~/routes/quiz/[id]';

export const QuizLayout: ParentComponent = (props) => {
  const { state } = useContext(QuizContext);

  return <div class="flex flex-col w-full h-full">
    <div class="flex-1 overflow-auto">
      {props.children}
    </div>
    <div class="relative">
      <div class="absolute grid gap-4 bottom-full w-full mb-4">
        <Show when={state.state === 'result'}>
          <div class="text-xs opacity-10 text-center px-4">*: Lolo n'a pas été consultée pendant la mise en place de ces gages. Arrangez-vous avec elle haha</div>
        </Show>
        <QuizProgressBar />
      </div>
      <QuizNavbar />
    </div>
  </div>
}