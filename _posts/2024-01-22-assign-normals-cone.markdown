---
layout: post
page-type: post
title:  "Cone You Assign Normals to a Cone?"
date:   2024-01-18 15:33:00 -0800
tags: math graphics
---
When making a simple 3D model, normals get assigned to each vertex so that lighting can be properly calculated. The normal of a vertex is just the (normalized) average of the normals of the faces that it's a part of.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/vertex-normals.glb' | relative_url }}"
            alt="Face normals forming vertex normals"></fakecanvas>
        <figcaption>The normal of a vertex is the average of its faces' normals.</figcaption>
    </figure>
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/vertex-normals.glb' | relative_url }}"></fakecanvas>
        <figcaption>The normal of a vertex is the average of its faces' normals.</figcaption>
    </figure>
</div>

For spheres, toruses, and other blob-like objects, this works just fine.

For un-tessellated polyhedra, though, it leads to an unwanted blob-like appearance despite the low number of polygons. This can be fixed by using *face* normals instead of *vertex* normals, resulting in the intended flat-looking faces. This is typically accomplished by splitting the edges so that each vertex is part of only one face.

For cylinders, a mix of both vertex normals and face normals is needed (due to flat caps but a round side), and splitting just the cap edges works.

But then we have cones. The base is easy enough. Just split all the edges around it. But the side (the actual cone-shaped part) is an anomaly.

<script type="module" src="{{ '/assets/posts/assign-normals-cone/render.js' | relative_url }}"></script>