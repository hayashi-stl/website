---
layout: page
title: Games
---

Games that are in progress or have been completed.

<div class="game-display">
{% assign games = site.pages | where_exp: "item", "item.page-type == 'game'" %}
{% for game in games %}
    <div>
        <div class="game-title"><a href="{{ game.url | relative_url }}">{{ game.title }}</a></div>
        <a href="{{ game.url | relative_url }}"><img class="center-img" src="{{ game.dir | append: game.thumbnail | relative_url }}"/></a>
        <div class="center-text">{{ game.description }}</div>
    </div>
{% endfor %}
</div>