
# Recreating iOS Calculator (Portrait) in the Web (poorly coded edition) 

I can't believe this thing took a total of 30 hours... Been doing this without looking up on how to create a calculator, let's see how others do it... and make myself feel like a ultra noob while I am at it.

## What I learned:
- Learning to plan ahead
- See and write cleaner code (ok, technically for most of them, I was too lazy to rewrite them)
- Different ways to implement algorithm for the same thing
- More familiar with regex, closures, DOM, helper functions
- Git and Github
- .md

#

## Things maybe I should refactor (from the top of my head):
- I didn't like how for all the helper function, I had to pass in global functions instead of using it directly. There is no point in passing a function as an argument when you update your callback function on the outside and have to update the code inside the first class function too...
- There are a lot of ways to refactor values object...
- I should separate the helper functions and remove some redundant helper functions
- Make modular of course... file is too long

#

## Planned
- TODO: [...coreFeatures] ✅
- TODO: Add commas to textLabels when digits are below 10 ✅
- TODO: Use Git for Version Control ✅
- TODO: Add all other buttons' functionality ✅
- TODO: Don't allow decimal places to wreck the 9 max digit rule ✅
- TODO: Start using e at 1e9 ✅
- TODO: Allow num < 9e15 ✅
- TODO: Allow num > 1e-16 ✅
- TODO: Add CSS for Buttons ✅
- TODO: Get onto GitHub
- TODO: Mobile Responsive in the foreseeable future?
- TODO: Refactor in the unforeseeable future...
- Not Doing: Decrease textLabel font-size as number reaches the left edge of the textLabel
- Not Doing: Add exception to last todo, when number is (999,999,999), allow up to 5 decimal places
- Maybe Not: Decrease textLabel font-size as number reaches the left edge of the textLabel

## Scraped
- Potentially doable when we start rounding up to 5 decimal points when we use e: x.xxxxxexx, 1.59273e10. We can try separating 1.59273 and e10 into 2 different thing. However I am so done with this calculator...
- Scraped: Allow num < 1e161
- Scraped: Allow num > 1e-101