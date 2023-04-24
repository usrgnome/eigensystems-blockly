import * as Blockly from 'blockly'
import {javascriptGenerator} from 'blockly/javascript';

export const qasmGenerator: any = javascriptGenerator;//new Blockly.Generator('QASM')

qasmGenerator.PRECEDENCE = 0

qasmGenerator['test_input'] = function (block: Blockly.Block) {
  const code = block.getFieldValue('DROP')
  console.log(code)
  return 'test'
}

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

import {
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
  n_bit_toffoli,
  QasmNode
} from './qasmGenerator'
import { QasmBlockCollection } from './generatorCollection.js'

let blocks: QasmNode[] = []

export function useCollection (collection: QasmBlockCollection) {
  blocks = collection.blocks
}

qasmGenerator['test_addition'] = function (block: any) {
  var value_x = qasmGenerator.valueToCode(block, 'X', ORDER.ATOMIC)
  var value_y = qasmGenerator.valueToCode(block, 'Y', ORDER.ATOMIC)
  // TODO: Assemble JavaScript into code variable.
  var code = value_x + ' + ' + value_y
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, qasmGenerator.ORDER_NONE]
}

qasmGenerator['param_input'] = function (block: any) {
  var text__paraminput = block.getFieldValue(' ParamInput')
  // TODO: Assemble JavaScript into code variable.
  var code = text__paraminput
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, ORDER.ATOMIC]
}

qasmGenerator['test_one'] = function (block: any) {
  var text_num = block.getFieldValue('NUM')
  // TODO: Assemble JavaScript into code variable.
  var code = text_num
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, ORDER.ATOMIC]
}

qasmGenerator['test_input'] = function (block: any) {
  var dropdown_drop = block.getFieldValue('DROP')
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_drop
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, ORDER.ATOMIC]
}

qasmGenerator['test_x_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'x',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  // console.log(blocks)
  // console.log(generate_QASM(blocks, value_qubit))
  return 'X'
}

qasmGenerator['test_y_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'y',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  // console.log(blocks)
  // console.log(generate_QASM(blocks, value_qubit))
  return 'Y'
}

qasmGenerator['test_z_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'z',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  // console.log(blocks)
  // console.log(generate_QASM(blocks, value_qubit))
  return 'Z'
}

qasmGenerator['test_hadamard_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'h',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  // console.log(blocks)
  // console.log(generate_QASM(blocks, value_qubit))
  return 'H'
}

