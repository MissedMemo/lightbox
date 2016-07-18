# take-home job application coding challenge

Relying only on plain Javascript and no external libraries, implement a Lightbox...

- use any public API to retrieve a set of images from the web
- clicking on an image should display a Lightbox detail view of that image
- support iterating through images, and displaying image captions
- demonstrate attention to performance considerations
- host your application on some public platform


Notes:

[http://lightboxing.herokuapp.com]()

- files index.php & composer.json required to host a static site on Heroku
- image data retrieved via Google's 'Custom Search Engine' (CSE) API, which has a hard limit of 100 queries per day (it resets at midnight). They have an additional limit of 10 items per query, so I issue multiple paged queries for every search in order to fill the view with enough items to demonstrate scrolling, handling of window resizing etc.
- a flag at the top of file app.js triggers image retrieval from a different site, [http://lorempixel.com](), to avoid being shut out by the 100-query limit during development, but that site only responds to a small set of specific search terms, returning many duplicate images.
- I've always done DOM manipulation using jQuery, so I had to look up various vanilla JS equivalents, and make decisions on how much I wanted to spend worrying about cross-browser and legacy browser compatibility and performance issues for this simple demo.  I ended up using what seemed to be a reasonable mix, based on the scope of the project and a desire to demo awareness of some potential performance concerns... hacking a 'template' equivalent, updating the DOM as a single operation in a loop using 'fragment', using 'dataset' even though it technically requires IE 11, not worrying about CSS vendor prefixes etc.
- I tested in current versions of Chrome and Safari and ran into the usual 'gotchas', such as failing to align-top inline block elements as required by Safari. I completely ignored IE for the purposes of this demo.
- I used img elements for thumbnails but explicitly set the lightbox background image, to demo two different approaches that retain image quality.
- I used a purely functional approach to the JS implementation, rather than trying to define an object taxonomy on such a small project.
- I decided to pass image url & caption data to the lightbox via client JS rather than have the client set data on each individual thumbnail image that they add to their view. This means that this version of lightbox won't support hard-coded sets of images embedded in markup -- something I'd definitely add to a production version.
- I notice a defninite lag when it comes to displaying the next/previous image in the lightbox, so pre-rendering of those images seems like a necessary feature
- the current version contains no error-handling, which would obviously be a priority on a production project from the start. Even issues like inability to contact the server, receiving zero results for a search, or reaching the 100 query/day quota limit... will fail silently in this simple demo.
- finally, I was surprised and disappointed, to notice that the CSE search results do not match those of an actual Google online search, an issue Google addresses online [https://support.google.com/customsearch/answer/70392]()

 
