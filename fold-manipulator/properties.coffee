FOLD = require "fold"
_2_2_aya_ori = require "./grid/2-2-aya-ori"
{Fraction} = require "fraction.js"
RatSqrt = require "./grid/rational-sqrt"
mathjs = require "mathjs"

prop = exports

prop.mark = (fold) ->
    fold["file_stl:convert"] = true
    fold["file_stl:version"] = "1.0"

prop.type = (fold) ->
    fold["file_stl:type"] ? "crease-pattern"

prop.convert = (fold) ->
    fold["file_stl:convert"] ? true

grid_regex = /^(?<type>(\w|-)+)( (?<params>.*))?$/
box_params_regex = /^(?<partials>\d+)$/
rational_params_regex = /^(?<max_denominator>\d+)$/
coeff_regex = /^(?<numerator>-?\d+)\/(?<denominator>\d+)$/

prop.add_vertices_exact_coords = (fold, factor, grid) ->
    match = grid.match(grid_regex).groups
    grid = undefined
    exact = undefined
    switch match.type
        when "box"
            grid = match.params.match(box_params_regex).groups
            grid.partials = parseInt grid.partials
        when "rational"
            grid = match.params.match(rational_params_regex).groups
            grid.max_denominator = parseInt grid.max_denominator
        when "2-2-aya-ori"
            [grid, exact] = _2_2_aya_ori.vertices_exact_coords(fold, factor)
        when "manual"
            exact = fold.vertices_coords.map (c) -> []

    if exact == undefined
        grid.type = match.type

        coords = fold.vertices_coords
        exact = coords.map((v) ->
            v.map((c) -> 
                result = c * factor[0] / factor[1]
                switch grid.type
                    when "box"
                        result *= grid.partials
                        if Math.abs(result - Math.round(result)) > 1e-8 then throw new Error "Off-grid coordinate: #{result} (from #{c})"
                        Math.round result

                    when "rational"
                        result = new Fraction(result).simplify(1e-8)
                        if result.d > grid.max_denominator then throw new Error "Probably off-grid coordinate: #{result} (#{result.toFraction()}) (from #{c})"
                        result = [Number(result.n * result.s), Number(result.d)]
                ))

    switch grid.type
        when "rational"
            delete grid.max_denominator

    fold["vertices_stl:exact_coords"] = exact
    fold["file_stl:coord_factor"] = factor
    fold["file_stl:grid"] = grid

prop.vertices_exact_coords = (fold) ->
    coords = fold["vertices_exact:coords"]
    basis = fold["frame_exact:basis"]
    if coords == undefined then return undefined

    exact = coords.map((v) ->
        v.map((c) ->
            coeffs = c.map((coeff) -> 
                match = coeff.match(coeff_regex).groups
                numer = BigInt(match.numerator)
                denom = BigInt(match.denominator)
                new Fraction(numer, denom))
            coeffs
            ))
    (
        coords: exact,
        basis: basis
    )

prop.vertices_evaluated_coords = (fold, include_factor) ->
    exact = prop.vertices_exact_coords fold
    factor = fold["file_stl:coord_factor"] ? [1.0, 50.0]
    evaluated = if exact == undefined
        fold["vertices_coords"].map((v) ->
            v.map((c) -> c * (if include_factor then 1 else factor[0] / factor[1])))
    else
        basis = exact.basis.map (b) -> mathjs.evaluate(b)
        exact.coords.map((v) ->
            v.map((c) ->
                result = 0.0
                for i in [0...c.length]
                    result += basis[i] * c[i].valueOf()
                if include_factor then result = result * factor[1] / factor[0]
                result
                ))
    evaluated