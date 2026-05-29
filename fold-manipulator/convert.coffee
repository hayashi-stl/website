FOLD = require "fold"
prop = require "./properties"
SVG = require "@svgdotjs/svg.js"

convert = exports

convert.to_cp = (fold) ->
    assignment_map =
        B: 1,
        M: 2,
        V: 3
    coords = prop.vertices_evaluated_coords fold, true
    ev = fold.edges_vertices
    ea = fold.edges_assignment
    lines = ([assignment_map[ea[i]], ...coords[ev[i][0]], ...coords[ev[i][1]]].join(" ") for i in [0...ea.length])
    lines.join "\n"

convert.to_svg = (fold, display) ->
    assignment_map =
        B: "boundary",
        M: "mountain",
        V: "valley",
        F: "flat",
        C: "cut",
    coords = prop.vertices_evaluated_coords fold, false
    ev = fold.edges_vertices
    ea = fold.edges_assignment
    efa = fold.edges_foldAngle
    min = coords.reduce (acc, curr) -> [Math.min(acc[0], curr[0]), Math.min(acc[1], curr[1])]
    max = coords.reduce (acc, curr) -> [Math.max(acc[0], curr[0]), Math.max(acc[1], curr[1])]
    view_width = max[0] - min[0]
    view_height = max[1] - min[1]

    svgdom = await import("svgdom")
    window = svgdom.createSVGWindow()
    document = window.document
    SVG.registerWindow window, document
    
    thickness = 0.05
    svg = SVG.SVG document.documentElement
        .viewbox min[0] - thickness / 2, min[1] - thickness / 2, view_width + thickness, view_height + thickness
        .width "#{view_width + thickness}cm"
        .height "#{view_height + thickness}cm"

    switch prop.type(fold)
        when "crease-pattern"
            svg.style()
                .rule "line", {strokeWidth: thickness}
                .rule ".mountain", {stroke: "#f00"}
                .rule ".valley", {stroke: "#00f"}
                .rule ".flat", {stroke: if display then "#066" else "#0aa"}
                .rule ".boundary", {stroke: if display then "#fff" else "#000"}
                .rule ".cut", {stroke: "#0f0"}
            for i in [0...ea.length]
                line = svg.line coords[ev[i][0]][0], coords[ev[i][0]][1], coords[ev[i][1]][0], coords[ev[i][1]][1]
                    .addClass(assignment_map[ea[i]])
                angle = Math.abs(efa[i]) / 180.0
                if angle != 0
                    line.css("opacity", angle)

        when "flat-folded-state"
            svg.style()
                .rule "line", {strokeWidth: thickness}
                .rule "polyline", {fill: "#0aa"}
    svg.svg()