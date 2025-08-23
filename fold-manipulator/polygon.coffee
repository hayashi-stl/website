FOLD = require "fold"
{Vec, Mtx, Segment} = require "./vector"
prop = require "./properties"
Vec2 = Vec(2)
Mtx2 = Mtx(2, 2)

polygon = exports

# Returns a list of polygons (without computing intersections), which are lists of segments
polygon.polygons = (fold) ->
    coords = prop.vertices_exact_coords fold
    faces = fold.faces_vertices
    [coords, faces]

# Returns a list of polygons, where every point on intersection has a vertex
polygon.with_intersections = (coords, faces) ->
    for fi in [0...faces.length]
        for fj in [0...i]
            fs = [faces[i], faces[j]]