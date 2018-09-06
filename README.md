'Monster-me' is a web app which allows users to build their own monster based on a selection of different body parts (eyes, body shape, legs etc). Users could also upload their own design for each body part if they wanted to. 

Check it out here: https://monster-me.herokuapp.com/

The monster design was done in freepik.

My inspiration for this project was https://gopherize.me/. I thought this was really fun and I wanted to learn how to build something like it. 

For this project, I used HTML Canvas element and Javascript to render the different body parts into the canvas. And CSS for the styling.

For the backend, I have Ruby on Rails set up with a simple database to store the image uploads. 

Some of the challenges I had: 
- Loading the pngs to the canvas was async (things can run before the previous job finishes). For example, if the eyes and mouth load on the page before the body loads, the monster won't have eyes / mouth as it's covered by the body. I ended up having to make the specific function that renders the images on the canvas synchronous (in this case: only load an image after the previous image is loaded).
- For the different colors, I saved the image pngs in different colors. This won't let users pick their own colors.. I wonder if using SVG would make changing colors easier.. 

Next up: 
- I'd like to create URL links so users can go back to it and share the link
- Shuffle (randomise) body parts to build a random monster
- Look into using svg instead of png?

