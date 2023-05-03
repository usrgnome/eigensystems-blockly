// variables - list, can refer to qubits, classical bits or angles - ints, qubits or angles
// control block, will conditionally execute a gate based off the state of other qubits, cannot be the same ones
// measurement block - measures a number of qubits, records the result in a classical bit for each qubit
// custom blocks/gates - takes a list of qubits and a list of gates, does some operations on them

import { QasmBlockly } from "./generatorCollection"

const built_in_gates = {
  h: {
    gate_name: 'Hadamard',
    num_parameters: 0, //parameters that would be inside brackets e.g u(pi)
    num_qubit_operands: 1, //num of qubits that the block operates on
    QASM_symbol: 'h'
  },
  u3: {
    gate_name: '',
    num_parameters: 3,
    num_qubit_operands: 1,
    QASM_symbol: 'u3'
  },
  u2: {
    gate_name: '',
    num_parameters: 2,
    num_qubit_operands: 1,
    QASM_symbol: 'u2'
  },
  u1: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 1,
    QASM_symbol: 'u1'
  },
  cx: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 2,
    QASM_symbol: 'cx'
  },
  id: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'id'
  },
  x: {
    gate_name: 'Not',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'x'
  },
  y: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'y'
  },
  z: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'z'
  },
  s: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 's'
  },
  sdg: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'sdg'
  },
  t: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 't'
  },
  tdg: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 1,
    QASM_symbol: 'tdg'
  },
  rx: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 1,
    QASM_symbol: 'rx'
  },
  ry: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 1,
    QASM_symbol: 'ry'
  },
  rz: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 1,
    QASM_symbol: 'rz'
  },
  cz: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 2,
    QASM_symbol: 'cz'
  },
  cy: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 2,
    QASM_symbol: 'cy'
  },
  ch: {
    gate_name: 'controlled-H',
    num_parameters: 0,
    num_qubit_operands: 2,
    QASM_symbol: 'ch'
  },
  ccx: {
    gate_name: '',
    num_parameters: 0,
    num_qubit_operands: 3,
    QASM_symbol: 'ccx'
  },
  crz: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 2,
    QASM_symbol: 'crz'
  },
  cu1: {
    gate_name: '',
    num_parameters: 1,
    num_qubit_operands: 2,
    QASM_symbol: 'cu1'
  },
  cu3: {
    gate_name: '',
    num_parameters: 3,
    num_qubit_operands: 2,
    QASM_symbol: 'cu3'
  }
}

const var_types = {
  int: 'integer',
  int_list: 'integer_list',
  angle: 'angle',
  angle_list: 'angle_list'
}

const block_types = {
  built_in_gate: 'built_in_gate',
  variable_def: 'variable_def',
  variable_ref: 'variable_ref',
  var_assignment: 'var_assignment',
  measurement: 'measurement',
  expression: 'expression',
  if: 'if',
  loop: 'loop',
  custom_function_def: 'custom_function_def',
  custom_function_ref: 'custom_function_ref',
  n_bit_toffoli: 'n_bit_toffoli'
}

export class QasmNode {}

export class block extends QasmNode {
  constructor (block_name, block_id) {
    super()
    this.block_name = block_name
    this.block_id = block_id
  }
}

class built_in_gate_block extends block {
  constructor (block_name, block_id, parameters, qubit_operands) {
    super(block_name, block_id)
    this.parameters = parameters
    this.qubit_operands = qubit_operands
    this.block_type = block_types.built_in_gate
  }
}

// variable can be either a list or a single value
// if var_type is "angle_list" or "integer_list", it must be an array
// if var_type is "angle" or "integer", it must be a single value
class var_def_block extends block {
  constructor (block_name, block_id, var_type, value = 0) {
    super(block_name, block_id)
    this.var_type = var_type
    this.value = value
    this.block_type = block_types.variable_def
  }
}

// refers to a variable that's already defined
class var_ref_block extends block {
  constructor (block_name, block_id) {
    super(block_name, block_id)
    this.block_type = block_types.variable_ref
  }
}

