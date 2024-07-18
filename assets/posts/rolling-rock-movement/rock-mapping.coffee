wallTiles = null
floorTile = null
blankTile = null
rotationCenters = null
animationDirs = null
movingRock = null
bumpDistances = null

WIDTH = 32

export init = ->
    blankTile = <symbol viewBox="0 0 #{WIDTH} #{WIDTH}"></symbol>
    floorTile = <symbol viewBox="0 0 #{WIDTH} #{WIDTH}"><image width="#{WIDTH}" height="#{WIDTH}" href="floor.png"/></symbol>
    wallTiles =
        '#': <symbol viewBox="0 0 #{WIDTH} #{WIDTH}"><image width="#{WIDTH}" height="#{WIDTH}" href="wall.png"/></symbol>
        'p': <symbol viewBox="0 0 #{WIDTH} #{WIDTH}" z-index="1"><image width="#{WIDTH}" height="#{WIDTH}" href="player.png"/></symbol>
        'r': <symbol viewBox="0 0 #{WIDTH} #{WIDTH}" z-index="2"><image width="#{2 * WIDTH}" height="#{2 * WIDTH}" href="rock.png"/></symbol>
    movingRock = <image width="#{2 * WIDTH}" height="#{2 * WIDTH}" href="moving-rock.png"/>

    rotationCenters =
        'p': [WIDTH / 2, WIDTH / 2]
        'r': [WIDTH, WIDTH]

    animationDirs =
        '^': [0, -1]
        '>': [1, 0]
        'v': [0, 1]
        '<': [-1, 0]

    bumpDistances =
        '*': 0.15
        '+': 0.25
        '-': 0.65

animations = null

export preprocess = (render) ->
    # Find animation: after empty space
    animationY = 0
    while render.context(animationY, 0).key not in [undefined, ""]
        animationY += 1
    animationY += 1

    if render.context(animationY, 0).key?
        numAnimations = 0
        animations = {}
        keys = []
        while render.context(animationY, numAnimations).key not in [undefined, ""]
            keys.push render.context(animationY, numAnimations).key[0]
            animations[render.context(animationY, numAnimations).key[0]] = []
            numAnimations += 1

        y = animationY + 1
        while render.context(y, 0).key not in [undefined, ""]
            for x in [0...numAnimations]
                animations[keys[x]].push render.context(y, x).key
            y += 1

    render.drawing.keys.splice(animationY - 1)


dirQuarterTurns = (dir) ->
    if dir[0] > 0 then 3 else \
    if dir[0] < 0 then 1 else \
    if dir[1] > 0 then 0 else 2

class Animation
    constructor: (@type, @initValue) ->
        @keyframes = []
        @splines = []
        @values = []
        @currValue = @initValue

    add: (frame, spline, value) ->
        @keyframes.push frame
        @splines.push [...spline]
        @values.push [...value]
        @currValue = [...value]

    finalize: (length) ->
        # Scale keyframes
        @length = length
        @keyframes = (k / length for k in @keyframes)

        # 0 and 1 are mandatory
        if @keyframes[0] > 0
            @keyframes.unshift 0
            @values.unshift @initValue
        else
            @splines.shift() # get rid of hanging linear spline

        if @keyframes[@keyframes.length - 1] < 1
            @keyframes.push 1
            @splines.push [1/3, 1/3, 2/3, 2/3]
            @values.push @currValue

    toJsx: ->
        animKeyTimes = ("#{k}" for k in @keyframes).join "; "
        animKeySplines = ("#{s[0]} #{s[1]} #{s[2]} #{s[3]}" for s in @splines).join "; "
        animValues = (("#{c}" for c in v).join(" ") for v in @values).join "; "
        
        <animateTransform
            attributeName = "transform"
            type = "#{@type}"
            keyTimes = "#{animKeyTimes}"
            keySplines = "#{animKeySplines}"
            values = "#{animValues}"
            dur = "#{@length}s"
            repeatCount = "indefinite"
            calcMode = "spline"
            additive = "sum"
        />

STEP_TIME = 0.75
TWEEN_TIME = 0.1
ROCK_DELAY = 0.05

export map = (key) ->
    tileKey = key[0]
    id = key[1]
    startDir = animationDirs[key[2]] ? [0, 1]
    startMoving = key[3] == "m"
    rock = tileKey == "r"

    tile = wallTiles[tileKey]
    tiles = []
    if tileKey != '#'
        tiles.push floorTile
    if tile?
        anim = animations[id]
        animJsx = null
        movingRockAnimJsx = null
        if anim?
            center = rotationCenters[tileKey]
            pos = [0, 0]
            dir = [...startDir]
            moving = startMoving
            quarterTurns = dirQuarterTurns dir
            step = 0
            delay = if rock then ROCK_DELAY else 0

            posAnim = new Animation "translate", [0, 0]
            rotAnim = new Animation "rotate", [quarterTurns * 90, center[0], center[1]]
            scaleAnim = new Animation "scale", [1, 1]
            movingRockAnim = null
            if rock
                movingRockAnim = new Animation "scale", [moving + 0, moving + 0]

            for k in anim
                new_dir = animationDirs[k[0]]
                bumpDist = bumpDistances[k[1]]
                if new_dir?
                    posAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [pos[0] * WIDTH, pos[1] * WIDTH]
                    rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]

                    dir = [...new_dir]
                    newQuarterTurns = dirQuarterTurns dir
                    quarterTurns += (newQuarterTurns - quarterTurns + 2) %% 4 - 2

                    if !(bumpDist?)
                        pos = [pos[0] + dir[0], pos[1] + dir[1]]
                        posAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [pos[0] * WIDTH, pos[1] * WIDTH]
                        if rock
                            rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]
                            if !moving
                                moving = true
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [0, 0]
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [1, 1]
                        else
                            rotAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [quarterTurns * 90, center[0], center[1]]
                
                if bumpDist? # wall bump
                    posAnim.add step * STEP_TIME + TWEEN_TIME / 2 + delay, [0.5, 0, 0.75, 0.5], [(pos[0] + dir[0] * bumpDist) * WIDTH, (pos[1] + dir[1] * bumpDist) * WIDTH]
                    posAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.25, 0.5, 0.5, 1], [pos[0] * WIDTH, pos[1] * WIDTH]
                    if rock
                        rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]
                        if moving
                            moving = false
                            movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [1, 1]
                            movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [0, 0]
                    else
                        rotAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [quarterTurns * 90, center[0], center[1]]

                if k[0] == "x"
                    scaleAnim.add step * STEP_TIME + ROCK_DELAY + TWEEN_TIME / 2, [1/3, 1/3, 2/3, 2/3], [1, 1]
                    scaleAnim.add step * STEP_TIME + ROCK_DELAY + TWEEN_TIME / 2, [1/3, 1/3, 2/3, 2/3], [0, 0]

                step += 1
            
            length = step * STEP_TIME

            posAnim.finalize length
            rotAnim.finalize length
            scaleAnim.finalize length
            animJsxs = [posAnim.toJsx(), rotAnim.toJsx(), scaleAnim.toJsx()]
            if rock
                movingRockAnim.finalize length
                movingRockAnimJsx = movingRockAnim.toJsx()


        tiles.push <symbol {...tile.props}>
                {tile.props.children}
                {animJsxs}
                {if rock then <g>
                    {movingRock}
                    {movingRockAnimJsx}
                </g> else null}
            </symbol>
    tiles