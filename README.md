# code-quiz
Timed Multiple Choice Quiz using JavaScript

## Quiz Application
This is a simple quiz application presenting 5 questions to the user and recording how long it take to complete the quiz. Incorrect answers deduct 10 seconds from the time, with the time remaining being the user's score at the end. A scoreboard is displayed that logs and sorts the users scores.


## Links
The deployed website can be found [here](https://benfok.github.io/code-quiz/)

The repository in GitHub is [here](https://github.com/benfok/code-quiz)

## Demonstration
Here is a demonstration of my finished page. Some key details and learnings are below.

![Demo of my finished webpage](https://watch.screencastify.com/v/WfjFsELHETdAzb76Tcsr)

## Details and Learnings
- 5 questions are selected at random from an array within the questions.js file. An unlimited number of questions could be added tot he file to enhance the challenge and replayability of the application.
- After each answer selection Correct or Wrong is displayed and the answer buttons are disabled for a period of 1 second in order to provide feedback to the user.
- Scores are stored within the browser's local storage. They can be cleared using the Reset Scores button on the highscores page. As scores are submitted, initials entered are converted to uppercase, the page is updated and the data sorted by high score and presented immediately back to the user within the highscores table.
- Negative scores are not possible. Should the time reach 0 the game is ended and the score is 0.
- Getting the style to remain on the clicked answer button prior to the next question rendering required some JS using the classList.add and remove methods.

