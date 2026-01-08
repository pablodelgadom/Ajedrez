export type EngineOption = {
    name: string;
    value: string | number;
};

export class Engine {
    private worker: Worker | null = null;
    private onMessage: (data: string) => void;

    constructor(onMessage: (data: string) => void) {
        this.onMessage = onMessage;
    }

    public init() {
        try {
            this.worker = new Worker('/engine/stockfish-17.1-lite-51f59da.js');
            this.worker.onmessage = (event) => {
                this.onMessage(event.data);
            };
            this.worker.postMessage('uci');
            this.worker.postMessage('isready');
        } catch (e) {
            console.error("Failed to initialize Stockfish worker", e);
        }
    }

    public setOption(name: string, value: string | number) {
        this.worker?.postMessage(`setoption name ${name} value ${value}`);
    }

    public newGame() {
        this.worker?.postMessage('ucinewgame');
        this.worker?.postMessage('isready');
    }

    public analyze(fen: string, depth: number = 10) {
        if (!this.worker) return;
        this.worker.postMessage(`position fen ${fen}`);
        this.worker.postMessage(`go depth ${depth}`);
    }

    public stop() {
        this.worker?.postMessage('stop');
    }

    public terminate() {
        this.worker?.terminate();
        this.worker = null;
    }
}
