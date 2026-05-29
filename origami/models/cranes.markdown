---
layout: page
title: Origami Crane Variants
japanese-title: 千羽鶴千種類
permalink: /origami/models/cranes/
---
  
Cranes! The original goal of this was to have 1000 variants, but that's pretty lofty and the project is on hiatus. Currently at 25 documented and 144 made.

※ Please excuse the ateji on some of the Japanese names. I was just having fun.

<div class="ori-model-display">
{% assign models = site.pages | where_exp: "item", "item.page-type == 'ori-tsuru-model'" | sort: "index" %}
{% for model in models %}
    <div>
        <div class="ori-model-title"><a href="{{ model.url | relative_url }}">{{ model.title }}</a></div>
        <a href="{{ model.url | relative_url }}"><img class="center-img" src="{{ model.dir | append: model.thumbnail | relative_url }}"/></a>
        <div class="center-text">{{ model.description }}</div>
    </div>
{% endfor %}
</div>