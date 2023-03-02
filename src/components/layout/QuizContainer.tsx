import { ParentComponent } from 'solid-js';

type QuizContainerProps = {
  class?: string;
}

export const QuizContainer: ParentComponent<QuizContainerProps> = (props) => {
  return <div class={`p-6 w-96 max-w-full ${props.class}`}>
    {props.children}
  </div>
}