// an operation that modifies the value of a variable
// lhs is the left hand side of the assignment, a variable reference
// rhs is the right hand side of the equation, evaluates to a value
class var_assignment_block extends block {
  constructor (block_name, block_id, lhs, rhs) {
    super(block_name, block_id)
    this.lhs = lhs // should be a variable reference
    this.rhs = rhs // should evaluate to a value of the same type as lhs
    this.block_type = block_types.var_assignment
  }
}

// a measurement on qubits that gets saved into cregs
class measurement_block extends block {
  constructor (block_name, block_id, qubit_operands, measure_all = false) {
    super(block_name, block_id)
    this.qubit_operands = qubit_operands
    this.measure_all = measure_all
    this.block_type = block_types.measurement
  }
}

// operator: a string, e.g "+", "-",
// operands: 2 values, var_ref_blocks, or expression_blocks that the operator will act on
// operands should refer/evaluate to the same type
// this is expected to be used in the right hand side of an assignment block
class expression_block extends block {
  constructor (block_name, block_id, operator, operands) {
    super(block_name, block_id)
    this.operator = operator
    this.operands = operands
    this.block_type = block_types.expression
  }
}

// values is an array containing the value to compare the if  astatementgainst
// multiple values may be supported in the future
// gate is the gate block to be executed if the condition is true
// multiple gates may be supported in the future
class if_block extends block {
  constructor (block_name, block_id, values, gate) {
    super(block_name, block_id)
    this.values = values
    this.gate = gate
    this.block_type = block_types.if
  }
}

class loop_block extends block {
  constructor (block_name, block_id, num_loops, blocks) {
    super(block_name, block_id)
    this.num_loops = num_loops
    this.blocks = blocks
    this.block_type = block_types.loop
  }
}

// currently params and operands do nothing and everything must exist hardcoded within the blocks
class custom_function_def extends block {
  constructor (block_name, block_id, num_params, num_operands, blocks) {
    super(block_name, block_id)
    this.num_params = num_params
    this.num_operands = num_operands
    this.blocks = blocks
    this.block_type = block_types.custom_function_def
  }
}

// currently params and operands do nothing
class custom_function_ref extends block {
  constructor (block_name, block_id, params, operands) {
    super(block_name, block_id)
    this.params = params
    this.operands = operands
    this.block_type = block_types.custom_function_ref
  }
}

// controls is an array of controls
// anticontrols is an array of anticontrols
// target is a single qubit value
class n_bit_toffoli extends block {
  constructor (block_name, block_id, controls, anticontrols, target) {
    super(block_name, block_id)
    this.controls = controls
    this.anticontrols = anticontrols
    this.target = target
    this.block_type = block_types.n_bit_toffoli
  }
}

const error_types = {
  // gate errors
  invalid_gate: 'gate does not exist',
  invalid_params_len:
    'number of parameters does not match expected of parameters',
  invalid_operands_len:
    'number of parameters does not match expected of parameters',
  invalid_param: 'parameter is not valid',
  invalid_operand: 'operand is not valid',
  duplicate_operands: 'duplicate operands',

  duplicate_var_defs: 'variable is defined more than once',
  duplicate_fun_defs: 'function is defined more than once',

  unsupported_operator: 'operator is not supported',

  unsupported_block: 'block is not supported, or has wrong type',

  invalid_if:
    'if block is not valid, check that the value is an integer greater than 0',
  invalid_loop: 'loop block is not valid, check that loop count is an integer'
}

var errors = []

/*
 * Takes 2 parameters, blocks representing the code, and the number of qubits in the circuit
 * blocks are objects with the following properties:
 * block_name - a string containing the name of the block
 * block_type - a string containing the type of the block
 * parameters - an array of numbers, to be the parameters of the gate, e.g cu3(parameter1, parameter2, parameter3)
 * qubit_operands - an array of numbers, representing the qubits that the block operates on, in order.
 */
