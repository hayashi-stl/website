import argparse

parser = argparse.ArgumentParser(description="Converts cp to cpx")
parser.add_argument("input")
parser.add_argument("output")
parser.add_argument("-d", "--divisor", default=1, type=float)
parser.add_argument("-i", "--integer", action="store_true")
args = parser.parse_args()

with open(args.input) as f:
    cp = f.readlines()

cpx = []
for line in cp:
    values = line.split()
    coords = [float(x) / args.divisor for x in values[1:]]
    if args.integer:
        coords = [int(round(x)) for x in coords]
    cpx.append(f"{values[0]} {' '.join(str(x) for x in coords)}")

with open(args.output, "w") as f:
    f.write("\n".join(cpx))