qasmGenerator['u3_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_param_2 = qasmGenerator.valueToCode(block, 'Param 2', ORDER.ATOMIC)
  var value_param_3 = qasmGenerator.valueToCode(block, 'Param 3', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'u3',
    Math.random,
    [parseInt(value_param_1), parseInt(value_param_2), parseInt(value_param_3)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'U3'
}

qasmGenerator['u2_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_param_2 = qasmGenerator.valueToCode(block, 'Param 2', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'u2',
    Math.random,
    [parseInt(value_param_1), parseInt(value_param_2)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'U2'
}

qasmGenerator['u1_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'u1',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'U1'
}

qasmGenerator['cx_gate'] = function (block: any) {
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'cx',
    Math.random,
    [],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CX'
}

qasmGenerator['id_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'id',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'ID'
}

qasmGenerator['s_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    's',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'S'
}

qasmGenerator['sdg_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'sdg',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'SDG'
}

qasmGenerator['t_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    't',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'T'
}

qasmGenerator['tdg_gate'] = function (block: any) {
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'tdg',
    Math.random,
    [],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'TDG'
}

qasmGenerator['rx_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'rx',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'RX'
}

qasmGenerator['ry_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'ry',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'RY'
}

qasmGenerator['rz_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit = qasmGenerator.valueToCode(block, 'Qubit', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'rz',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit)]
  )
  blocks.push(gate)
  return 'RZ'
}

qasmGenerator['cz_gate'] = function (block: any) {
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'cz',
    Math.random,
    [],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CZ'
}

qasmGenerator['cy_gate'] = function (block: any) {
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'cy',
    Math.random,
    [],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CY'
}

qasmGenerator['ch_gate'] = function (block: any) {
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'ch',
    Math.random,
    [],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CH'
}

qasmGenerator['crz_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'crz',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CRZ'
}

qasmGenerator['cu1_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'cu1',
    Math.random,
    [parseInt(value_param_1)],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CU1'
}

qasmGenerator['cu3_gate'] = function (block: any) {
  var value_param_1 = qasmGenerator.valueToCode(block, 'Param 1', ORDER.ATOMIC)
  var value_param_2 = qasmGenerator.valueToCode(block, 'Param 2', ORDER.ATOMIC)
  var value_param_3 = qasmGenerator.valueToCode(block, 'Param 3', ORDER.ATOMIC)
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit-1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit-2', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'cu3',
    Math.random,
    [parseInt(value_param_1), parseInt(value_param_2), parseInt(value_param_3)],
    [parseInt(value_qubit_1), parseInt(value_qubit_2)]
  )
  blocks.push(gate)
  return 'CU3'
}

qasmGenerator['ccx_gate'] = function (block: any) {
  var value_qubit_1 = qasmGenerator.valueToCode(block, 'Qubit_1', ORDER.ATOMIC)
  var value_qubit_2 = qasmGenerator.valueToCode(block, 'Qubit_2', ORDER.ATOMIC)
  var value_qubit_3 = qasmGenerator.valueToCode(block, 'Qubit_3', ORDER.ATOMIC)
  var gate = new built_in_gate_block(
    'ccx',
    Math.random,
    [0],
    [parseInt(value_qubit_1), parseInt(value_qubit_2), parseInt(value_qubit_3)]
  )
  blocks.push(gate)
  return 'CCX'
}

qasmGenerator['var_gate'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var text_input = block.getFieldValue('INPUT')
  var dropdown_type = block.getFieldValue('TYPE')
  var gate = new var_def_block(
    text_name,
    Math.random,
    dropdown_type,
    text_input
  )
  blocks.push(gate)
  return 'VAR'
}

qasmGenerator['var_ref_gate'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var gate = new var_ref_block(text_name, Math.random)
  blocks.push(gate)
  return 'REF'
}

qasmGenerator['assignment_block'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var value_lhs = qasmGenerator.valueToCode(block, 'lhs', ORDER.ATOMIC)
  var value_rhs = qasmGenerator.valueToCode(block, 'rhs', ORDER.ATOMIC)
  var gate = new var_assignment_block(
    text_name,
    Math.random,
    value_lhs,
    value_rhs
  )
  blocks.push(gate)
  return 'ASS'
}

qasmGenerator['expression_block'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var value_lhs = qasmGenerator.valueToCode(block, 'lhs', ORDER.ATOMIC)
  var dropdown_operator = block.getFieldValue('OPERATOR')
  var value_rhs = qasmGenerator.valueToCode(block, 'rhs', ORDER.ATOMIC)
  var gate = new var_assignment_block(
    text_name,
    Math.random,
    dropdown_operator,
    [value_lhs, value_rhs]
  )
  blocks.push(gate)
  return 'EXP'
}

qasmGenerator['measurement_gate_true'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var text_qubit = block.getFieldValue('QUBIT')
  var gate = new measurement_block(text_name, Math.random, text_qubit, true)
  blocks.push(gate)
  return 'MET'
}

qasmGenerator['measurement_gate_true'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var dropdown_name = block.getFieldValue('NAME')
  var text_qubit = block.getFieldValue('QUBIT')
  var gate = new measurement_block(
    text_name,
    Math.random,
    text_qubit,
    dropdown_name
  )
  blocks.push(gate)
  return 'MES'
}

qasmGenerator['if_block'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var value_value = qasmGenerator.valueToCode(block, 'VALUE', ORDER.ATOMIC)
  var value_gate = qasmGenerator.valueToCode(block, 'GATE', ORDER.ATOMIC)
  var gate = new if_block(text_name, Math.random, value_value, value_gate)
  blocks.push(gate)
  return 'IF'
}

qasmGenerator['loop_block'] = function (block: any) {
  var value_num = qasmGenerator.valueToCode(block, 'NUM', ORDER.ATOMIC)

  // this is the position of blocks that should be added into the loop instead of the blocks array
  let loop_start = blocks.length
  qasmGenerator.statementToCode(block, 'Blocks')
  // saves the blocks to loop body, then removes the blocks from the end of the blocks array by changing the length
  let loop_body = blocks.slice(loop_start)
  blocks.length = loop_start

  var gate = new loop_block('', Math.random, parseInt(value_num), loop_body)
  blocks.push(gate)
  return 'LOOP'
}

qasmGenerator['custom_function_def'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  const fn_body: QasmNode[] = [];
  const old_blocks = blocks;
  blocks = fn_body;
  qasmGenerator.statementToCode(block, 'Blocks')
  var gate = new custom_function_def(text_name, Math.random, {}, {}, fn_body)
  blocks = old_blocks;
  blocks.push(gate)
  return 'FUNDEF'
}

qasmGenerator['custom_function_ref'] = function (block: any) {
  var text_name = block.getFieldValue('NAME')
  var gate = new custom_function_ref(text_name, Math.random, {}, {})
  blocks.push(gate)
  return 'FUNREF'
}

qasmGenerator['n_bit_toffoli_to_qasm'] = function (block: any) {
  var value_control_quibit = qasmGenerator.valueToCode(
    block,
    'CONTROL_QUIBIT',
    ORDER.ATOMIC
  )
  var value_anticontrol_qubit = qasmGenerator.valueToCode(
    block,
    'ANTICONTROL_QUBIT',
    ORDER.ATOMIC
  )
  var value_target_qubit = qasmGenerator.valueToCode(
    block,
    'TARGET_QUBIT',
    ORDER.ATOMIC
  )
  var gate = new n_bit_toffoli(
    '',
    Math.random,
    value_control_quibit,
    value_anticontrol_qubit,
    value_target_qubit
  )
  blocks.push(gate)
  return 'TOF'
}
