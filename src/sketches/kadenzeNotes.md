if I change a val like strokeweight, it only affects the following things, not the stuff above it
coordinate system
colors = range from 0 to 255. 1 val=  in grayscale. 3 vals = rgb style
CANVAS:
    background(num)
    comes after createCanvas
item (rect, ellipse, ~)
    fill(num)
    comes BEFORE rect() or ellipse() or ~()
    stroke (before declaration of shape) gets rgb
    transparency is set as a 4th val of the fill. 0-255. 2 vals in fill = grayscale color and transparency. also works on stroke
    noStroke() = no stroke at all. this also effects lines
functions & conditionals:
    map = function DIFF from js
    5 args: (input val, min val it cd take on/starting val, max val, start, end)
    for ex: let grey = map(mouseX, 0, width, 0, 255)
            fill(grey);
            and trhe color of the shape where the mouse is changes depending on where it is on the canvas
    dist = 4args, tells distance betw (x1,y1, x2,y2)
!!!!!"advanced keyboard interaction???"!!!!
!!!!!!"drawing cutom shapes??~~~~~~~~~~~~~
----skipped the animations one
    random - no args (val betw 0&1), or (min,max)
    NOTE: draw() gets called like 60x/sec?? so if you don't want it to keep going, call "noLoop()"
!!!!!!!"art using systems?? what is this?
!!!!!!!!drawing using recursion (but recirsion is sloooooooowwwww)
?????????????? do I need to use this.x or classes or anything? to initialize objects
classes
    can call this.draw=function() {} inside classes
    this.x or this.~ are properties
~~to seehow he made the elippses move a little continuously: https://www.kadenze.com/courses/introduction-to-programming-for-the-visual-arts-with-p5-js-vi/sessions/objects-create-code-modules-that-combine-variables-and-functions
~interesting interaction of mouse: https://www.kadenze.com/courses/introduction-to-programming-for-the-visual-arts-with-p5-js-vi/sessions/objects-create-code-modules-that-combine-variables-and-functions