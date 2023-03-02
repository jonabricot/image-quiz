
import { Component } from 'solid-js';
import classNames from 'classnames'

const availableOutlines = {
  none: '',
  default: 'outline-indigo-500',
  success: 'outline-green-500',
  error: 'outline-red-500',
}

type QuizOptionProps = {
  src: string;
  class?: string;
  transform: string;
  outline: keyof typeof availableOutlines;
  muted: boolean;
  display: string;
  onFocus: () => void
}

export const QuizOption: Component<QuizOptionProps> = (props) => {
  const outlineBasis = 'outline outline-2 outline-offset-4 outline-solid'

  const computedOutline = () => {
    if (availableOutlines.hasOwnProperty(props.outline) && availableOutlines[props.outline]) {
      return `${outlineBasis} ${availableOutlines[props.outline]}`
    }

    return ''
  }

  const computedStyle = () => {
    let ratio = "33%"
    if (props.display === 'result') {
      ratio = "80%"
    } 
    return {
      "padding-bottom": ratio,
    }
  }

  return <div
    class={classNames({
      'grid overflow-hidden rounded transition-all relative w-full bg-slate-600 drop-shadow': true,
      [computedOutline()]: true,
      [props.class ?? '']: true,
      'opacity-50': props.muted,
      'duration-1000': props.display === 'result'
    })}
    style={computedStyle()}
    tabindex="0"
    onFocus={props.onFocus}
  >
    <div class="absolute w-full h-full flex items-center content-center">
      <img
        src={props.src}
        class="object-cover object-center pointer-events-none transition-all duration-1000 min-w-full min-h-full"
        style={props.display === 'result' ? {} : {transform: props.transform}}
      />
    </div>
    <slot />
  </div>
}

  