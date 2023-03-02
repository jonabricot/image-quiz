import { ParentComponent } from 'solid-js';

type ButtonProps = {
  class?: string;
  onClick?: () => void
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return <button onClick={props.onClick} class={`rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${props.class}`}>
    {props.children}
  </button>
}