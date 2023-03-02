import classNames from 'classnames'
import { ParentComponent } from 'solid-js';

type AnimatedSectionProps = {
  show: boolean;
  after?: boolean;
  before?: boolean;
  class?: string;
}

export const AnimatedSection: ParentComponent<AnimatedSectionProps> = (props) => {
  return <div class={classNames({
    'absolute inset-0 transition-all': true,
    [props.class ?? '']: true,
    'opacity-0 pointer-events-none': !props.show,
    'translate-x-2': !props.show && props.after,
    '-translate-x-2': !props.show && props.before,
  })}>
    {props.children}
  </div>
}