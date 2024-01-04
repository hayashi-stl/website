---
layout: hunt-puzzle
page-type: hunt-puzzle
hunt: Puzzle Tour in the Volcano
metapuzzle: true
title: "Meta: 4 Red Coins on a 15-Piece Puzzle"
answer: TERMINAL LAVA SOUP
---
<p class="puzzle-flavor">
Lava first obstructs, then illuminates (but it fails to illuminate coins since they're already red). Where did you find the volcano?
</p>

<div class="lava-grid">
{% grid page.dir | append: "../lava-grid.rb" | relative_url %}
{% prop cell asc %}
     <. 
.... <. 
vvvv <. 
     <. 
 .>     
 .> ^^^^
 .> ....
 .>     
{% endprop %}
{% endgrid %}
</div>
<br>

<img class="center-img" src="../4-red-coins.svg"/>
<br>

<div class="_15-puzzle">
     {% gen_15_puzzle %}
     id:_15-puzzle
     assets:{{ page.dir | append: "../15-puzzle" | relative_url }}
     tile_size:100
     lava:1 2 6 15
     bg:14
     {% endgen_15_puzzle %}
     <!--svg id="_15-puzzle" viewBox="0 0 400 400">
          <image x="0" y="0" width="100" height="100" href="../15-puzzle/tile-00.png"/>
          <image x="100" y="0" width="100" height="100" href="../15-puzzle/tile-01.png"/>
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" stroke-width="1"/>
          <rect x="100" y="0" width="100" height="100" fill="none" stroke="black" stroke-width="1"/>
     </svg-->
</div>
<div class="center-text"><i>This is interactive. Click on a tile to shift it. The gray "tile" is the empty spot.</i></div>
<script type="module" src="{{ '/assets/15-puzzle.js' | relative_url }}"></script>