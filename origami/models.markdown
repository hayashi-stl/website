---
layout: page
title: Origami
permalink: /origami/models/
---
  
Models!

<div class="ori-model-display">
{% assign models = site.pages | where_exp: "item", "item.page-type == 'ori-model'" %}
{% for model in models %}
    <div>
        <div class="ori-model-title"><a href="{{ model.url | relative_url }}">{{ model.title }}</a></div>
        <a href="{{ model.url | relative_url }}"><img class="center-img" src="{{ model.dir | append: model.thumbnail | relative_url }}"/></a>
        <div class="center-text">{{ model.description }}</div>
    </div>
{% endfor %}
</div>