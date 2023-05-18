console.log('#########')

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
  FUNCDEF = 9
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

class Scope {
  topLevel: ScopeNode
  variables: { [key: string]: number } = {}
  funcs: { [key: string]: FuncDefNode } = {}
  depth: number = 0

  constructor (
    scope: ScopeNode,
    vars?: { [key: string]: number },
    funcs?: { [key: string]: FuncDefNode }
  ) {
    this.topLevel = scope
    if (vars) this.variables = vars
    if (funcs) this.funcs = funcs
  }

  getChildScope (scope: ScopeNode) {
    const childScope = new Scope(scope, this.variables, this.funcs)
    childScope.depth = this.depth + 1
    return childScope
  }

  private getValueFromLiteralOrRef (node: LiteralNode): number {
    if (node.type === NodeType.LITERAL) {
      return node.getValue()
    } else {
      const ref = node as ReferenceNode
      const val = this.variables[ref.getName()]
      return val
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
        this.funcs[fn.getName()] = fn
        console.log(this.funcs);
        return [`# DEF FUNC ${fn.getName()}`]
      }
      case NodeType.LITERAL: {
        let lit = node as LiteralNode
        return [lit.getValue().toString()]
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
        console.log(fn)
        let fnDef = this.funcs[fn.getName()]
        console.log(fnDef, this.funcs)
        const childScope = this.getChildScope(fnDef.scope)
        return [`# CALL ${fn.getName()}`, ...childScope.compile()]
      }
      case NodeType.INC: {
        let inc = node as IncrementNode

        const varName = inc.variable.getName()
        const incValue = this.getValueFromLiteralOrRef(inc.incValue)
        this.variables[inc.variable.getName()] += incValue
        return [`# INC ${varName} BY ${incValue}`]
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
    for (let i = 0; i < this.topLevel.nodes.length; i++) {
      let node = this.topLevel.nodes[i]

      let ret = this.compileNode(node)
      if (ret.length > 0) str.push(...ret)
    }

    for (let i = 0; i < str.length; i++) {
      let space = ''
      for (let s = 0; s < this.depth * 2; s++) {
        space += ' '
      }
      str[i] = space + str[i]
    }
    return str
  }
}

class Compiler {
  compile (scope: ScopeNode) {
    const topScope = new Scope(scope)
    return topScope.compile().join('\n')
  }
}

{
  /*
DEFINE X AS 10
DEFINE Y AS 0

REPEAT {
    INCREMENT Y BY 1
    PRINT Y
} X TIMES
*/

  const scope = new ScopeNode()

  // DEFINE X AS 10
  const defX = new DefineNode('X', new LiteralNode(10))
  scope.add(defX)

  // DEFINE Y AS 0
  const defY = new DefineNode('Y', new LiteralNode(0))
  scope.add(defY)

  // REPEAT
  // create the repeat body first
  const loopScope = new ScopeNode()

  // INCREMENT Y BY 1
  const inc = new IncrementNode(new ReferenceNode('Y'), new LiteralNode(1))
  loopScope.add(inc)

  // PRINT Y
  const prN = new PrintNode(new ReferenceNode('Y'))
  loopScope.add(prN)

  const repeat = new RepeatNode(loopScope, new ReferenceNode('X'))
  scope.add(repeat)

  // compile

  const compiler = new Compiler()
  console.log(compiler.compile(scope))

  console.log('#########')
}

{
  /*
  DEFINE X AS 4
  DEFINE Y AS 0
  DEFINE Z as 0
  
  FUNC TESTFUN {
    PRINT Z
  }

  REPEAT {
      INCREMENT Y BY 1
      REPEAT {
        INCREMENT Z BY 2
        TESTFUN();
      } Y TIMES
  } X TIMES
  */

  const scope = new ScopeNode()

  // DEFINE X AS 10
  const defX = new DefineNode('X', new LiteralNode(4))
  scope.add(defX)

  // DEFINE Y AS 0
  const defY = new DefineNode('Y', new LiteralNode(0))
  scope.add(defY)

  // DEFINE Z AS 0
  const defZ = new DefineNode('Z', new LiteralNode(0))
  scope.add(defZ)

  // FUNC TESTFUN
  const func = new FuncDefNode('TESTFUN')
  scope.add(func);

  // PRINT Z
  const prN = new PrintNode(new ReferenceNode('Z'))
  func.scope.add(prN)

  // REPEAT
  // create the repeat body first
  const loopScope = new ScopeNode()

  // INCREMENT Y BY 1
  const inc = new IncrementNode(new ReferenceNode('Y'), new LiteralNode(1))
  loopScope.add(inc)

  // 2nd level repeat
  const loop2Scope = new ScopeNode()

  // INCREMENT Z BY 2
  const incZ = new IncrementNode(new ReferenceNode('Z'), new LiteralNode(2))
  loop2Scope.add(incZ)

  // CALL TESTFUN
  const funcCall = new FuncRefNode('TESTFUN')
  loop2Scope.add(funcCall)

  const repeatInner = new RepeatNode(loop2Scope, new ReferenceNode('Y'))
  loopScope.add(repeatInner)

  const repeat = new RepeatNode(loopScope, new ReferenceNode('X'))
  scope.add(repeat)

  // compile

  const compiler = new Compiler()
  console.log(compiler.compile(scope))

  console.log('#########')
}
