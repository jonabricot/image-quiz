import { ParentComponent } from 'solid-js';

export const Container: ParentComponent = (props) => {
  return <div class="px-4 container w-full m-auto">
    {props.children}
  </div>
}