import React, { useState } from "react";

import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";


/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessed: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman({
  maxWrong = 6,
  images = [img0, img1, img2, img3, img4, img5, img6],
  words = ["apple"] }) {

  /** by default, allow 6 guesses and use provided gallows images. */

  // Add new state for randomWord 
  const [nWrong, setNWrong] = useState(0); //Add the number of wrong guesses
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState((words)[0]); //random word goes here?

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessed(g => {
      console.log("THISS -->", g);
      const newGuessed = new Set(g); // Creates a set from the ltrs chosen
      newGuessed.add(ltr); // Adds ltr to the new set 
      return newGuessed; // return set
    });

    setNWrong(n => n + (answer.includes(ltr) ? 0 : 1)); // Change 'setWrong' state-- if it includes ltr dont change image
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => ( // 
      <button
        key={ltr} //unique value 
        value={ltr} //
        onClick={handleGuess} //Run handleGuess on click, which will return a new set of updated ltrs
        disabled={guessed.has(ltr)} //ltr has already been chosen, prevents clicking again
      >
        {ltr}
      </button> //{ltr} === ^display the letter on button 
    ));
  }

  if (nWrong === maxWrong) {
    return (<div>
      <h3 className="lose">You lose!</h3><h5>{words[0]}</h5>
    </div>)
  }
  /** render: render game */
  return (
    <div className="Snowman">
      <img src={(images)[nWrong]} alt={nWrong} />
      <p>Number of Wrong Guesses: {nWrong}</p>
      <p className="Snowman-word">{guessedWord()}</p>
      <p>{generateButtons()}</p>
    </div>
  ); //^ Should these functions have ()?
}

export default Snowman;
