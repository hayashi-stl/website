---
layout: hunt
page-type: hunt
title: Stuck on Extraction
hunt-date: "April 2021"
---
<p class="puzzle-flavor">
If you're stuck on a puzzle, try solving a different one.
</p>

<div>
{% assign puzzles = site.pages | where_exp: "item", "item.hunt == page.title" %}
{% for puzzle in puzzles %}
    {% if puzzle.metapuzzle != true %}
        <p class="hunt-puzzle">
            <a href="{{ puzzle.url | relative_url }}">{{ puzzle.title }}</a>
        </p>
    {% endif %}
{% endfor %}
<br>
{% for puzzle in puzzles %}
    {% if puzzle.metapuzzle == true %}
        <p class="hunt-puzzle">
            <a href="{{ puzzle.url | relative_url }}">{{ puzzle.title }}</a>
        </p>
    {% endif %}
{% endfor %}
</div>