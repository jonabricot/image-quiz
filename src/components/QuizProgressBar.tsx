
import { Component, For, useContext } from 'solid-js';
import classNames from 'classnames'
import { QuizContext } from '~/routes/quiz/[id]';

export const QuizProgressBar: Component = () => {
  const {state, hasResponded, hasGoodResponse, hasBadResponse} = useContext(QuizContext);

  return <div class="h-1 grid grid-flow-col gap-2 justify-center box-border">
    <For each={state.questions}>
      {(question, index) => <div
        class={classNames({
          'w-4 transition-all rounded': true,
          'bg-white': !hasResponded(index()),
          'bg-green-500': hasResponded(index()) && hasGoodResponse(index()),
          'bg-red-500': hasResponded(index()) && hasBadResponse(index()),
          'bg-opacity-30': state.index !== index() || state.state !== 'quiz',
        })}
      />}
    </For>
    
  </div>
}

  