import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

enum ORDER {
  ATOMIC = 0, // 0 "" ...
  NEW = 1.1, // new
  MEMBER = 1.2, // . []
  FUNCTION_CALL = 2, // ()
  INCREMENT = 3, // ++
  DECREMENT = 3, // --
  BITWISE_NOT = 4.1, // ~
  UNARY_PLUS = 4.2, // +
  UNARY_NEGATION = 4.3, // -
  LOGICAL_NOT = 4.4, // !
  TYPEOF = 4.5, // typeof
  VOID = 4.6, // void
  DELETE = 4.7, // delete
  AWAIT = 4.8, // await
  EXPONENTIATION = 5.0, // **
  MULTIPLICATION = 5.1, // *
  DIVISION = 5.2, // /
  MODULUS = 5.3, // %
  SUBTRACTION = 6.1, // -
  ADDITION = 6.2, // +
  BITWISE_SHIFT = 7, // << >> >>>
  RELATIONAL = 8, // < <= > >=
  IN = 8, // in
  INSTANCEOF = 8, // instanceof
  EQUALITY = 9, // == != === !==
  BITWISE_AND = 10, // &
  BITWISE_XOR = 11, // ^
  BITWISE_OR = 12, // |
  LOGICAL_AND = 13, // &&
  LOGICAL_OR = 14, // ||
  CONDITIONAL = 15, // ?:
  ASSIGNMENT = 16, // = += -= **= *= /= %= <<= >>= ...
  YIELD = 16.5, // yield
  COMMA = 17, // ,
  NONE = 99 // (...)
}

enum NodeType {
  NODE = 0,
  LITERAL = 1,
  DEFINE = 2,
  REFERENCE = 3,
  INC = 4,
  SCOPE = 5,
  REPEAT = 6,
  PRINT = 7,
  FUNCREF = 8,
  FUNCDEF = 9,
  XGATE = 10
}

enum BitType {
  CLASSICAL = 'classical',
  QUBIT = 'Qubit'
}

class QNode {
  type: NodeType = NodeType.NODE

  constructor (type: NodeType) {
    this.type = type
  }
}

class LiteralNode extends QNode {
  private value: number

  constructor (value: number) {
    super(NodeType.LITERAL)
    this.value = value
  }

  getValue () {
    return this.value
  }
}

class DefineNode extends QNode {
  private name: string
  private value: LiteralNode

  constructor (name: string, value: LiteralNode) {
    super(NodeType.DEFINE)
    this.name = name
    this.value = value
  }

  public getValue () {
    return this.value
  }

  public getName () {
    return this.name
  }
}

class ReferenceNode extends LiteralNode {
  private name: string

  constructor (name: string) {
    super(0)
    this.type = NodeType.REFERENCE
    this.name = name
  }

  link () {}

  getName () {
    return this.name
  }
}

class IncrementNode extends QNode {
  variable: ReferenceNode
  incValue: LiteralNode

  constructor (variable: ReferenceNode, incrementValue: LiteralNode) {
    super(NodeType.INC)
    this.variable = variable
    this.incValue = incrementValue
  }
}

class ScopeNode extends QNode {
  nodes: QNode[] = []

  constructor () {
    super(NodeType.SCOPE)
  }

  add (node: QNode) {
    this.nodes.push(node)
  }
}

class FuncDefNode extends QNode {
  scope = new ScopeNode()
  name: string

  constructor (name: string) {
    super(NodeType.FUNCDEF)
    this.name = name
  }

  getName () {
    return this.name
  }
}

class FuncRefNode extends QNode {
  private name: string

  constructor (name: string) {
    super(NodeType.FUNCREF)
    this.name = name
  }

  getName () {
    return this.name
  }
}

class RepeatNode extends QNode {
  scope: ScopeNode
  loopTimes: ReferenceNode

  constructor (scope: ScopeNode, loopTimes: ReferenceNode) {
    super(NodeType.REPEAT)
    this.scope = scope
    this.loopTimes = loopTimes
  }
}

class PrintNode extends QNode {
  arg: LiteralNode
  constructor (arg: LiteralNode) {
    super(NodeType.PRINT)
    this.arg = arg
  }
}

