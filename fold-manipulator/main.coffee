fs = require "node:fs"
FOLD = require "fold"
minimist = require "minimist"
prop = require "./properties"
convert = require "./convert"
polygon = require "./polygon"

argv = minimist process.argv.slice 2

if argv._[0] == "import"
    argv = minimist(process.argv.slice(3),
        default:
            factor: "1/1"
            grid: "box 2"
        alias:
            factor: "f"
            grid: "g"
    )
    factor = argv.factor.split "/"
    factor = factor.map (c) -> parseInt c
    file = fs.readFileSync argv._[0]
    fold = JSON.parse file
    prop.mark fold
    prop.add_vertices_exact_coords fold, factor, argv.grid
    FOLD.file.toFile fold, argv._[1]

else if argv._[0] == "cp"
    argv = minimist process.argv.slice 3
    file = fs.readFileSync argv._[0]
    fold = JSON.parse file
    cp = convert.to_cp fold
    fs.writeFileSync argv._[1], cp

else if argv._[0] == "svg"
    argv = minimist process.argv.slice 3
    file = fs.readFileSync argv._[0]
    fold = JSON.parse file
    svg = await convert.to_svg fold, true
    fs.writeFileSync argv._[1], svg

else if argv._[0] == "all"
    argv = minimist process.argv.slice 3
    file = fs.readFileSync argv._[0]
    fold = JSON.parse file
    if prop.convert fold
        if prop.type(fold) == "crease-pattern"
            fs.writeFileSync argv._[1] + ".cp", convert.to_cp fold
            fs.writeFileSync argv._[1] + ".svg", await convert.to_svg fold, false
            fs.writeFileSync argv._[1] + ".d.svg", await convert.to_svg fold, true

else if argv._[0] = "test"
    {Fraction} = require "fraction.js"
    {RatSqrt} = require "./grid/rational-sqrt"
    {Vec, Mtx} = require "./vector"
    RS2 = RatSqrt(2)
    Vec2 = Vec(2)
    Mtx2 = Mtx(2, 2)
    vec_a = new Vec2 [new Fraction(1, 2), new Fraction(3, 4)]
    vec_b = new Vec2 [new Fraction(5, 6), new Fraction(7, 8)]
    vec_c = new Vec2 [new Fraction(-3, 2), new Fraction(1, 1)]

    mtx_a = new Mtx2 [[new Fraction(5, 13), new Fraction(12, 13)], [new Fraction(-12, 13), new Fraction(5, 13)]]
    mtx_b = new Mtx2 [[new Fraction(2, 1), new Fraction(0, 1)], [new Fraction(0, 1), new Fraction(7, 1)]]

    argv = minimist process.argv.slice 3
    file = fs.readFileSync argv._[0]
    fold = JSON.parse file
    polygons = polygon.polygons fold