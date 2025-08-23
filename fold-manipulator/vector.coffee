{Fraction} = require "fraction.js"
vector = exports

# a + b√sqrt, where a and b are rational, and sqrt is a square-free positive integer
vec_map = {}
Vector = (size) ->
    vec_map[size] ? (vec_map[size] = class Vec
        size: () -> size

        constructor: (@elems) ->
            if @elems.length != size then throw new Error "Sizes must match. #{@elems.length} != #{size}"

        at: (i) ->
            @elems[i]

        x: () -> @elems[0]
        y: () -> @elems[1]

        add: (other) -> 
            new Vec((@at(i).add(other.at(i)) for i in [0...size]))

        sub: (other) -> 
            new Vec((@at(i).sub(other.at(i)) for i in [0...size]))

        mul: (scalar) ->
            new Vec((@at(i).mul(scalar)) for i in [0...size])

        div: (scalar) ->
            new Vec((@at(i).div(scalar)) for i in [0...size])

        dot: (other) ->
            (@at(i).mul(other.at(i)) for i in [0...size]).reduce (acc, curr) -> acc.add(curr)

        cross_2: (other) ->
            if size != 2 then throw new Error "Vector 2D cross product not implemented except for length-2 vectors"
            @at(0).mul(other.at(1)).sub(@at(1).mul(other.at(0)))

        perp_ccw: (other) ->
            if size != 2 then throw new Error "Vector perpendicular not implemented except for length-2 vectors"
            new Vec @at(1).neg(), @at(0)

        perp_cw: (other) ->
            if size != 2 then throw new Error "Vector perpendicular not implemented except for length-2 vectors"
            new Vec @at(1), @at(0).neg()

        len: () ->
            @dot(@)

        equals: (other) ->
            [0...size].every (i) -> @at(i).equals other.at(t)

        toString: () ->
            "[#{@at.map((e) -> e.toString()).join(', ')}]"
    )

mtx_map = {}
Matrix = (n_rows, n_cols) ->
    mtx_map[[n_rows, n_cols]] ? (mtx_map[[n_rows, n_cols]] = class Mtx
        n_rows: () -> n_rows
        n_cols: () -> n_cols

        # Row-major
        constructor: (@rows) ->
            if @rows.length != n_rows || @rows.some((r) -> (r.size?() ? r.length) != n_cols) then throw new Error "Matrix must be rectangular and sizes must match."
            @rows = @rows.map (r) -> if r instanceof Vector(n_cols) then r else new (Vector(n_cols))(r)

        at: (r, c) ->
            @rows[r].at(c)

        add: (other) -> 
            new Mtx((@rows[i].add(other.rows[i]) for i in [0...n_rows]))

        sub: (other) -> 
            new Mtx((@rows[i].sub(other.rows[i]) for i in [0...n_rows]))

        transpose: () ->
            new (Matrix(n_cols, n_rows))(((@at(r, c) for r in [0...n_rows]) for c in [0...n_cols]))

        mul: (other) ->
            tr = other.transpose()
            new (Matrix(n_rows, other.n_cols()))((@rows[r].dot(tr.rows[c]) for c in [0...other.n_cols()]) for r in [0...n_rows])

        inv: () ->
            if n_rows != 2 || n_cols != 2 then throw new Error "Matrix inverse not implemented except for 2×2 matrices"
            det = @at(0, 0).mul(@at(1, 1)).sub(@at(0, 1).mul(@at(1, 0)))
            if det.equals(@at(0, 0) - @at(0, 0)) then return undefined
            new Mtx([[@at(1, 1).div(det), @at(0, 1).neg().div(det)], [@at(1, 0).neg().div(det), @at(0, 0).div(det)]])

        toString: () ->
            "[#{@rows.map((e) -> e.toString()).join(', ')}]"
        )

class Segment
    construct: (@points) ->

    at: (i) -> @points[i]

    toString: () ->
        "Segment[#{@points.map((p) -> p.toString()).join(', ')}]"

vector.Vec = Vector
vector.Mtx = Matrix
vector.Segment = Segment