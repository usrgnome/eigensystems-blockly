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
  XGATE = 10,
  REG,
  IF,
  COMPARISON,
  MEASURE,
  FORLOOP,
  YGATE,
  ZGATE,
  HADAMARD,
  CXGATE,
}

class QNode {
  type: NodeType = NodeType.NODE

  constructor (type: NodeType) {
    this.type = type
  }
}

class ComparisonNode extends QNode {
  condA: QNode = new QNode(NodeType.NODE)
  condB: QNode = new QNode(NodeType.NODE)
  check: string = '=='

  constructor () {
    super(NodeType.COMPARISON)
  }
}

class IfNode extends QNode {
  comparison: ComparisonNode
  body: QNode
  constructor (comparison: ComparisonNode, body: QNode) {
    super(NodeType.IF)
    this.comparison = comparison
    this.body = body
  }
}

class RegisterNode extends QNode {
  regName: string
  constructor (regName: string) {
    super(NodeType.REG)
    this.regName = regName
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

class MeasureNode extends QNode {
  r0: string
  i0: number
  r1: string
  i1: number

  constructor (r0: string, i0: number, r1: string, i1: number) {
    super(NodeType.MEASURE)
    this.r0 = r0
    this.r1 = r1
    this.i0 = i0
    this.i1 = i1
  }
}

class ForLoopNode extends QNode {
  scope = new ScopeNode()
  defName: string
  defValue: number
  compName: string
  comp: string
  compValue: LiteralNode 
  updateName: string
  update: string

  constructor (
    defName: string,
    defValue: number,
    compName: string,
    comp: string,
    compValue: LiteralNode,
    updateName: string,
    update: string
  ) {
    super(NodeType.FORLOOP)
    this.defName = defName
    this.defValue = defValue
    this.compName = compName
    this.comp = comp
    this.compValue = compValue
    this.updateName = updateName
    this.update = update
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

class YGateNode extends QNode {
  index: LiteralNode
  constructor (val: LiteralNode) {
    super(NodeType.YGATE)
    this.index = val
  }
}
class ZGateNode extends QNode {
  index: LiteralNode
  constructor (val: LiteralNode) {
    super(NodeType.ZGATE)
    this.index = val
  }
}

class HadamardGateNode extends QNode {
  index: LiteralNode
  constructor (val: LiteralNode) {
    super(NodeType.HADAMARD)
    this.index = val
  }
}

class CXGateNode extends QNode {
  index1: LiteralNode
  index2: LiteralNode
  constructor (val1: LiteralNode, val2: LiteralNode) {
    super(NodeType.CXGATE)
    this.index1 = val1
    this.index2 = val2;
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

  updateVar(name: string, by: number) {
    let current: Scope | null = this
    const varName = name

    while (current) {
      if (Object.hasOwnProperty.call(current.variables, varName)) {
        current.variables[varName] += by;
        return;
      } else {
        current = current.parent
      }
    }

    throw `Undefined variable: ${varName}`
  }

  getValueFromName (name: string) {
    let current: Scope | null = this
    let found = false
    let val = -1
    const varName = name

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

  getValueFromLiteralOrRef (node: LiteralNode): number {
    if (!node) return 0
    if (node.type === NodeType.LITERAL) {
      return node.getValue()
    } else {
      if (node.type !== NodeType.REFERENCE) {
        return 0
      }
      const ref = node as ReferenceNode
      const varName = ref.getName()
      return this.getValueFromName(varName)
    }
  }

  private compileNode (node: QNode, infoObj: InfoObj): string[] {
    switch (node.type) {
      case NodeType.DEFINE: {
        let def = node as DefineNode
        /*this.variables[def.getName()] = this.getValueFromLiteralOrRef(
          def.getValue()
        )*/
        return [
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
        const idx = this.getValueFromLiteralOrRef(xg.index)
        infoObj.qIdx = Math.max(infoObj.qIdx, idx)
        return [`x q[${idx}];`]
      }
      case NodeType.YGATE: {
        const xg = node as XGateNode
        const idx = this.getValueFromLiteralOrRef(xg.index)
        infoObj.qIdx = Math.max(infoObj.qIdx, idx)
        return [`y q[${idx}];`]
      }
      case NodeType.ZGATE: {
        const xg = node as XGateNode
        const idx = this.getValueFromLiteralOrRef(xg.index)
        infoObj.qIdx = Math.max(infoObj.qIdx, idx)
        return [`z q[${idx}];`]
      }
      case NodeType.HADAMARD: {
        const xg = node as XGateNode
        const idx = this.getValueFromLiteralOrRef(xg.index)
        infoObj.qIdx = Math.max(infoObj.qIdx, idx)
        return [`h q[${idx}];`]
      }
      case NodeType.CXGATE: {
        const xg = node as CXGateNode
        const idx1 = this.getValueFromLiteralOrRef(xg.index1)
        const idx2 = this.getValueFromLiteralOrRef(xg.index2)
        infoObj.qIdx = Math.max(infoObj.qIdx, idx1);
        infoObj.qIdx = Math.max(infoObj.qIdx, idx2);
        return [`cx q[${idx1}], q[${idx2}];`];
      }
      case NodeType.REPEAT: {
        let rep = node as RepeatNode

        const childScope = this.getChildScope(rep.scope)
        let loopTimes = this.getValueFromLiteralOrRef(rep.loopTimes)

        let body: string[] = [`# LOOP {...} ${loopTimes} TIMES`]

        for (let i = 0; i < loopTimes; i++) {
          body.push(...childScope.compile(infoObj))
        }
        return body
      }
      case NodeType.MEASURE: {
        const measure = node as MeasureNode
        return [
          `measure ${measure.r0}[${measure.i0}] -> ${measure.r1}[${measure.i1}];`
        ]
        return []
      }
      case NodeType.FUNCREF: {
        let fn = node as FuncRefNode
        let fnScope = this.getFunc(fn.getName())
        const fnStr = fnScope.compile(infoObj)
        return [`# CALL ${fn.getName()}`, ...fnStr]
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
      case NodeType.IF: {
        let ifN = node as IfNode
        if (ifN.body && ifN.comparison) {
          const comparison = this.compileNode(ifN.comparison, infoObj)
          const body = this.compileNode(ifN.body, infoObj)
          return [`if(${comparison}) ${body}`]
        }
        return ['']
      }
      case NodeType.FORLOOP: {
        const forNode = node as ForLoopNode
        if(forNode.scope === this.topLevel) {
          const ret: string[] = [];
          const initVal = this.getValueFromName(forNode.defName);


          return ret;
        } else {
          forNode.scope.nodes.unshift(forNode);

          let ret: string[] = [];
          const scope = this.getChildScope(forNode.scope);
          scope.preParse();

          const OPERATORS = {
            EQ: '==',
            NEQ: '!=',
            LT: '<',
            LTE: '<=',
            GT: '>',
            GTE: '>='
          }

          const OPS2 = {
            EQ: '--',
            NEG: '++',
          }


          let maxLoops = 999;
          let currLoop = 0;
          // @ts-ignore
          switch(OPERATORS[forNode.comp]) {
            case '==': {
              while(scope.getValueFromName(forNode.compName) == scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++
              }
              break;
            }
            case '!=': {
              while(scope.getValueFromName(forNode.compName) != scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++
              }
              break;
            }
            case '>=': {
              while(scope.getValueFromName(forNode.compName) >= scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++
              }
              break;
            }
            case '<=': {
              while(scope.getValueFromName(forNode.compName) <= scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++
              }
              break;
            }
            case '>': {
              while(scope.getValueFromName(forNode.compName) > scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++;
              }
              break;
            }
            case '<': {
              while(scope.getValueFromName(forNode.compName) < scope.getValueFromLiteralOrRef(forNode.compValue) && currLoop < maxLoops) {
                ret.push(...scope.compile(infoObj, true));
                // @ts-ignore
                if(OPS2[forNode.update] === OPS2.EQ) scope.updateVar(forNode.updateName, -1);
                else scope.updateVar(forNode.updateName, 1);
                currLoop++
              }
              break;
            }
          }

          if(currLoop >= maxLoops) {
            return ['# LOOP SIZE EXCEEDED!'];
          }

          return ret;
        }
      }
      case NodeType.COMPARISON: {
        const c = node as ComparisonNode
        const a = this.compileNode(c.condA, infoObj)
        const b = this.compileNode(c.condB, infoObj)
        return [`${a} ${c.check} ${b}`]
      }
      case NodeType.REG: {
        const r = node as RegisterNode
        return [r.regName]
      }
      case NodeType.PRINT: {
        const prt = node as PrintNode
        return [`PRINT ${this.getValueFromLiteralOrRef(prt.arg)}`]
      }
    }

    throw 'Unknown node type: ' + NodeType[node.type]

    return []
  }

  preParse(){
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
      } else if(node.type === NodeType.DEFINE) {
        const def = node as DefineNode;
        this.variables[def.getName()] = this.getValueFromLiteralOrRef(
          def.getValue()
        )
      }
    }

  }

  compile (infoObj: InfoObj, skipParse = false) {
    let str: string[] = []

    if(!skipParse) this.preParse();

    for (let i = 0; i < this.topLevel.nodes.length; i++) {
      let node = this.topLevel.nodes[i]

      let ret = this.compileNode(node, infoObj)
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
    return str
  }
}

interface InfoObj {
  qIdx: number
  cIdx: number
}

class Compiler {
  compile (scope: ScopeNode) {
    const infoObj: InfoObj = { qIdx: 0, cIdx: 0 }
    const topScope = new Scope(scope)
    const compileInfo = topScope.compile(infoObj)
    const headerInfo = [
      'OPENQASM 2.0;',
      'include "qelib1.inc";',
      `qreg q[${infoObj.qIdx}];`,
      `creg c[${infoObj.cIdx}];`
    ]
    const ret = [...headerInfo, ...compileInfo].join('\n')
    return ret
  }
}

export class qasmGenerator {
  generator = javascriptGenerator
  currentScope: ScopeNode = new ScopeNode()
  lastNode: QNode | null = null
  stack: QNode[] = []

  saveStack () {
    const stack = this.stack
    this.stack = []
    return stack
  }

  restoreStack (stack: QNode[]) {
    const oldStack = this.stack

    this.stack = stack

    for (let i = 0; i < oldStack.length; i++) {
      this.currentScope.add(oldStack[i])
    }
  }

  constructor () {
    const that = this

    this.generator['entry'] = function () {
      return ''
    }.bind(that)

    this.generator['test_x_gate'] = function (block: Blockly.Block) {
      that.generator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
      const node = new XGateNode(that.stack.pop() as LiteralNode)
      that.stack.push(node)
      return 'X'
    }

    this.generator['test_hadamard_gate'] = function (block: Blockly.Block) {
      that.generator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
      const node = new HadamardGateNode(that.stack.pop() as LiteralNode)
      that.stack.push(node)
      return 'X'
    }

    this.generator['cx_gate'] = function (block: Blockly.Block) {
      that.generator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
      that.generator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)

      const q2 = that.stack.pop() as LiteralNode;
      const q1 = that.stack.pop() as LiteralNode;

      const node = new CXGateNode(q1, q2);
      that.stack.push(node)
      return 'X'
    }

    this.generator['test_y_gate'] = function (block: Blockly.Block) {
      that.generator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
      const node = new YGateNode(that.stack.pop() as LiteralNode)
      that.stack.push(node)
      return 'X'
    }

    this.generator['test_z_gate'] = function (block: Blockly.Block) {
      that.generator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
      const node = new ZGateNode(that.stack.pop() as LiteralNode)
      that.stack.push(node)
      return 'X'
    }

    this.generator['test_input'] = function (block: Blockly.Block) {
      var dropdown_drop = block.getFieldValue('DROP')
      var code = dropdown_drop
      const node = new LiteralNode(parseInt(code) || 0)
      that.stack.push(node)
      return [code, ORDER.ATOMIC]
    }

    this.generator['register'] = function (block: Blockly.Block) {
      const code = block.getFieldValue('register') === 'q' ? 'q' : 'c'
      const node = new RegisterNode(code)
      that.stack.push(node)
      return [code, ORDER.ATOMIC]
    }

    this.generator['custom_function_def'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')

      const oldStack = that.saveStack()

      const fnDef = new FuncDefNode(text_name)
      const oldScope = that.currentScope
      that.currentScope = fnDef.scope

      that.generator.statementToCode(block, 'Blocks')

      that.restoreStack(oldStack)

      that.currentScope = oldScope
      that.stack.push(fnDef)
      return 'FUNDEF'
    }

    this.generator['custom_function_ref'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      const funRef = new FuncRefNode(text_name)
      that.stack.push(funRef)
      return 'FUNREF'
    }

    this.generator['var_def_gate'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      var text_input = parseInt(block.getFieldValue('INPUT'))
      var dropdown_type = block.getFieldValue('TYPE')
      const varDefGate = new DefineNode(text_name, new LiteralNode(text_input))
      that.stack.push(varDefGate)
      return 'VAR'
    }

    this.generator['var_ref_gate'] = function (block: any) {
      var text_name = block.getFieldValue('NAME')
      const refNode = new ReferenceNode(text_name)
      that.stack.push(refNode)
      return ['REF', '', 1]
    }.bind(this)

    this.generator['measurement_gate_true'] = function (block: Blockly.Block) {
      const r0 = block.getFieldValue('R0') as string
      const i0 = block.getFieldValue('I0') as number
      const r1 = block.getFieldValue('R1') as string
      const i1 = block.getFieldValue('I1') as number
      that.stack.push(new MeasureNode(r0, i0, r1, i1))
      return ''
    }

    this.generator['loop_block'] = function (block: Blockly.Block) {
      const var1 = block.getFieldValue('var1') as string
      const in1 = block.getFieldValue('I1') as number
      const var2 = block.getFieldValue('var1') as string
      const comp = block.getFieldValue('OP') as string
      const in2 = block.getFieldValue('I2') as number
      const var3 = block.getFieldValue('var3') as string
      const update = block.getFieldValue('OP1') as string

      const forLoop = new ForLoopNode(var1, in1, var2, comp, new LiteralNode(in2), var3, update)
      const oldStack = that.saveStack()
      const oldScope = that.currentScope
      that.currentScope = forLoop.scope

      that.stack.push(new DefineNode(var1, new LiteralNode(in1)))
      let branchCode = that.generator.statementToCode(block, 'DO0')
      that.restoreStack(oldStack)
      that.currentScope = oldScope

      that.stack.push(forLoop)
      return 'A'
    }

    this.generator['if_else'] = function (block: any) {
      // If/elseif/else condition.
      let n = 0
      let code = ''
      const oldStack = that.saveStack()

      const conditionCode =
        that.generator.valueToCode(block, 'IF' + n, ORDER.NONE) || 'false'

      const comparison = that.stack.pop() as ComparisonNode

      let branchCode = that.generator.statementToCode(block, 'DO' + n)
      if (that.generator.STATEMENT_SUFFIX) {
        branchCode =
          that.generator.prefixLines(
            that.generator.injectId(that.generator.STATEMENT_SUFFIX, block),
            that.generator.INDENT
          ) + branchCode
      }

      const bodyNode = that.stack.pop() as QNode

      code +=
        (n > 0 ? ' else ' : '') +
        'if (' +
        conditionCode +
        ') {\n' +
        branchCode +
        '}'
      n++

      const ifNode = new IfNode(comparison, bodyNode)

      that.restoreStack(oldStack)

      that.stack.push(ifNode)

      return code + '\n'
    }.bind(this)

    this.generator['logic_compare'] = function (block: Blockly.Block) {
      // Comparison operator.
      const OPERATORS = {
        EQ: '==',
        NEQ: '!=',
        LT: '<',
        LTE: '<=',
        GT: '>',
        GTE: '>='
      }
      // @ts-ignore
      const operator = OPERATORS[block.getFieldValue('OP')]
      const order =
        operator === '==' || operator === '!='
          ? that.generator.ORDER_EQUALITY
          : that.generator.ORDER_RELATIONAL
      const argument0 = that.generator.valueToCode(block, 'A', order) || '0'
      const argument1 = that.generator.valueToCode(block, 'B', order) || '0'
      const code = argument0 + ' ' + operator + ' ' + argument1

      const node = new ComparisonNode()
      const $a = that.stack.pop() as QNode
      const $b = that.stack.pop() as QNode
      node.condA = $b
      node.condB = $a
      node.check = operator
      that.stack.push(node)

      return [code, order]
    }
  }

  compile (workspace: Blockly.Workspace) {
    this.stack.length = 0
    this.lastNode = null
    this.currentScope = new ScopeNode()
    this.generator.workspaceToCode(workspace)
    this.restoreStack(this.stack)

    const compiler = new Compiler()
    let output = ''
    let error: string | null = null

    output = compiler.compile(this.currentScope)

    /* try {
    } catch (err) {
      error = err + ''
    }*/

    if (error) throw new Error(error)

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
