---
layout: hunt
page-type: hunt
title: Stuck on Extraction
---
<p class="puzzle-flavor">
If you're stuck on a puzzle, try solving a different one.
</p>

<div>
{% assign puzzles = site.pages | where_exp: "item", "item.hunt == page.title" %}
{% for puzzle in puzzles %}
    <p class="hunt-puzzle">
        <a href="{{ puzzle.url | relative_url }}">{{ puzzle.title }}</a>
    </p>
{% endfor %}
</div>