---
layout: post
page-type: post
title:  "Cone You Assign Normals to a Cone?"
date:   2024-01-26 13:50:00 -0800
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
    <figure>
        <img src="{{ '/assets/posts/assign-normals-cone/cone-normal-map.png' | relative_url }}"
            alt="Cone normal map" style="width:256px;"/>
        <figcaption>The normal map used. The UV map of the cone is taken by projecting the cone onto its base and
        scaling the result so it is inscribed in a unit square. The colors are in linear space, so 
        #8080ff corresponds to the normal $$\langle 0, 0, 1\rangle$$</figcaption>
    </figure>
</div>

Unfortunately, it seems like graphics engines can't agree on exactly how normal maps work, as this looked fine in Blender, but has slight seams here. But maybe that's a topic for another post.

But what if for some reason you don't have access to cool shader techniques like custom shaders and normal maps? What if you just had to work with the geometry? It turns out that, no matter how you triangulate the cone, and no matter which edges you choose to split afterwards, you cannot make the apex perfectly spiky while making every other point on the cone's side perfectly smooth.

To see this, let's look at how the apex and its neighborhood is handled. If there is no split edge adjacent to the apex, then because of interpolation, the apex is smooth. So there has to be a split edge touching the apex. Every point on that split edge (except the apex) has to be smooth. But if that's the case, then because interpolation is a continuous function, the apex is also smooth (with respect to that split edge). So we have a problem indeed.

Instead, we have to compromise. For instance, we can subdivide the edges on the side of the cone. If we just do one subdivision near the apex, this is the result (only vertices are marked now):

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-subdivide-apex.glb' | relative_url }}"
            alt="Cone subdivided near apex"></fakecanvas>
        <figcaption>A cone where the lateral edges are subdivided 1/4 of the way from the apex to the base. Note the weird-looking shading.</figcaption>
    </figure>
</div>

Unfortunately, the shading looks weird. This is because the mesh is triangulated before it's interpolated, and the side of the cone consists mostly of trapezoids with a certain pattern of normals on the vertices. To illustrate the problem, let's look at some trapezoids:

<div class="figrow">
    <figure>
        <img src="{{ '/assets/posts/assign-normals-cone/trapezoid.svg' | relative_url }}"
            alt="A trapezoid with a value at each vertex"/>
        <figcaption>A trapezoid with a value (represented by a color) at each vertex. Note that the values on the left are the same, and the values on the right are the same.</figcaption>
    </figure>
    <figure>
        <object data="{{ '/assets/posts/assign-normals-cone/trapezoid-interpolation.svg' | relative_url }}"
            alt="Bilinear interpolation"></object>
        <figcaption>The values interpolated bilinearly. This is the wanted result.</figcaption>
    </figure>
    <figure>
        <img src="{{ '/assets/posts/assign-normals-cone/trapezoid-triangulated.svg' | relative_url }}"
            alt="Bilinear interpolation"/>
        <figcaption>The values interpolated after triangulating the trapezoid. The result looks distorted.
        Note that triangulating it the other way won't help.</figcaption>
    </figure>
</div>

The trapezoids that makes up the cone side have the same property: pairs of normals on the non-parallel opposite edges are the same. The trapezoids are triangulated, hence the weird-looking shading on the cone. To mitigate this, we can do *more* subdivisions:

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-multi-subdivide.glb' | relative_url }}"
            alt="Cone with multiple subdivisions"></fakecanvas>
        <figcaption>A cone where the lateral edges are subdivided into eighths.</figcaption>
    </figure>
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-multi-subdivide-clean.glb' | relative_url }}"
            alt="Cone with multiple subdivisions and less clutter"></fakecanvas>
        <figcaption>Same thing, but with less clutter.</figcaption>
    </figure>
</div>

The cone now looks very cony up until that last eighth at the top, at which point we go back to square one with the round-looking cone.
We can split all the edges adjacent to the apex to mitigate this.

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/assign-normals-cone/cone-multi-subdivide-split.glb' | relative_url }}"
            alt="Cone with multiple subdivisions and split edges adjacent to the apex"></fakecanvas>
        <figcaption>A cone where the lateral edges are subdivided into eighths, and the edges adjacent to the apex are split.</figcaption>
    </figure>
</div>

Wow! A beautiful looking cone![^zoom] And it only has 254 triangles!

So, in the end, you can assign normals to a can. But cone you assign normals to a cone? No you cone-not, at least without clever tricks or a compromise.

And that's the end![^sphericon]

[^zoom]: Do NOT zoom in on the cone.
[^sphericon]: Let's not talk about sphericons. Be honest. When was the last time you needed a sphericon?

<script type="module" src="{{ '/assets/posts/assign-normals-cone/render.js' | relative_url }}"></script>