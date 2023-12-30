---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
place: Sand Jewel Wonderland
title: Turntle Glyphs
answer: SIERPINSKI TRIANGLE
---

We can answer the clues:

* Ladies `and` gentlemen
* The `next` big thing
* It’s-a-me, `mario`!
* Is it `near` or far?
* It’s all `fun` and games until…
* Between a `rock` and a hard place

We can also figure out what the functions draw using the rules listed.


<div class="turtle-code-array wider">
<div><code>draw_d</code>:<br><br><image src="../turtle-drawings/draw_d.svg"/></div>
<div><code>draw_e</code>:<br><br><image src="../turtle-drawings/draw_e.svg"/></div>
<div><code>draw_F</code>:<br><br><image src="../turtle-drawings/draw_F.svg"/></div>
<div><code>draw_H</code>:<br><br><image src="../turtle-drawings/draw_H.svg"/></div>
<div><code>draw_K</code>:<br><br><image src="../turtle-drawings/draw_K.svg"/></div>
<div><code>draw_L</code>:<br><br><image src="../turtle-drawings/draw_L.svg"/></div>
<div><code>draw_m</code>:<br><br><image src="../turtle-drawings/draw_m.svg"/></div>
<div><code>draw_n</code>:<br><br><image src="../turtle-drawings/draw_n.svg"/></div>
<div><code>draw_O</code>:<br><br><image src="../turtle-drawings/draw_O.svg"/></div>
<div><code>draw_T</code>:<br><br><image src="../turtle-drawings/draw_T.svg"/></div>
<div><code>draw_X</code>:<br><br><image src="../turtle-drawings/draw_X.svg"/></div>
</div>
<br>

Yep, the names of the functions are correct. Now we need to figure out the mystery rotations in the unknowns table.
We notice that there are 6 clues and 6 unknowns, and in addition, with some permutation, the number of letters in each clue
matches the number of programs in its corresponding unknown. So we must fit the clues to the unknowns.
As the flavor text indicates, the writing is scrambled, so we also have to permute the letters in each clue.
This can be done as shown below:

* `unk1`: `fun` (0°, 90°, 270°) or `fnu` (0°, 270°, 90°)
* `unk2`: `orck` (ambiguous, 270°, 90°, 0°)
* `unk3`: `txne` (0°, ambiguous, 270°, 90°)
* `unk4`: `amroi` (270°, 0°, 270°, ambiguous, 180°±90°)
* `unk5`: `nda` (180°, 180°, 180°)
* `unk6`: `near` (270°, 270°, 0°, 0°)

The last one is particularly tricky because there's a `draw_e`, but it doesn't correspond to the `e`.

Now we extract numbers using the highlighted programs and the rotation cipher. Though there are ambiguities, there are none
where it matters. This gives us the following values:
* `unk1 = 0`
* `unk2 = 1`
* `unk3 = 1`
* `unk4 = 3`
* `unk5 = 2`
* `unk6 = 240`. (This comes out as 3300 in base 4)

Now we plug these values into the final program and run it! The result (after a certain number of steps) looks like this:

<image class="center-img" src="../turtle-drawings/sierpinski.svg"/><br>

So the answer is `SIERPINSKI TRIANGLE`.

### Notes

It's fun to watch the animation using Python when you solve the puzzle. Here's the program:
```py
import turtle
from math import floor

turtle.speed("fast")
turtle.left(90)
i = 0
while True:
    i = i + 1
    num = i
    distance = 1
    while num == floor(num):
        turtle.left(240)
        turtle.forward(distance * 10)
        num = num / 3
        distance = distance * 2
```