function generate_QASM (collection) {
    const blocks = collection.getBlocks();
  // puts all the variables into this object, with names as the keys.
  // checks for duplicates
  // TODO: possibly check variable dependancies for cycles
  let variables = preprocess_variables(blocks)

  // clears errors from previous calls
  errors = []

  // puts references to functions into functions block, with names as the keys
  let functions = preprocess_functions(blocks)
  console.log(variables)

  // first value is the qubits in q, the qubits being operated on
  // second value is the qubits in anc, an ancilla qreg
  let num_qubits = [-1, -1]

  let qasm = [['OPENQASM 2.0;\ninclude "qelib1.inc";\n']]
  qasm.push(['qreg q[']) // these will be filled in later with the max value of qubits
  qasm.push(['creg c['])
  qasm.push(['qreg anc['])

  // goes over each block, adding their respective qasm to the qasm array
  // 1 is added to num_qubits because it is set to the value of the highest qubit operand but is 0 indexed

  process_blocks(qasm, blocks, variables, num_qubits, functions)
  num_qubits[0] += 1
  num_qubits[1] += 1

  qasm[1][0] += `${num_qubits[0]}];\n`
  qasm[2][0] += `${num_qubits[0]}];\n`
  qasm[3][0] += `${num_qubits[1]}];\n`
  return { qasm, errors }
}

/*
 * qasm is an array that the qasm will be pushed to, each line being an array with a qasm string and block id
 * blocks is the blocks to be processed
 * variables is a list of key/value pairs that give all the variables their values
 * returns the number of qubits (the highest number found inside the blocks as a qubit operand after processing)
 * type restrictions restrict the valid types that the blocks can be
 */
function process_blocks (
  qasm,
  blocks,
  variables,
  num_qubits,
  functions,
  type_restrictions = {}
) {
  for (let i = 0; i < blocks.length; i++) {
    switch (blocks[i].block_type) {
      case block_types.built_in_gate: {
        let block = expand_built_in_variables(blocks[i], variables)
        if (block.block_name in built_in_gates) {
          if (is_valid_built_in(block)) {
            num_qubits[0] = Math.max(num_qubits[0], ...block.qubit_operands)
            qasm.push([built_in_gate_to_QASM(block), block.block_id])
          }
        } else {
          errors.push([error_types.invalid_gate, block])
        }
        break
      }
      case block_types.var_assignment: {
        // does the variable assignment described in the block
        variable_assignment(blocks[i], variables)
        // console.log("Variables after this var assignment are");
        // console.log(variables);
        break
      }
      case block_types.measurement: {
        let block = expand_measurement_variables(blocks[i], variables)

        num_qubits[0] = Math.max(num_qubits[0], ...block.qubit_operands)
        qasm.push([measurement_block_to_qasm(block), block.block_id])
        break
      }
      case block_types.if: {
        let block = expand_if_variables(blocks[i], variables)

        if (is_valid_if_block(block)) {
          qasm.push([
            if_block_to_qasm(block, variables, num_qubits),
            block.block_id
          ])
        } else {
          errors.push([error_types.invalid_if, block])
        }
        break
      }
      case block_types.loop: {
        let block = expand_loop_count(blocks[i], variables)

        if (is_valid_loop_block(block)) {
          qasm.push(...loop_block_to_qasm(block, variables, num_qubits))
        } else {
          errors.push([error_types.invalid_loop, block])
        }
        break
      }
      case block_types.custom_function_ref: {
        let block = functions[blocks[i].block_name]
        console.log('functions')
        console.log(functions)

        qasm.push(
          ...custom_function_to_qasm(block, variables, num_qubits, functions)
        )

        break
      }
      case block_types.n_bit_toffoli: {
        qasm.push(...n_bit_toffoli_to_qasm(blocks[i], variables, num_qubits))
      }
      default:
        errors.push([error_types.unsupported_block, blocks[i]])
        break
    }
  }
}

/*
 * Reads the block name, and finds the corresponding built in gate, and converts it into QASM
 * Takes a block as a parameter.
 */
function built_in_gate_to_QASM (block, qreg = 'q') {
  let gate = built_in_gates[block.block_name]

  let gate_qasm = ''

  gate_qasm += gate.QASM_symbol

  // concatenate the parameters, comma separated in brackets.
  if (gate.num_parameters > 0) {
    gate_qasm += '(' + block.parameters.join() + ')'
  }

  // concatenate the operands, comma separated
  if (gate.num_qubit_operands > 0) {
    gate_qasm += ' '
    gate_qasm += block.qubit_operands
      .map(operand => `${qreg}[${operand}]`)
      .join(',')
  }
  gate_qasm += ';\n'

  return gate_qasm
}

