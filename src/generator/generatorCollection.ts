import generate_QASM, { QasmNode } from "./qasmGenerator";

export class QasmBlockCollection {
    blocks: QasmNode[] = [];
    funcs: {[key: string]: any} = {};

    compile(){
        return generate_QASM(this);
    }
}