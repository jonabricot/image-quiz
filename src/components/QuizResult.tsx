
import { Component, For, useContext } from 'solid-js';
import classNames from 'classnames'
import { QuizContext } from '~/routes/quiz/[id]';

const messages = [
  "Rien à dire. Lolo te dois une raclette*",
  "Bravo, lolo doit te payer une bière*",
  "Hmm, c'est moyen... Une bière à celui qui gagne au shifoumi*",
  "Peut mieux faire ! Tu dois une bière à lolo*",
  "L'important, c'est de participer... Tu dois une raclette à lolo*",
]

export const QuizResult: Component = () => {
  const {state, currentScore} = useContext(QuizContext);
  const maxScore = state.questions.length
  const middleIndex = Math.round((messages.length-1)/2)
  const scorePart = maxScore/messages.length 
  const scores =  messages.map((message, index) => {
    const baseValue = index * scorePart
    let minValue = (index + 1) * scorePart - 1
    let maxValue = baseValue

    if (index === middleIndex) {
      minValue = (index + 1) * scorePart
    }

    if (index > middleIndex) {
      minValue++
      maxValue++
    }

    return {
      min: maxScore - Math.round(minValue),
      max: maxScore - Math.round(maxValue),
      message
    }
  })

  function isCurrentScore({min, max}: {min: number, max:number}) {
    return currentScore() >= min && currentScore() <= max
  }

  function getScoreClasses(score: {min: number, max: number}) {
    return {
      'opacity-50 text-xs': !isCurrentScore(score),
      'py-4 text-xl': isCurrentScore(score)
    }
  }

  return <div class="grid gap-12">
    <div class="text-center">
      <h2 class="font-bold text-6xl">
        { currentScore() }/{ maxScore }
      </h2>
    </div>
    <div class="grid gap-x-2 gap-y-1 text-xs" style={{'grid-template-columns': 'auto 1fr'}}>
      <For each={scores}>
        {(score, index) => <>
            <div class={classNames(getScoreClasses(score), "font-bold")}>{ score.min }-{ score.max }:</div> 
            <div class={classNames(getScoreClasses(score))}>{ score.message }</div>
          </>
        }
      </For>
    </div>
  </div>
}

  