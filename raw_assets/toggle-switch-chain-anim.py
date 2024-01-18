from math import hypot, log2, atan2, degrees

SPEED = 40

agent_anim = [
    (0.0, (-30.0, 10.0))
]
# Animates rotation
NUM_LINES = 4
LINE_ANGLE = degrees(-2 * atan2(0.5, 2))
line_anims = [[(0.0, False)] for _ in range(NUM_LINES)]

def add_agent_move(dx, dy):
    prev_time, prev_pos = agent_anim[-1]
    new_pos = (prev_pos[0] + dx, prev_pos[1] + dy)
    new_time = prev_time + hypot(dx, dy) / SPEED
    agent_anim.append((new_time, new_pos))

# Based on current agent time
def add_line_flip(line, end):
    time = agent_anim[-1][0]
    prev_up = line_anims[line][-1][1]
    line_anims[line].append((time, prev_up))
    if not end:
        line_anims[line].append((time + 0.1, not prev_up))

add_agent_move(25, 0)

for i in range(1, 2**4 + 1):
    add_agent_move(5, 0)
    bit = int(log2(i ^ (i - 1)))
    
    # Top paths
    for j in range(bit):
        add_agent_move(20, -5)
        add_line_flip(j, False)
        add_agent_move(10, 5)
    
    if i == 2**4:
        break

    # Bottom path
    add_agent_move(20, 5)
    add_line_flip(bit, False)
    add_agent_move(5, 2.5)
    add_agent_move(0, 7.5)
    for _ in range(bit + 1):
        add_agent_move(-30, 0)
    add_agent_move(0, -15)

add_agent_move(20, 0)

for i in range(len(line_anims)):
    add_line_flip(i, True)

# Create animation
agent_path = [f"M {agent_anim[0][1][0]},{agent_anim[0][1][1]}"]
for point in agent_anim[1:]:
    agent_path.append(f"L {point[1][0]},{point[1][1]}")

agent_svg = f"""<animateMotion
    xlink:href='#agent'
    path='{' '.join(agent_path)}'
    dur='{agent_anim[-1][0]}'
    repeatCount='indefinite'
/>"""

line_svg = [
    f"""<animateTransform
    attributeName='transform'
    xlink:href='#line{i}'
    type='rotate'
    keyTimes='{';'.join(str(k / line_anim[-1][0]) for k, v in line_anim)}'
    values='{';'.join(str(LINE_ANGLE if v else 0.0) for k, v in line_anim)}'
    dur='{line_anim[-1][0]}'
    repeatCount='indefinite'
/>"""
    for i, line_anim in enumerate(line_anims)
]
print(agent_svg)
for l in line_svg:
    print(l)