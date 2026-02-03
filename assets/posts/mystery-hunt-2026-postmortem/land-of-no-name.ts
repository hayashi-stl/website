export {run}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class LetterMap {
    place: Node
    curr: string
    full: string
    positions: number[][]

    constructor(place: Node) {
        this.place = place
        this.curr = place.textContent!;
        this.full = place.textContent!;
        this.positions = [...new Array(ALPHABET.length).keys()].map(_ => []);
        for (let i = 0; i < ALPHABET.length; ++i)
            for (let j = 0; j < this.full.length; ++j)
                if (this.full[j].toUpperCase() === ALPHABET[i])
                    this.positions[i].push(j);
    }

    setLetter(index: number, show: boolean) {
        let curr = ""
        for (let i of this.positions[index])
            curr = curr + this.curr.substring(curr.length, i) + (show ? this.full[i] : "˽");
        this.curr = curr + this.curr.substring(curr.length);
        this.place.textContent = this.curr;
    }
}

class LandOfNoName {
    div: HTMLDivElement;
    letterButtons: HTMLDivElement;
    isInit: boolean = false;
    letterMaps: LetterMap[] = [];
    letterStatus: boolean[];

    constructor() {
        this.div = document.getElementById("land-of-no-name")! as HTMLDivElement;
        this.letterButtons = document.getElementById("land-of-no-name-letters")! as HTMLDivElement;
        let nodeStack: Node[] = [this.div];
        while (nodeStack.length > 0) {
            let node = nodeStack.pop()!;
            if (node.nodeType === Node.TEXT_NODE)
                this.letterMaps.push(new LetterMap(node));
            for (let child of node.childNodes)
                nodeStack.push(child);
        }
        this.letterStatus = [...new Array(ALPHABET.length).keys()].map(_ => false);
        let buttons = this.letterButtons.children;
        for (let i = 0; i < buttons.length; ++i) {
            let button = buttons[i] as HTMLInputElement;
            button.addEventListener("click", (ev: MouseEvent) => {
                let show = button.value === "";
                button.value = show ? ALPHABET[i] : "";
                this.letterStatus[i] = show;
                for (let map of this.letterMaps)
                    map.setLetter(i, show);
            })
        }
    }

    init() {
        this.isInit = true;
        this.div.className = "portal";
        this.letterButtons.setAttribute("style", "");
        for (let map of this.letterMaps)
            for (let i = 0; i < ALPHABET.length; ++i)
                if (!this.letterStatus[i])
                    map.setLetter(i, false);
    }

    uninit() {
        this.isInit = false;
        this.div.className = ""
        this.letterButtons.setAttribute("style", "display: none;");
        for (let map of this.letterMaps)
            for (let i = 0; i < ALPHABET.length; ++i)
                if (!this.letterStatus[i])
                    map.setLetter(i, true);
    }
}

async function run() {
    let button = document.getElementById("land-of-no-name-button")! as HTMLInputElement;
    let land: LandOfNoName | undefined = undefined;
    button.addEventListener("click", (ev: MouseEvent) => {
        if (land === undefined || !land.isInit) {
            button.value = "Accessibility: OFF"
            if (land === undefined) {
                land = new LandOfNoName();
            }
            land.init();
        } else {
            button.value = "Accessibility: ON"
            land.uninit();
        }
    })
}