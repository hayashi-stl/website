---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
metapuzzle: true
title: "Meta: Time to Fractallize"
answer: THINK HARD BEYOND THE MANDELBOX
---
We notice that we have a Sierpiński Triangle, a Start Digit, and some Rules. We place the Start Digit in the center
of the Sierpiński Triangle and recursively follow the Rules to get numbers in each of the yellow triangles:

<img class="center-img" src="../sierpinski-triangle-filled.svg"/>
<br>

We can also fill the Scramble sheet with the answer from Loop of the Word Search:

<div class="scramble-grid">
{% grid page.dir | append: "../scramble-grid.rb" | relative_url %}
{% prop number csv %}
23,21, , ,2, ,5,3,17,6,18, ,15,7, ,24,20, ,19,9,1,12,13,14, ,22,25,16,8, ,10,28, ,26, ,4, ,27,11, ,
{% endprop %}
{% prop text asc %}
LETTHEMANNEDROOKBEBYTHENEXTDREADEDBISHOP
{% endprop %}
{% endgrid %}
</div>
<br>

We can overlay the Space-Filling Curve on the filled-in Sierpiński Triangle to get an ordering on the numbers:

<img class="center-img" src="../sierpinski-triangle-space-filling-curve.svg"/>
<br>

Finally, we read out the letters in the Scramble sheet in the number order specified by the Space-Filling Curve to get
`THINK HARD BEYOND THE MANDELBOX`.

### Notes

The fractal scenery was generated with [Mandelbulb 3D](https://www.mandelbulb.com/). I hope you liked it! The
names given to the regions were also fun to think of.

This hunt involved physical pieces when it was run. Of course, they're uploaded online and you can see them after solving a puzzle
or looking at a solution.