class XGateNode extends QNode {
  index: LiteralNode
  constructor (val: LiteralNode) {
    super(NodeType.XGATE)
    this.index = val
  }
}

class Scope {
  topLevel: ScopeNode
  variables: { [key: string]: number } = {}
  funcs: { [key: string]: Scope } = {}
  depth: number = 0
  parent: Scope | null = null

  constructor (scope: ScopeNode, parent?: Scope) {
    this.topLevel = scope
    if (parent) this.parent = parent
  }

  getChildScope (scope: ScopeNode) {
    const childScope = new Scope(scope, this)
    childScope.depth = this.depth + 1
    return childScope
  }

  getFunc (name: string) {
    let found = false

    let current: Scope | null = this
    while (current) {
      if (Object.hasOwnProperty.call(current.funcs, name)) {
        found = true
        return current.funcs[name]
      } else {
        current = current.parent
      }
    }

    throw 'Undefined function: ' + name
  }

  private getValueFromLiteralOrRef (node: LiteralNode): number {
    if (node.type === NodeType.LITERAL) {
      return node.getValue()
    } else {
      const ref = node as ReferenceNode
      let current: Scope | null = this
      let found = false
      let val = -1
      const varName = ref.getName()

      while (current) {
        if (Object.hasOwnProperty.call(current.variables, varName)) {
          found = true
          val = current.variables[varName]
          return val
        } else {
          current = current.parent
        }
      }

      throw `Undefined variable: ${varName}`
    }
  }

  private compileNode (node: QNode): string[] {
    switch (node.type) {
      case NodeType.DEFINE: {
        let def = node as DefineNode
        this.variables[def.getName()] = this.getValueFromLiteralOrRef(
          def.getValue()
        )
        return [
          `# DEFINE ${def.getName()} AS ${this.compileNode(def.getValue())}`
        ]
      }
      case NodeType.FUNCDEF: {
        const fn = node as FuncDefNode
        return [`# DEF FUNC ${fn.getName()}`]
      }
      case NodeType.LITERAL: {
        let lit = node as LiteralNode
        return [lit.getValue().toString()]
      }
      case NodeType.XGATE: {
        const xg = node as XGateNode
        return [BitType.QUBIT, `x q[${this.getValueFromLiteralOrRef(xg.index)}]`]
      }
      case NodeType.REPEAT: {
        let rep = node as RepeatNode

        const childScope = this.getChildScope(rep.scope)
        let loopTimes = this.getValueFromLiteralOrRef(rep.loopTimes)

        let body: string[] = [`# LOOP {...} ${loopTimes} TIMES`]

        for (let i = 0; i < loopTimes; i++) {
          body.push(...childScope.compile())
        }
        return body
      }

      case NodeType.FUNCREF: {
        let fn = node as FuncRefNode
        let fnScope = this.getFunc(fn.getName())
        return [`# CALL ${fn.getName()}`, ...fnScope.compile()]
      }
      case NodeType.INC: {
        let inc = node as IncrementNode

        const varName = inc.variable.getName()
        const incValue = this.getValueFromLiteralOrRef(inc.incValue)
        this.variables[inc.variable.getName()] += incValue
        return [`# INC ${varName} BY ${incValue}`]
      }
      case NodeType.REFERENCE: {
        break
      }
      case NodeType.PRINT: {
        const prt = node as PrintNode
        return [`PRINT ${this.getValueFromLiteralOrRef(prt.arg)}`]
      }
    }

    throw 'Unknown node type: ' + NodeType[node.type]

    return []
  }

