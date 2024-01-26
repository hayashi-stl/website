---
layout: post
page-type: post
title:  "Cone You Assign Normals to a Cone?"
date:   2024-01-18 15:33:00 -0800
tags: math graphics
---
When making a simple 3D model, normals get assigned to each vertex so that lighting can be properly calculated. The normal of a vertex is just the (normalized) average of the normals (perpendicular outward-pointing vectors) of the faces that it's a part of. To get the lighting for each pixel, the graphics engine interpolates the vertex normals of each vertex in the triangle that it's part of.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/average-normal.glb' | relative_url }}"
            alt="Face normals forming vertex normals"></fakecanvas>
        <figcaption>The normal of a vertex is the average of its faces' normals. Face normals are blue; the vertex normal is red.</figcaption>
    </figure>
</div>

For spheres, toruses, and other blob-like objects, this works just fine.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/sphere.glb' | relative_url }}"
            alt="Sphere normals"></fakecanvas>
        <figcaption>A sphere and its face and vertex normals.</figcaption>
    </figure>
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/torus.glb' | relative_url }}"
            alt="Torus normals"></fakecanvas>
        <figcaption>A torus and its face and vertex normals.</figcaption>
    </figure>
</div>

For un-tessellated polyhedra, though, it leads to an unwanted blob-like appearance despite the low number of polygons. This can be fixed by using *face* normals instead of *vertex* normals, resulting in the intended flat-looking faces. This is typically accomplished by splitting the edges so that each vertex is part of only one face.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cube.glb' | relative_url }}"
            alt="Cube normals"></fakecanvas>
        <figcaption>A cube and its normals. The edges have been split, so each vertex belongs to only one face and uses its normal.</figcaption>
    </figure>
</div>

For cylinders, a mix of both vertex normals and face normals is needed (due to flat caps but a round side), and splitting just the cap edges works.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cylinder.glb' | relative_url }}"
            alt="Cylinder normals"></fakecanvas>
        <figcaption>A cylinder and its normals. The rim edges have been split to create flat caps, but the side edges have not been split.</figcaption>
    </figure>
</div>

But then we have cones. The base is easy enough. Just split all the edges around it. But the side (the actual cone-shaped part) is an anomaly. In all the shapes we talked about so far, the only areas with split normals are entire edges, which can be split. However, the cone has a *vertex* with split normals (the apex), and we can't split vertices without splitting the neighboring edges. We also can't just leave the apex unsplit.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-unsplit.glb' | relative_url }}"
            alt="Cone normals, apex unsplit"></fakecanvas>
        <figcaption>A cone and its normals if nothing is done about that apex. It looks less cony and more round. (Note that the shown face normals do <i>not</i> match the interpolated normals at their position. The interpolated normals point more upward, causing the round look.)</figcaption>
    </figure>
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-split.glb' | relative_url }}"
            alt="Cone normals, apex split"></fakecanvas>
        <figcaption>A cone and its normals if the apex is naïvely split (by splitting all its neighboring edges). The result looks more like a cone, but even more like a sexadecagonal pyramid.</figcaption>
    </figure>
</div>

If we have access to custom shaders, like any normal 3D graphics engine would have in 2024, we can fix this problem easily by customizing the normals in the shader program. Specifically, we add special code to set a vertex's normal to $$\langle 0, 0, 0\rangle$$ if it's the apex. The fragment shader then, as usual, normalizes the normals after interpolation. (At this point, I will stop showing the face normals. I will also stop showing the apex normal because it's weird, and you should *experience* the *full glory* of the *spike* that is the apex.)

We can also just use a normal map to transform the interpolated normals to the correct ones. Any normal 3D graphics engine in 2024 would at least let you set a normal map.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-shader-normals.glb' | relative_url }}"
            alt="Cone with custom shader" shaderTrick></fakecanvas>
        <figcaption>A cone, customized in the shader program to have accurate cone normals.</figcaption>
    </figure>
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-mapped-normals.glb' | relative_url }}"
            alt="Cone with normal-mapped normals"></fakecanvas>
        <figcaption>A cone, shaded with a normal map to correct the normals.</figcaption>
    </figure>
</div>

Unfortunately, it seems like graphics engines can't agree on exactly how normal maps work, as this looked fine in Blender, but has slight seams here. But maybe that's a topic for another post.

But what if for some reason you don't have access to cool shader techniques like custom shaders and normal maps? What if you just had to work with the geometry? It turns out that, no matter how you triangulate the cone, and no matter which edges you choose to split afterwards, you cannot make the apex perfectly spiky while making every other point on the cone's side perfectly smooth.

And that's the end![^sphericon]

[^sphericon]: Let's not talk about sphericons. Be honest. When was the last time you needed a sphericon?

<script type="module" src="{{ '/assets/posts/assign-normals-cone/render.js' | relative_url }}"></script>