/*
 * Checks if a built in block is valid
 * Checks that parameters are between 0 and 2 pi
 * Checks that operands are greater than 0, are integers, and do not repeat
 * Checks that there are the correct number of operands and parameters
 * returns a boolean, true if the built in block is valid, false otherwise
 */
function is_valid_built_in (block) {
  let gate = built_in_gates[block.block_name]

  // check for equality in the number of parameters
  if (gate.num_parameters != block.parameters.length) {
    errors.push([error_types.invalid_params_len, block])
    return false
  }

  if (gate.num_qubit_operands != block.qubit_operands.length) {
    errors.push([error_types.invalid_operands_len, block])
    return false
  }

  // validate the parameters (numbers between 0 and 2 pi)
  for (let parameter of block.parameters) {
    if (!is_valid_param(parameter)) {
      errors.push([error_types.invalid_param, block])
      return false
    }
  }

  // checks for duplicate operand values, values less than 0, non int values
  // an object to put operands in, will be checked for duplicates
  let operands = {}
  for (let i = 0; i < block.qubit_operands.length; i++) {
    if (!is_valid_qubit_operand(block.qubit_operands[i])) {
      errors.push([error_types.invalid_operand, block])
      return false
    }

    if (block.qubit_operands[i] in operands) {
      errors.push([error_types.duplicate_operands, block])
      return false
    } else {
      operands[block.qubit_operands[i]] = true
    }
  }
  return true
}

/*
 * takes the array of blocks, puts all the variables into a new object to allow for easier lookup later
 * also checks for duplicates of variables
 */
function preprocess_variables (blocks) {
  let variables = {}
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].block_type == block_types.variable_def) {
      let var_def_block = blocks[i]

      // check if variable name already exists
      if (var_def_block.block_name in variables) {
        errors.push([error_types.duplicate_var_defs, blocks[i]])
        continue
      }

      // assigns variable to object property, with the name being the key, this will be useful to look up the variable later
      variables[var_def_block.block_name] = {
        block_id: var_def_block.block_id,
        var_type: var_def_block.var_type,
        value: var_def_block.value
      }
    }
    // if variable name in variables, error
  }
  return variables
}

function preprocess_functions (blocks) {
  let functions = {}

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].block_type == block_types.custom_function_def) {
      if (blocks[i].block_name in functions) {
        errors.push([error_types.duplicate_fun_defs, blocks[i]])
        continue
      }

      functions[blocks[i].block_name] = blocks[i]
    }
  }

  console.log('preprocessed_functions')
  console.log(functions)
  return functions
}

/* goes through the blocks parameters and replaces variables with their values
 * returns a copy of the block
 * operates on built in blocks
 * if there are variable references, these are replaced by the value of the variable
 * returns a copy of the block with the variables replaced with numbers
 *
 */
function expand_built_in_variables (block, variables) {
  //creates a copy of the block
  let expanded_block = {}
  copy_block(expanded_block, block)

  if ('qubit_operands' in expanded_block) {
    expand_array_vars(expanded_block.qubit_operands, variables, 'integer')
  } // else
  // {
  //     console.log("error, block is missing attributes");
  // }

  if ('parameters' in expanded_block) {
    expand_array_vars(expanded_block.parameters, variables, 'angle')
  } // else
  // {
  //     console.log("error, block is missing attributes");
  // }

  return expanded_block
}

