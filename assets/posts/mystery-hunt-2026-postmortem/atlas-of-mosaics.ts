export { run }

class AtlasOfMosaics {
    div: HTMLDivElement;
    isInit: boolean = false;

    constructor() {
        this.div = document.getElementById("atlas-of-mosaics")! as HTMLDivElement;
    }

    init() {
        this.isInit = true;
        this.div.className = "portal";
    }

    uninit() {
        this.isInit = false;
        this.div.className = ""
    }
}

async function run() {
    let button = document.getElementById("atlas-of-mosaics-button")! as HTMLInputElement;
    let atlas: AtlasOfMosaics | undefined = undefined;
    button.addEventListener("click", (ev: MouseEvent) => {
        if (atlas === undefined || !atlas.isInit) {
            button.value = "Accessibility: OFF"
            if (atlas === undefined) {
                atlas = new AtlasOfMosaics();
            }
            atlas.init();
        } else {
            button.value = "Accessibility: ON"
            atlas.uninit();
        }
    })
}