  compile () {

    let str: string[] = []
    let qubitCount = 0;
    let regBitCount = 0;

    // need to hoist function def's and var defs to the top to match the following scheme

    // var defs
    // fn defs
    // program body

    this.topLevel.nodes.sort((a, b) => {
      let aVal = 0
      let bVal = 0
      switch (a.type) {
        case NodeType.DEFINE:
          aVal = 0
          break
        case NodeType.FUNCDEF:
          aVal = 1
          break
        default:
          aVal = 2
          break
      }
      switch (b.type) {
        case NodeType.DEFINE:
          bVal = 0
          break
        case NodeType.FUNCDEF:
          bVal = 1
          break
        default:
          bVal = 2
          break
      }
      return aVal - bVal
    })

    for (let i = 0; i < this.topLevel.nodes.length; i++) {
      const node = this.topLevel.nodes[i]
      if (node.type === NodeType.FUNCDEF) {
        const fnNode = node as FuncDefNode
        this.funcs[fnNode.getName()] = this.getChildScope(fnNode.scope)
      }
    }

    for (let i = 0; i < this.topLevel.nodes.length; i++) {
      let node = this.topLevel.nodes[i]

      let ret = this.compileNode(node)
      if (ret.length === 2) {
        if (ret[0] === BitType.QUBIT){
          qubitCount++;
        } else if (ret[0] === BitType.CLASSICAL) {
          regBitCount++;
        }
        ret.shift();
      }
      if (ret.length > 0) str.push(...ret)
    }

    const addSpaces = false
    if (addSpaces) {
      for (let i = 0; i < str.length; i++) {
        let space = ''
        for (let s = 0; s < this.depth * 2; s++) {
          space += ' '
        }
        str[i] = space + str[i]
      }
    }
    const header = [`OPENQASM 2.0;\ninclude "qelib1.inc";\n\nqreg q[${qubitCount}];\ncreg c[${regBitCount}];\n`];
    const arr = header.concat(str);
    return arr;
  }
}

class Compiler {
  compile (scope: ScopeNode) {
    const topScope = new Scope(scope)
    return topScope.compile().join('\n')
  }
}

/*export const qasmGenerator = new Blockly.Generator('JSON');

qasmGenerator['entry'] = function(){
  return '';
}

qasmGenerator['test_x_gate'] = function(){
  return 'k';
}*/

enum StateMachineStates {}

export class qasmGenerator {
  generator = javascriptGenerator
  currentScope: ScopeNode = new ScopeNode()
  lastNode: QNode | null = null

  constructor () {
    const that = this

    this.generator['entry'] = function () {
      return ''
    }.bind(that)

    this.generator['test_x_gate'] = function (block: Blockly.Block) {
      var value_qubit = that.generator.valueToCode(block, 'Qubit', ORDER.ATOMIC)

      if (/REF:/.test(value_qubit)) {
        const refName = value_qubit.split(':')[1]
        that.currentScope.add(new XGateNode(new ReferenceNode(refName)))
        return 'X'
      }

      that.currentScope.add(
        new XGateNode(new LiteralNode(parseInt(value_qubit)))
      )
      return 'X'
    }

    this.generator['test_input'] = function (block: Blockly.Block) {
      var dropdown_drop = block.getFieldValue('DROP')
      // TODO: Assemble JavaScript into code variable.
      var code = dropdown_drop
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, ORDER.ATOMIC]
    }

    this.generator['custom_function_def'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')

      const fnDef = new FuncDefNode(text_name)
      const oldScope = that.currentScope
      that.currentScope = fnDef.scope
      oldScope.add(fnDef)

      that.generator.statementToCode(block, 'Blocks')

      that.currentScope = oldScope
      return 'FUNDEF'
    }

    this.generator['custom_function_ref'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      const funRef = new FuncRefNode(text_name)
      that.currentScope.add(funRef)
      return 'FUNREF'
    }

    this.generator['var_def_gate'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      var text_input = parseInt(block.getFieldValue('INPUT'))
      var dropdown_type = block.getFieldValue('TYPE')
      const varDefGate = new DefineNode(text_name, new LiteralNode(text_input))
      that.currentScope.add(varDefGate)
      return 'VAR'
    }

    this.generator['var_ref_gate'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      const refNode = new ReferenceNode(text_name)
      // this.currentScope.add(refNode)
      return ['REF:' + text_name, '', 1]
    }.bind(this)

    this.generator['if_else'] = function (block: any) {
      return '';
    }.bind(this)
  }

  compile (workspace: Blockly.Workspace) {
    this.lastNode = null
    this.currentScope = new ScopeNode()
    this.generator.workspaceToCode(workspace)

    const compiler = new Compiler()
    let output = ''
    let error: string | null = null

    try {
      output = compiler.compile(this.currentScope)
    } catch (err) {
      error = err + ''
    }

    const ret = { output, error }
    return ret
  }
}

/*
fn c(){
  content
}

fn b(){
  c();
}

fn a(){
  b();
}
*/
