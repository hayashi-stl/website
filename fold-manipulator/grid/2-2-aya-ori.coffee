FOLD = require "fold"
{RatSqrt} = require "./rational-sqrt"
{Fraction} = require "fraction.js"

RS5 = RatSqrt(5)
_2_2_aya_ori = exports

_2_2_aya_ori.vertices_exact_coords = (fold, factor) ->
    coords = fold.vertices_coords
    coords = ((c * factor[0] / factor[1] for c in v) for v in coords)

    # Move center to (0, 0)
    min = coords.reduce (acc, curr) -> [Math.min(acc[0], curr[0]), Math.min(acc[1], curr[1])]
    max = coords.reduce (acc, curr) -> [Math.max(acc[0], curr[0]), Math.max(acc[1], curr[1])]
    center = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2]
    coords = ([v[0] - center[0], v[1] - center[1]] for v in coords)

    # Grid based on the following vectors
    gx = [RS5.from_ints(3, 1, 1, 5), RS5.from_ints(-1, 1, -3, 5)]
    gy = [RS5.from_ints(-2, 3, -1, 3), RS5.from_ints(-4, 3, -1, 3)]
    gdet = gx[0].mul(gy[1]).sub(gy[0].mul(gx[1]))
    gx_inv = [gy[1].div(gdet), gx[1].neg().div(gdet)]
    gy_inv = [gy[0].neg().div(gdet), gx[0].div(gdet)]
    glide_normal = gx # line goes through the origin!
    glide_len2 = glide_normal[0].mul(glide_normal[0]).add(glide_normal[1].mul(glide_normal[1]))
    glide_trans = (gx[i].sub(gy[i]).mul(RS5.from_ints(1, 2, 0, 1)) for i in [0...2])

    snap_pts = [
        [RS5.from_ints(-3, 4, -1, 4), RS5.from_ints(-1, 2, 0, 1)],
        [RS5.from_ints(0, 1, 0, 1), RS5.from_ints(-1, 1, 0, 1)],
        [RS5.from_ints(1, 1, 0, 1), RS5.from_ints(-1, 4, -1, 4)],
        [RS5.from_ints(3, 2, 0, 1), RS5.from_ints(-1, 2, 0, 1)],
    ]

    is_on_segment = (v, seg) ->
        seg = ((seg[i][j].eval() for j in [0...2]) for i in [0...2])
        v_diff = (v[i] - seg[0][i] for i in [0...2])
        seg_diff = (seg[1][i] - seg[0][i] for i in [0...2])
        seg_len2 = seg_diff[0] * seg_diff[0] + seg_diff[1] * seg_diff[1]
        dot = v_diff[0] * seg_diff[0] + v_diff[1] * seg_diff[1]
        perp_proj = (v_diff[i] - dot * seg_diff[i] / seg_len2 for i in [0...2])

        if Math.abs(perp_proj[0]) > 1e-8 || Math.abs(perp_proj[1]) > 1e-8 
            return false # not on line extended from segment
        v_diff1 = (v[i] - seg[1][i] for i in [0...2])
        seg_diff1 = (seg[0][i] - seg[1][i] for i in [0...2])
        dot1 = v_diff1[0] * seg_diff1[0] + v_diff1[1] * seg_diff1[1]
        dot >= 0 && dot1 >= 0
        
    g_decompose = (v) ->
        gv = [gx_inv[0].eval() * v[0] + gy_inv[0].eval() * v[1], gx_inv[1].eval() * v[0] + gy_inv[1].eval() * v[1]]
        gv_int = gv.map Math.round
        gv_frac = [gv[0] - gv_int[0], gv[1] - gv_int[1]]

        # Fold grid
        v_frac = [gx[0].eval() * gv_frac[0] + gy[0].eval() * gv_frac[1], gx[1].eval() * gv_frac[0] + gy[1].eval() * gv_frac[1]]
        rotate = false
        if v_frac[1] > 0
            rotate = true
            v_frac = [-v_frac[0], -v_frac[1]]

        [gv_int, rotate, v_frac]

    transform_pt_inv = (pt, gv_int, rotate, glide) ->
        if glide
            glide_dot = pt[0].mul(glide_normal[0]).add(pt[1].mul(glide_normal[1]))
            pt = (pt[i].sub(glide_dot.mul_int(2).mul(glide_normal[i]).div(glide_len2)).add(glide_trans[i]) for i in [0...2])
        pt = (pt[i].sub(gx[i].mul_int(gv_int[0])).sub(gy[i].mul_int(gv_int[1])) for i in [0...2])
        if rotate
            pt = (pt[i].neg() for i in [0...2])
        pt

    transform_pt = (pt, gv_int, rotate, glide) ->
        if rotate
            pt = (pt[i].neg() for i in [0...2])
        pt = (pt[i].add(gx[i].mul_int(gv_int[0])).add(gy[i].mul_int(gv_int[1])) for i in [0...2])
        if glide
            pt = (pt[i].sub(glide_trans[i]) for i in [0...2])
            glide_dot = pt[0].mul(glide_normal[0]).add(pt[1].mul(glide_normal[1]))
            pt = (pt[i].sub(glide_dot.mul_int(2).mul(glide_normal[i]).div(glide_len2)) for i in [0...2])
        pt

    vertices_edges_defined = fold.vertices_edges?
    FOLD.convert.edges_vertices_to_vertices_edges_unsorted(fold)

    exact = coords.map((v, i) ->
        # Express point in that grid
        [gv_int, rotate, v_frac] = g_decompose v

        glide_reflect = false
        ex_frac = undefined
        ex = undefined
        edges = fold.vertices_edges[i]
        is_boundary = edges.some (e) -> fold.edges_assignment[e] == "B"
        if is_boundary
            # Boundaries are complicated (except when they're the rectangle corners)
            if edges.length == 2
                ex = [new Fraction(v[0]).simplify(1e-8), new Fraction(v[1]).simplify(1e-8)]
                ex = [new RS5(ex[0], new Fraction(0)), new RS5(ex[1], new Fraction(0))]

            else
                # Try snapping to a segment in the main quadrilateral
                segment = undefined
                while segment == undefined
                    for i in [0...snap_pts.length]
                        curr_segment = [snap_pts[i], snap_pts[(i + 1) % snap_pts.length]]
                        if is_on_segment v_frac, curr_segment
                            segment = curr_segment
                            break

                    if segment == undefined
                        if glide_reflect
                            throw new Error "Off-grid coordinate: #{v} (from #{fold.vertices_coords[i]}) (frac #{v_frac})"
                        glide_reflect = true # Do a glide reflection and try again
                        glide_dot = v[0] * glide_normal[0].eval() + v[1] * glide_normal[1].eval()
                        glide_v = (v[i] - 2 * glide_dot * glide_normal[i].eval() / glide_len2.eval() + glide_trans[i].eval() for i in [0...2])
                        [gv_int, rotate, v_frac] = g_decompose glide_v

                # Bring boundary over for intersection
                boundary = edges.find (e) -> fold.edges_assignment[e] == "B"
                boundary = fold.edges_vertices[boundary]
                boundary = boundary.map (bv) -> coords[bv]
                boundary = boundary.map (bv, pt_i) -> bv.map (c, i) ->
                    if Math.abs(boundary[1][i] - boundary[0][i]) < 1e-8 # Paper edge
                        new RS5(new Fraction(c).simplify(1e-8), new Fraction(0))
                    else # Direction of edge. One coordinate is 0 and the other one is 1 because it doesn't matter
                        RS5.from_int pt_i

                boundary = boundary.map (bv) -> transform_pt_inv bv, gv_int, rotate, glide_reflect
                # Line intersection between boundary and segment
                s_diff = (segment[1][i].sub(segment[0][i]) for i in [0...2])
                b_diff = (boundary[0][i].sub(boundary[1][i]) for i in [0...2])
                sb_diff = (boundary[0][i].sub(segment[0][i]) for i in [0...2])
                sb_det = s_diff[0].mul(b_diff[1]).sub(b_diff[0].mul(s_diff[1]))
                sb_inv_x = [b_diff[1].div(sb_det), s_diff[1].neg().div(sb_det)]
                sb_inv_y = [b_diff[0].neg().div(sb_det), s_diff[0].div(sb_det)]
                t = sb_inv_x[0].mul(sb_diff[0]).add(sb_inv_y[0].mul(sb_diff[1]))
                ex_frac = (segment[0][i].add(s_diff[i].mul(t)) for i in [0...2])
                #console.log (segment.map (v) -> v.map (c) -> c.eval()), (boundary.map (v) -> v.map (c) -> c.eval()), (ex_frac.map (v) -> v.eval())

        else
            # Snap fractional portion to one of 4 possible points
            for pt in snap_pts
                if Math.abs(v_frac[0] - pt[0].eval()) < 1e-8 && Math.abs(v_frac[1] - pt[1].eval()) < 1e-8
                    ex_frac = pt
                    break
            if ex_frac == undefined
                throw new Error "Off-grid coordinate: #{v} (from #{fold.vertices_coords[i]}) (frac #{v_frac})"
        
            #console.log v, v_frac, ex_frac.toString()

        if ex == undefined
            ex = transform_pt ex_frac, gv_int, rotate, glide_reflect
        ex
        )

    if !vertices_edges_defined
        delete fold.vertices_edges

    [{
        type: "sqrt"
        sqrt: 5
    }, exact.map((v) -> v.map (c) ->
        c = c.mul_int 2
        [[Number(c.a.n) * Number(c.a.s), Number(c.a.d)], [Number(c.b.n) * Number(c.b.s), Number(c.b.d)]])]