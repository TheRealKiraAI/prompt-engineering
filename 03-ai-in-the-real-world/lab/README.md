# Lab #2: Advancing AI in the Real World - Performance Analysis

Create a way using our AI to analyze the correct amount of notes played based on a set of target notes. Example: Let's say our target notes are Do, Re, Mi or C, D, E. Create some logic for our AI to identify if the notes being played are the same as our target notes.

## Topics Covered

- - Put JavaScript and React into practice
- Advance logic utilizing data, your pre-trained AI model, and logic to make an informed decision
- Put it all together!

## Running the Exercise

To run the solution:

1. Navigate to the solution directory `cd solution`
2. Run `pnpm install` to install dependencies
3. Run `pnpm run dev` to start the development server.

## Instructions

Create a way using our AI to analyze the correct amount of notes played based on a set of target notes. Example: Let's say our target notes are Do, Re, Mi or C, D, E. Create some logic for our AI to identify if the notes being played are the same as our target notes.

### Step 0: Install dependencies

Run `pnpm install` to install dependencies in the `start` directory.

### Step 1: Create Target Notes

Create or decide a few notes for a sequence of notes. If you want to get fancy, feel free to use this virtual keyboard to come up with a good jingle. https://www.musicca.com/piano. Store your `targetNotes` in an array.

### Step 2: Create a function to Analyze Performance

In `notes.js` create a function called `analyzePerformance(notes)` that takes notes as an argument and does not return anything. In this function, loop through the number of targetNotes you have and compare the input notes with the targetNotes.

If notes includes targetNotes -> they are a match, console.log the note and a message.

If they are not a match, console.log an error message. P.S. Don't forget to call your function where we detect notes so you can see the log messages.

### Step 3: Keep Track of the Number of Correct Notes

Add a counter called `correctNotes`. If notes includes targetNotes, increment ` correctNotes``. Console.log your number of  `correctNotes` every time you detect a match.

### Step 4: Calculat the Performance Score

Create a variable called `performanceScore` and calculate the score using correctNotes Ex equation: (correctNotes / # of your target notes) \* 100.

### Step 5: Log the Performance Score

Write a conditional check.

If your `performanceScore is > #`, console.log a message with the current ``performanceScore`.

Else console.log a "keep practicing" message.

### ⭐ Bonus - Step 5: Create a Performance Score Component ⭐

Replace step 5 with a component. Instead of console.log messages to the screen with the `performanceScore`, create a component that displays the `performanceScore`.
