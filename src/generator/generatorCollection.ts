import generate_QASM, { QasmNode } from './qasmGenerator'
import { QASMBlocklyGenerator } from './generator'

export class QasmBlockly {
  funcs: { [key: string]: any } = {}
  generator = new QASMBlocklyGenerator()

  getBlocks () {
    return this.generator.blocks
  }

  compile (workspace: any) {
    var code = this.generator.qasmGenerator.workspaceToCode(workspace)
    const ret = generate_QASM(this)
    let qasm_string = ret.qasm.reduce(
      (previous_string, current_string) => previous_string.concat(current_string[0])
    )

    return {
      qasm: qasm_string,
      errors: ret.errors
    }
  }
}
