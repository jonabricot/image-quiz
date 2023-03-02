
import { Component, createSignal, For, useContext } from 'solid-js';
import { QuizOption } from '~/components/QuizOption';
import { QuizContainer } from '~/components/layout/QuizContainer';

type QuizProps = {
  class?: string;
  answers: {src: string, transform: string}[];
  response: number;
  state: string;
  onSelect: (index: number) => void;
}

export const Quiz: Component<QuizProps> = (props) => {
  const [selected, setSelected] = createSignal(-1)

  function select(index: number) {
    if (props.state === 'result') return

    setSelected(index)
    props.onSelect(index)
  }

  function computedOutline(index: number) {
    if (selected() !== index) {
      return 'none'
    }

    if (props.state !== 'result') {
      return 'default'
    }

    if (selected() === props.response) {
      return 'success'
    }

    return 'error'
  }

  function computedMuted(index: number) {
    if (props.state === 'result') {
      return props.response !== index
    }

    if (props.state === 'selected') {
      return selected() !== index
    }

    return false
  }

  function computedSize(index: number) {
    if (
      props.state === 'selected' && index === selected() ||
      props.state === 'result' && index === props.response
    ) {
      return 'scale-105'
    }

    return ''
  }

  return <QuizContainer
    class={`grid justify-items-center items-center gap-4 ${props.class}`}
  >
    <For each={props.answers}>
      {(answer, index) => <QuizOption
        outline={computedOutline(index())}
        muted={computedMuted(index())}
        display={props.state}
        class={computedSize(index())}
        onFocus={() => select(index())}
        {...answer}
      />}
    </For>
  </QuizContainer>
}

  