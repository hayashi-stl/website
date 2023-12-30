---
layout: hunt-puzzle
page-type: hunt-puzzle
hunt: Fractallia
place: Sand Jewel Wonderland
title: Turntle Glyphs
answer: SIERPINSKI TRIANGLE
---
<p class="puzzle-flavor">
In the Sand Jewel Wonderland, you find a lot of disorder. Scrambled writing, letters all over without a care for rotation,
and a lot of indirection. Okay, that was an exaggeration, as the letters are just quarter-turns off.
</p>

<div class="turtle-code-array">
<div markdown = "1">

```py
def draw_d():
    turn(180)
    move(3)
    for i in range(3):
        turn(270)
        move(2)
```
</div>

<div markdown = "1">

```py
def draw_e():
    turn(90)
    for i in range(3):
        move(2)
        turn(270)
    move(1)
    turn(270)
    move(2)
```
</div>

<div markdown = "1">

```py
def draw_F():
    move(3)
    turn(270)
    move(2)
    turn(270)
    up()
    move(2)
    down()
    turn(270)
    move(2)
```
</div>

<div markdown = "1">

```py
def draw_H():
    move(4)
    turn(180)
    move(2)
    turn(90)
    move(2)
    turn(90)
    move(2)
    turn(180)
    move(4)
```
</div>

<div markdown = "1">

```py
def draw_K():
    move(4)
    turn(270)
    up()
    move(2)
    down()
    turn(225)
    move(2 * sqrt(2))
    turn(90)
    move(2 * sqrt(2))
```
</div>

<div markdown = "1">

```py
def draw_L():
    turn(180)
    move(2)
    turn(90)
    move(2)
```
</div>

<div markdown = "1">

```py
def draw_m():
    for i in range(3):
        move(2)
        turn(270)
    for i in range(3):
        turn(270)
        move(2)
```
</div>

<div markdown = "1">

```py
def draw_n():
    for i in range(3):
        move(2)
        turn(270)
```
</div>

<div markdown = "1">

```py
def draw_O():
    for i in range(4):
        move(2)
        turn(90)
```
</div>

<div markdown = "1">

```py
def draw_T():
    move(3)
    turn(90)
    move(1)
    turn(180)
    move(2)
```
</div>

<div markdown = "1">

```py
def draw_X():
    turn(45)
    for i in range(4):
        move(1)
        turn(180)
        move(1)
        turn(90)
```
</div>

</div>
<br>

<table class="turtle-unknowns">
    <tr>
        <td>unk1</td>
<td markdown="1" class="emph">

```py
turn(???)
draw_F()
```
</td>
<td markdown="1">

```py
turn(???)
turn(90)
draw_n()
```
</td>
<td markdown="1">

```py
turn(???)
turn(90)
draw_n()
```
</td>
<td></td>
<td></td>
    </tr>
    <tr>
        <td>unk2</td>
<td markdown="1">

```py
turn(???)
draw_O()
```
</td>
<td markdown="1">

```py
turn(???)
draw_L()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
draw_n()
```
</td>
<td markdown="1">

```py
turn(???)
draw_K()
```
</td>
<td></td>
    </tr>
    <tr>
        <td>unk3</td>
<td markdown="1">

```py
turn(???)
draw_T()
```
</td>
<td markdown="1">

```py
turn(???)
draw_X()
```
</td>
<td markdown="1">

```py
turn(???)
turn(90)
draw_n()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
draw_m()
```
</td>
<td></td>
    </tr>
    <tr>
        <td>unk4</td>
<td markdown="1">

```py
turn(???)
draw_d()
```
</td>
<td markdown="1">

```py
turn(???)
draw_m()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
draw_L()
```
</td>
<td markdown="1">

```py
turn(???)
draw_O()
```
</td>
<td markdown="1">

```py
turn(???)
draw_H()
```
</td>
    </tr>
    <tr>
        <td>unk5</td>
<td markdown="1">

```py
turn(???)
turn(180)
draw_n()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
turn(180)
draw_d()
```
</td>
<td markdown="1">

```py
turn(???)
draw_e()
```
</td>
<td></td>
<td></td>
    </tr>
    <tr>
        <td>unk6</td>
<td markdown="1" class="emph">

```py
turn(???)
turn(90)
draw_n()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
turn(180)
draw_m()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
turn(180)
draw_e()
```
</td>
<td markdown="1" class="emph">

```py
turn(???)
turn(270)
draw_L()
```
</td>
<td>(Interpret this<br>one in<br>base 4.)</td>
    </tr>
</table>
<br>

<div class="turtle-grid">
<div markdown="1">

### Clues

* Ladies \_\_\_\_ gentlemen
* The \_\_\_\_ big thing
* It’s-a-me, \_\_\_\_!
* Is it \_\_\_\_ or far?
* It’s all \_\_\_\_ and games until…
* Between a \_\_\_\_ and a hard place
</div>

<div markdown="1">

### Rotation Cipher

<img class="center-img" src="../rotation-cipher.svg"/>
</div>

<div markdown="1">

### Rules of the Inky Turtle

* The turtle starts facing upward with its ink lowered.
* `move(x)` moves the turtle x units in the direction it’s facing.
* `turn(x)` turns the turtle x degrees counterclockwise.
* `up()` makes the turtle lift its ink so that it doesn’t leave a mark when it moves.
* `down()` makes the turtle lower its ink so that it leaves a mark when it moves.
</div>

<div markdown="1">

### What is This?

```py
i = unk1
while True:
    i = i + unk2
    num = i
    distance = unk3
    while num == floor(num):
        turn(unk6)
        move(distance)
        num = num / unk4
        distance = distance * unk5
```
</div>
</div>