import { ParentComponent } from 'solid-js';

export const PageLayout: ParentComponent = (props) => {
  return <div class="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
    {props.children}
  </div>
}