function variable_assignment (block, variables) {
  console.log('block.lhs')
  console.log(block.lhs)
  console.log(block)
  console.log('variables')
  console.log(variables)

  let expanded_block = {}
  copy_block(expanded_block, block)

  // finds variable with the given name
  let variable = variables[expanded_block.lhs.block_name]

  if (expanded_block.rhs.block_type == block_types.expression) {
    // console.log("expanded_block.rhs.block_type is expression");
    // console.log(expanded_block);
    expanded_block.rhs = evaluate_expression_block(
      expanded_block.rhs,
      variables,
      expanded_block.lhs.var_type
    )
  } else {
    // console.log("expanded_block.rhs.block_type is not expression, it is ");
    // console.log(expanded_block.rhs.block_type);
    // console.log("expanded block");
    // console.log(expanded_block)
  }

  variable.value = expanded_block.rhs
  console.log(variables)
}

function is_valid_param (parameter) {
  if (typeof parameter != 'number') {
    return false
  }

  if (parameter < 0 || parameter > 2 * Math.PI) {
    return false
  }
  return true
}

function is_valid_qubit_operand (qubit_operand) {
  if (qubit_operand < 0 || !Number.isInteger(qubit_operand)) {
    return false
  }

  return true
}

// values array is the array that may contain variables that have a specified type
// variables is an object containing key/value pairs with variables and their values
// var_type is a string, if it is "angle", then "angle" and "angle_list" values will be processed
function expand_array_vars (values_array, variables, var_type) {
  for (let i = 0; i < values_array.length; i++) {
    let value = values_array[i]

    if (value.block_type == block_types.variable_ref) {
      // search for variable with the name found in the variable reference
      console.log(value.block_name)
      let variable = variables[value.block_name]

      // expands the list in-place, then decrements i and restarts the loop at the same index
      if (variable.var_type == var_type + '_list') {
        values_array.splice(i, 1, ...variable.value)
        i--
        continue
      }

      if (variable.value != undefined) {
        values_array[i] = variable.value
      } // else
      // {
      //     console.log("something went wrong with expanding variables");
      // }
    }
  }
}

// takes in a measurement block, and key/values pairs of variables
// returns a copy of the object with variables replaced with constants
function expand_measurement_variables (block, variables) {
  let expanded_block = {}
  copy_block(expanded_block, block)

  if ('qubit_operands' in expanded_block) {
    expand_array_vars(expanded_block.qubit_operands, variables, 'integer')
  } // else
  // {
  //     console.log("block has missing properties");
  // }

  return expanded_block
}

function measurement_block_to_qasm (block) {
  let qasm = ''

  if (block.measure_all) {
    qasm = 'measure q -> c;\n'
  } else {
    qasm += block.qubit_operands
      .map(operand => `measure q[${operand}] -> c[${operand}];\n`)
      .join('')
  }
  return qasm
}

function expand_if_variables (block, variables) {
  let expanded_block = {}

  copy_block(expanded_block, block)

  if ('values' in expanded_block) {
    expand_array_vars(expanded_block.values, variables, 'integer')
  } // else
  // {
  //     console.log("\"if\" block has missing properties");
  // }

  return expanded_block
}

function if_block_to_qasm (block, variables, num_qubits) {
  let gate_qasm = []
  let qasm = ''

  qasm = `if(c==${block.values[0]}) `

  process_blocks(gate_qasm, block.gate, variables, num_qubits, undefined, {
    built_in_gate: true
  })

  qasm += gate_qasm[0][0]

  return qasm
}

function is_valid_if_block (block) {
  if (!Number.isInteger(block.values[0]) || block.values < 0) {
    return false
  }

  return true
}

// recursively evaluates expression blocks, returns a number
function evaluate_expression_block (block, variables, type) {
  let expanded_block = {}
  copy_block(expanded_block, block)

  let lhs = expanded_block.operands[0]
  let rhs = expanded_block.operands[1]

  if (
    lhs.block_type == block_types.variable_ref ||
    rhs.block_type == block_types.variable_ref
  ) {
    expand_array_vars(expanded_block.operands, variables, type)
    lhs = expanded_block.operands[0]
    rhs = expanded_block.operands[1]
  }

  if (lhs.block_type == block_types.expression) {
    lhs = evaluate_expression_block(lhs, variables, type)
  }

  if (rhs.block_type == block_types.expression) {
    rhs = evaluate_expression_block(rhs, variables, type)
  }

  if (typeof lhs == 'number' && typeof rhs == 'number') {
    switch (block.operator) {
      case '+': {
        return lhs + rhs
        break
      }
      case '-': {
        return lhs - rhs
        break
      }
      default: {
        errors.push([error_types.unsupported_operator, block])
      }
    }
  } else {
    // console.log("something went wrong with evaluating expressions");
    // console.log("block is");
    // console.log(block);
  }
}

