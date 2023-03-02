import { ParentComponent } from 'solid-js';

export const Center: ParentComponent<{class?: string}> = (props) => {
  return <div class={`h-full w-full flex justify-center items-center ${props.class}`}>
    {props.children}
  </div>
}