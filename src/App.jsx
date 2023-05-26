import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import {nanoid} from 'nanoid'

export default function App() {

  const [nrRolls, setNrRolls] = React.useState(0);


  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld === true);
    const sameValue = dice.every((die) => die.value === dice[0].value);

    if (allDiceHeld && sameValue) {
      setTenzies(true);
      console.log("You won!");
    }} ,[dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die=>{
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
  }))
    
  }
  const diceElements = dice.map(die=>(
  <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />))

  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        setNrRolls((prevNrRolls) => prevNrRolls + 1);    
      } else {
        setNrRolls(0)
        setTenzies(false)
        setDice(allNewDice())
    }
}

  return (
      <main>
        {tenzies && <Confetti/>}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all numbers are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>

          <button className='roll-dice' onClick={rollDice}>{tenzies ? "Reset Game" : "Roll"}</button>
          <p>You have rolled {nrRolls} times</p>
          {tenzies && <h2>You've Won!</h2>}
      </main>
  )
}