function expand_loop_count (block, variables) {
  let expanded_block = {}

  copy_block(expanded_block, block)

  if (expanded_block.num_loops.block_type == block_types.expression) {
    expanded_block.num_loops = evaluate_expression_block(
      expanded_block.loop_count,
      variables,
      var_types.int
    )
  } else {
    let num_loops = [expanded_block.num_loops]
    expand_array_vars(num_loops, variables, var_types.int)
    expanded_block.num_loops = num_loops[0]
  }

  return expanded_block
}

/*
 * Performs a deeper copy than object.assign
 * This function is intended to be used before variable references are replaced with their values,
 * to keep the variable reference intact in the original block
 */
function copy_block (target, source_block) {
  Object.assign(target, source_block)

  for (let property in target) {
    if (Array.isArray(target[property])) {
      target[property] = target[property].slice()
    }
  }
}

function loop_block_to_qasm (block, variables, num_qubits, functions) {
  let gate_qasm = []

  for (let i = 0; i < block.num_loops; i++) {
    process_blocks(gate_qasm, block.blocks, variables, num_qubits, functions)
  }

  //push id to the end of each block
  for (let qasm of gate_qasm) {
    qasm.push(block.block_id)
  }
  return gate_qasm
}

function is_valid_loop_block (block) {
  if (!Number.isInteger(block.num_loops) || block.num_loops < 0) {
    return false
  }

  return true
}

function custom_function_to_qasm (block, variables, num_qubits, functions) {
  let gate_qasm = []

  process_blocks(gate_qasm, block.blocks, variables, num_qubits, functions)

  //push id to the end of each block
  console.log('gate_qasm')
  console.log(gate_qasm)
  for (let qasm of gate_qasm) {
    qasm.push(block.block_id)
  }
  return gate_qasm
}

function n_bit_toffoli_to_qasm (block, variables, num_qubits) {
  let qasm = []

  let x_gate = [new built_in_gate_block('x', undefined, [], [])]

  // invert anticontrols
  for (let i = 0; i < block.anticontrols.length; i++) {
    x_gate[0].qubit_operands[0] = block.anticontrols[i]

    process_blocks(qasm, x_gate, variables, num_qubits, undefined)
  }

  let controls = [...block.controls, ...block.anticontrols]
  qasm.push([
    `ccx q[${controls[0]}], q[${controls[1]}], anc[0];\n`,
    block.block_id
  ])

  // ccx gates
  for (let i = 2; i < controls.length; i++) {
    qasm.push([
      `ccx q[${controls[i]}], anc[${i - 2}], anc[${i - 1}];\n`,
      block.block_id
    ])
  }

  num_qubits[1] = Math.max(num_qubits[1], controls.length - 1)

  qasm.push([
    `cx anc[${controls.length - 1}], q[${block.target}];\n`,
    block.block_id
  ])

  // ccx gates
  for (let i = controls.length - 1; i >= 2; i--) {
    qasm.push([
      `ccx q[${controls[i]}], anc[${i - 2}], anc[${i - 1}];\n`,
      block.block_id
    ])
  }

  qasm.push([
    `ccx q[${controls[0]}], q[${controls[1]}], anc[0];\n`,
    block.block_id
  ])

  // invert anticontrols again, to bring them back to normal
  for (let i = 0; i < block.anticontrols.length; i++) {
    x_gate[0].qubit_operands[0] = block.anticontrols[i]

    process_blocks(qasm, x_gate, variables, num_qubits, undefined)
  }

  return qasm
}

export {
  generate_QASM,
  built_in_gate_block,
  var_def_block,
  var_ref_block,
  var_assignment_block,
  measurement_block,
  if_block,
  expression_block,
  loop_block,
  custom_function_def,
  custom_function_ref,
  n_bit_toffoli
}

export default generate_QASM
