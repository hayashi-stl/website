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
    while render.context(animationY, 0).key != "animation"
        animationY += 1
    animationY += 1

    if render.context(animationY, 0).key?
        numAnimations = 0
        animations = {}
        keys = []
        # First column reserved for step-specific properties
        while render.context(animationY, numAnimations + 1).key not in [undefined, ""]
            keys.push render.context(animationY, numAnimations + 1).key
            animations[render.context(animationY, numAnimations + 1).key] = []
            numAnimations += 1

        y = animationY + 1
        while render.context(y, 1).key not in [undefined, ""]
            for x in [0...numAnimations]
                animations[keys[x]].push [render.context(y, 0).key, render.context(y, x + 1).key]
            y += 1

    render.drawing.keys.splice(animationY - 1)
    # Even out the number of rows and columns
    #for row in render.drawing.keys
    #    row.push ""
    #render.drawing.keys.push ("" for _ in [0...render.drawing.keys[0].length])

    render.drawing.keys = ( \
        (render.drawing.keys[i][j] for j in [0...render.drawing.keys[i].length] when j % 2 == 0) \
        for i in [0...render.drawing.keys.length] when i % 2 == 0 \
        )


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
        if !(@keyframes[0]?) || @keyframes[0] > 0
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
        transform = @type in ["translate", "rotate"]
        
        if transform
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
        else
            <animate
                attributeName = "#{@type}"
                keyTimes = "#{animKeyTimes}"
                keySplines = "#{animKeySplines}"
                values = "#{animValues}"
                dur = "#{@length}s"
                repeatCount = "indefinite"
                calcMode = "spline"
            />

STEP_TIME = 0.75
TWEEN_TIME = 0.1
ROCK_DELAY = 0.05
EX_DELAY = 0.175

export map = (key) ->
    if key == ""
        return blankTile

    if key[0] == "{"
        json = JSON.parse key
        tileKey = json["t"]
        id = json["id"]
        startDir = animationDirs[json["dir"]] ? [0, 1]
        startMoving = if json["move"] then 1 else 0
    else
        tileKey = key
    rock = tileKey == "r"

    tile = wallTiles[tileKey]
    tiles = []
    if tileKey not in ["", "#"]
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
            baseDelay = if rock then ROCK_DELAY else 0

            posAnim = new Animation "translate", [0, 0]
            rotAnim = new Animation "rotate", [quarterTurns * 90, center[0], center[1]]
            opacityAnim = new Animation "opacity", [1]
            movingRockAnim = null
            if rock
                movingRockAnim = new Animation "opacity", [moving + 0]

            for pair in anim
                common = pair[0]
                k = pair[1]
                step_len = if /f/.exec(common)? then 0.5 else 1

                newDir = animationDirs[/[v<>^]/.exec(k)?[0]]
                bumpDist = bumpDistances[/[-*+]/.exec(k)?[0]]
                disappear = /x/.exec(k)?
                dir_factor = if /r/.exec(k)? then -1 else 1
                delay = baseDelay + (if /d/.exec(k)? then EX_DELAY else 0)
                if newDir?
                    posAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [pos[0] * WIDTH, pos[1] * WIDTH]
                    rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]

                    dir = [...newDir]
                    newQuarterTurns = dirQuarterTurns dir
                    quarterTurns += (newQuarterTurns - quarterTurns + 2) %% 4 - 2

                    if !(bumpDist?)
                        pos = [pos[0] + dir[0] * dir_factor, pos[1] + dir[1] * dir_factor]
                        posAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [pos[0] * WIDTH, pos[1] * WIDTH]
                        if rock
                            rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]
                            if !moving
                                moving = true
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [0]
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [1]
                            else if moving && dir_factor < 0
                                moving = false
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [1]
                                movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [0]
                        else
                            rotAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [quarterTurns * 90, center[0], center[1]]
                
                if bumpDist? # wall bump
                    posAnim.add step * STEP_TIME + TWEEN_TIME / 2 + delay, [0.5, 0, 0.75, 0.5], [(pos[0] + dir[0] * bumpDist) * WIDTH, (pos[1] + dir[1] * bumpDist) * WIDTH]
                    posAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.25, 0.5, 0.5, 1], [pos[0] * WIDTH, pos[1] * WIDTH]
                    if rock
                        rotAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [quarterTurns * 90, center[0], center[1]]
                        if moving
                            moving = false
                            movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [1]
                            movingRockAnim.add step * STEP_TIME + delay, [1/3, 1/3, 2/3, 2/3], [0]
                    else
                        rotAnim.add step * STEP_TIME + TWEEN_TIME + delay, [0.5, 0, 0.5, 1], [quarterTurns * 90, center[0], center[1]]

                if disappear
                    opacityAnim.add step * STEP_TIME + ROCK_DELAY + TWEEN_TIME / 2, [1/3, 1/3, 2/3, 2/3], [1]
                    opacityAnim.add step * STEP_TIME + ROCK_DELAY + TWEEN_TIME / 2, [1/3, 1/3, 2/3, 2/3], [0]

                step += step_len
            
            length = step * STEP_TIME

            posAnim.finalize length
            rotAnim.finalize length
            opacityAnim.finalize length
            animJsxs = [posAnim.toJsx(), rotAnim.toJsx(), opacityAnim.toJsx()]
            if rock
                movingRockAnim.finalize length
                movingRockAnimJsx = movingRockAnim.toJsx()


        tiles.push <symbol {...tile.props}>
                <g>
                    {tile.props.children}
                    {animJsxs}
                    {if rock then <g>
                        {movingRock}
                        {movingRockAnimJsx}
                    </g> else null}
                </g>
            </symbol>
    tiles