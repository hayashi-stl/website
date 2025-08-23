FOLD = require "fold"
_2_2_aya_ori = require "./grid/2-2-aya-ori"
{Fraction} = require "fraction.js"
RatSqrt = require "./grid/rational-sqrt"

prop = exports

prop.mark = (fold) ->
    fold["file_stl:convert"] = true
    fold["file_stl:version"] = "1.0"

prop.type = (fold) ->
    fold["file_stl:type"] ? "crease-pattern"

prop.convert = (fold) ->
    fold["file_stl:convert"] ? false

grid_regex = /^(?<type>(\w|-)+)( (?<params>.*))?$/
box_params_regex = /^(?<partials>\d+)$/

prop.add_vertices_exact_coords = (fold, factor, grid) ->
    match = grid.match(grid_regex).groups
    grid = undefined
    exact = undefined
    switch match.type
        when "box"
            grid = match.params.match(box_params_regex).groups
            grid.partials = parseInt grid.partials
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
                if Math.abs(result - Math.round(result)) > 1e-10 then throw new Error "Off-grid coordinate: #{result} (from #{c})"
                Math.round result
                ))
    fold["vertices_stl:exact_coords"] = exact
    fold["file_stl:coord_factor"] = factor
    fold["file_stl:grid"] = grid

prop.vertices_exact_coords = (fold) ->
    coords = fold["vertices_stl:exact_coords"]
    grid = fold["file_stl:grid"]
    switch grid.type
        when "box"
            coords.map (v) -> v.map (c) -> new Fraction(c, grid.partials)
        when "sqrt"
            coords.map (v) -> v.map (c) -> new (RatSqrt(grid.sqrt))(new Fraction(c[0][0], c[0][1]), new Fraction(c[1][0], c[1][1]))

prop.vertices_evaluated_coords = (fold, include_factor) ->
    coords = fold["vertices_stl:exact_coords"]
    factor = fold["file_stl:coord_factor"]
    grid = fold["file_stl:grid"]
    evaluated = coords.map((v) ->
        v.map((c) ->
            result = c
            if include_factor then result = result * factor[1] / factor[0]
            switch grid.type
                when "box"
                    result /= grid.partials

                when "sqrt"
                    result = c[0][0] / c[0][1] + c[1][0] / c[1][1] * Math.sqrt grid.sqrt
            result
            ))
    evaluated