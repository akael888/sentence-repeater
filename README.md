# Sentence Repeater
> Tech Used: React JS, Tailwind CSS, React Bootstrap, Framer Motion

> Link: https://sentence-repeater.vercel.app/

> Demo Video:

[![Demo Video](https://img.youtube.com/vi/cbcB9gO0w48/0.jpg)](https://www.youtube.com/watch?v=cbcB9gO0w48) 

## Problem
- Often, we need to write multiple sentences that have little to no variance. This takes unnecessary time. One might argue that we can copy and paste the sentence. However, what if there's a specific rule that we applied to that sentence? This is where the tool comes in handy.

## Solution
- Using a sentence repeater with a variable editing feature. Where the users can define the variable position within the sentence, and how its own set of rules applies when duplicating the sentence.

## Main Features
- Variable Definition: The Ability to define a variable that exists within the sentence. Each Variable has different types, operations, and rules
- Local Storage: Latest changes of the Sentence Input, Generate Amount, Variable Changes, and the Results will be stored in Local Storage. This way, the app remembers the user's latest input that persists upon refresh

## Other Features
- Dark Mode

## How to use

### Steps
1. Write your sentence
2. Input the amount to be generated
3. Generate!

### Variable Definition
1. Use these characters '{}' to define a variable and its position in the sentence
2. Adjust the variable's name, operation, and rules

### Operation
Each variable has different operations that are available for use. By default, there are two main operations: Randomize and Iterate.
- Randomize
  - Will generate a random value based on the min and max input in the variable.
    Example: Min (1) and Max (10) -> Generate 5 -> Results: 1,4,2,6,4
- Iterate
  - Will generate a value based on the start value given and the addition of the interval.
    Example: Start Value (5) and Interval (1) -> Generate 5 -> Results: 5,6,7,8,9

If all operations are disabled, the variable will be duplicated using its start value.

### Variable Type
- Currently, there are 4 types:
  - Integer
    - Integers have 2 operations: Randomize and Iterate
  - String
    - Strings have 0 operations
  - List
    - Lists have 2 operations: Randomize and Iterate
    - When using Randomize
      - The variable will randomize based on the value of the list
    - When using Iterate
      - Each value that exists in the list will be duplicated based on the number of intervals.
        - Example: List (John, Jesse) and Interval (2) -> Generate 2 -> Results: John, John, Jesse, Jesse
      - The generated amount will change based on the Highest List Variable (List Variable Size * Variable Interval = Highest List Variable)
  - and Date
    - Dates have 2 operations: Randomize and Iterate
