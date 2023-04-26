import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'
import {
  built_in_gate_block,
  var_def_block,
  var_ref_block,
  var_assignment_block,
  measurement_block,
  if_block,
  loop_block,
  custom_function_def,
  custom_function_ref,
  n_bit_toffoli,
  QasmNode
} from './qasmGenerator'

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

/*
 * {DESCRIPTION} contains methods to convert blockly to intermediate QASM nodes
 */
export class QASMBlocklyGenerator {
  qasmGenerator: any = javascriptGenerator //new Blockly.Generator('QASM')
  blocks: QasmNode[] = []

  constructor () {
    this.qasmGenerator.PRECEDENCE = 0

    // attach methods for converting blockly to qasm
    this.qasmGenerator['test_input'] = this.test_input.bind(this)
    this.qasmGenerator['test_addition'] = this.test_addition.bind(this)
    this.qasmGenerator['param_input'] = this.param_input.bind(this)
    this.qasmGenerator['test_one'] = this.test_one.bind(this)
    this.qasmGenerator['test_x_gate'] = this.test_x_gate.bind(this)
    this.qasmGenerator['test_y_gate'] = this.test_y_gate.bind(this)
    this.qasmGenerator['test_z_gate'] = this.test_z_gate.bind(this)
    this.qasmGenerator['test_hadamard_gate'] = this.test_hadamard_gate.bind(this)
    this.qasmGenerator['u3_gate'] = this.u3_gate.bind(this)
    this.qasmGenerator['u2_gate'] = this.u2_gate.bind(this)
    this.qasmGenerator['u1_gate'] = this.u1_gate.bind(this)
    this.qasmGenerator['cx_gate'] = this.cx_gate.bind(this)
    this.qasmGenerator['id_gate'] = this.id_gate.bind(this)
    this.qasmGenerator['s_gate'] = this.s_gate.bind(this)
    this.qasmGenerator['sdg_gate'] = this.sdg_gate.bind(this)
    this.qasmGenerator['t_gate'] = this.t_gate.bind(this)
    this.qasmGenerator['tdg_gate'] = this.tdg_gate.bind(this)
    this.qasmGenerator['rx_gate'] = this.rx_gate.bind(this)
    this.qasmGenerator['ry_gate'] = this.ry_gate.bind(this)
    this.qasmGenerator['rz_gate'] = this.rz_gate.bind(this)
    this.qasmGenerator['cz_gate'] = this.cz_gate.bind(this)
    this.qasmGenerator['cy_gate'] = this.cy_gate.bind(this)
    this.qasmGenerator['ch_gate'] = this.ch_gate.bind(this)
    this.qasmGenerator['crz_gate'] = this.crz_gate.bind(this)
    this.qasmGenerator['cu1_gate'] = this.cu1_gate.bind(this)
    this.qasmGenerator['cu3_gate'] = this.cu3_gate.bind(this)
    this.qasmGenerator['ccx_gate'] = this.ccx_gate.bind(this)
    this.qasmGenerator['var_gate'] = this.var_gate.bind(this)
    this.qasmGenerator['var_ref_gate'] = this.var_ref_gate.bind(this)
    this.qasmGenerator['assignment_block'] = this.assignment_block.bind(this)
    this.qasmGenerator['expression_block'] = this.expression_block.bind(this)
    this.qasmGenerator['measurement_gate_true'] = this.measurement_gate_true.bind(this)
    this.qasmGenerator['if_block'] = this.if_block.bind(this)
    this.qasmGenerator['loop_block'] = this.loop_block.bind(this)
    this.qasmGenerator['custom_function_def'] = this.custom_function_def.bind(this)
    this.qasmGenerator['custom_function_ref'] = this.custom_function_ref.bind(this)
    this.qasmGenerator['n_bit_toffoli_to_qasm'] = this.n_bit_toffoli_to_qasm.bind(this)
  }

  test_addition (block: Blockly.Block) {
    var value_x = this.qasmGenerator.valueToCode(block, 'X', ORDER.ATOMIC)
    var value_y = this.qasmGenerator.valueToCode(block, 'Y', ORDER.ATOMIC)
    // TODO: Assemble JavaScript into code variable.
    var code = value_x + ' + ' + value_y
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, this.qasmGenerator.ORDER_NONE]
  }

  param_input (block: Blockly.Block) {
    var text__paraminput = block.getFieldValue(' ParamInput')
    // TODO: Assemble JavaScript into code variable.
    var code = text__paraminput
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, ORDER.ATOMIC]
  }

  test_one (block: Blockly.Block) {
    var text_num = block.getFieldValue('NUM')
    var code = text_num
    return [code, ORDER.ATOMIC]
  }

  test_input (block: Blockly.Block) {
    var dropdown_drop = block.getFieldValue('DROP')
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_drop
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, ORDER.ATOMIC]
  }

  test_x_gate (block: Blockly.Block) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'x',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'X'
  }

  test_y_gate (block: Blockly.Block) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'y',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'Y'
  }

  test_z_gate (block: Blockly.Block) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'z',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'Z'
  }

  test_hadamard_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'h',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    // console.log(blocks)
    // console.log(generate_QASM(blocks, value_qubit))
    return 'H'
  }

  u3_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_param_2 = this.qasmGenerator.valueToCode(
      block,
      'Param 2',
      ORDER.ATOMIC
    )
    var value_param_3 = this.qasmGenerator.valueToCode(
      block,
      'Param 3',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'u3',
      Math.random,
      [
        parseInt(value_param_1),
        parseInt(value_param_2),
        parseInt(value_param_3)
      ],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'U3'
  }

  u2_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_param_2 = this.qasmGenerator.valueToCode(
      block,
      'Param 2',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'u2',
      Math.random,
      [parseInt(value_param_1), parseInt(value_param_2)],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'U2'
  }

  u1_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'u1',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'U1'
  }

  cx_gate (block: any) {
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'cx',
      Math.random,
      [],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CX'
  }

  id_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'id',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'ID'
  }

  s_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      's',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'S'
  }

  sdg_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'sdg',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'SDG'
  }

  t_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      't',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'T'
  }

  tdg_gate (block: any) {
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'tdg',
      Math.random,
      [],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'TDG'
  }

  rx_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'rx',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'RX'
  }

  ry_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'ry',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'RY'
  }

  rz_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit = this.qasmGenerator.valueToCode(
      block,
      'Qubit',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'rz',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit)]
    )
    this.blocks.push(gate)
    return 'RZ'
  }

  cz_gate (block: any) {
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'cz',
      Math.random,
      [],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CZ'
  }

  cy_gate (block: any) {
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'cy',
      Math.random,
      [],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CY'
  }

  ch_gate (block: any) {
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'ch',
      Math.random,
      [],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CH'
  }

  crz_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'crz',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CRZ'
  }

  cu1_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'cu1',
      Math.random,
      [parseInt(value_param_1)],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CU1'
  }

  cu3_gate (block: any) {
    var value_param_1 = this.qasmGenerator.valueToCode(
      block,
      'Param 1',
      ORDER.ATOMIC
    )
    var value_param_2 = this.qasmGenerator.valueToCode(
      block,
      'Param 2',
      ORDER.ATOMIC
    )
    var value_param_3 = this.qasmGenerator.valueToCode(
      block,
      'Param 3',
      ORDER.ATOMIC
    )
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit-2',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'cu3',
      Math.random,
      [
        parseInt(value_param_1),
        parseInt(value_param_2),
        parseInt(value_param_3)
      ],
      [parseInt(value_qubit_1), parseInt(value_qubit_2)]
    )
    this.blocks.push(gate)
    return 'CU3'
  }

  ccx_gate (block: any) {
    var value_qubit_1 = this.qasmGenerator.valueToCode(
      block,
      'Qubit_1',
      ORDER.ATOMIC
    )
    var value_qubit_2 = this.qasmGenerator.valueToCode(
      block,
      'Qubit_2',
      ORDER.ATOMIC
    )
    var value_qubit_3 = this.qasmGenerator.valueToCode(
      block,
      'Qubit_3',
      ORDER.ATOMIC
    )
    var gate = new built_in_gate_block(
      'ccx',
      Math.random,
      [0],
      [
        parseInt(value_qubit_1),
        parseInt(value_qubit_2),
        parseInt(value_qubit_3)
      ]
    )
    this.blocks.push(gate)
    return 'CCX'
  }

  var_gate (block: any) {
    var text_name = block.getFieldValue('NAME')
    var text_input = block.getFieldValue('INPUT')
    var dropdown_type = block.getFieldValue('TYPE')
    var gate = new var_def_block(
      text_name,
      Math.random,
      dropdown_type,
      text_input
    )
    this.blocks.push(gate)
    return 'VAR'
  }

  var_ref_gate (block: any) {
    var text_name = block.getFieldValue('NAME')
    var gate = new var_ref_block(text_name, Math.random)
    this.blocks.push(gate)
    return 'REF'
  }

  assignment_block (block: any) {
    var text_name = block.getFieldValue('NAME')
    var value_lhs = this.qasmGenerator.valueToCode(block, 'lhs', ORDER.ATOMIC)
    var value_rhs = this.qasmGenerator.valueToCode(block, 'rhs', ORDER.ATOMIC)
    var gate = new var_assignment_block(
      text_name,
      Math.random,
      value_lhs,
      value_rhs
    )
    this.blocks.push(gate)
    return 'ASS'
  }

  expression_block (block: any) {
    var text_name = block.getFieldValue('NAME')
    var value_lhs = this.qasmGenerator.valueToCode(block, 'lhs', ORDER.ATOMIC)
    var dropdown_operator = block.getFieldValue('OPERATOR')
    var value_rhs = this.qasmGenerator.valueToCode(block, 'rhs', ORDER.ATOMIC)
    var gate = new var_assignment_block(
      text_name,
      Math.random,
      dropdown_operator,
      [value_lhs, value_rhs]
    )
    this.blocks.push(gate)
    return 'EXP'
  }

  /*measurement_gate_true (block: any) {
    var text_name = block.getFieldValue('NAME')
    var text_qubit = block.getFieldValue('QUBIT')
    var gate = new measurement_block(text_name, Math.random, text_qubit, true)
    blocks.push(gate)
    return 'MET'
  }*/

  measurement_gate_true (block: any) {
    var text_name = block.getFieldValue('NAME')
    var dropdown_name = block.getFieldValue('NAME')
    var text_qubit = block.getFieldValue('QUBIT')
    var gate = new measurement_block(
      text_name,
      Math.random,
      text_qubit,
      dropdown_name
    )
    this.blocks.push(gate)
    return 'MES'
  }

  if_block (block: any) {
    var text_name = block.getFieldValue('NAME')
    var value_value = this.qasmGenerator.valueToCode(
      block,
      'VALUE',
      ORDER.ATOMIC
    )
    var value_gate = this.qasmGenerator.valueToCode(block, 'GATE', ORDER.ATOMIC)
    var gate = new if_block(text_name, Math.random, value_value, value_gate)
    this.blocks.push(gate)
    return 'IF'
  }

  loop_block (block: any) {
    var value_num = this.qasmGenerator.valueToCode(block, 'NUM', ORDER.ATOMIC)

    // this is the position of blocks that should be added into the loop instead of the blocks array
    let loop_start = this.blocks.length
    this.qasmGenerator.statementToCode(block, 'Blocks')
    // saves the blocks to loop body, then removes the blocks from the end of the blocks array by changing the length
    let loop_body = this.blocks.slice(loop_start)
    this.blocks.length = loop_start

    var gate = new loop_block('', Math.random, parseInt(value_num), loop_body)
    this.blocks.push(gate)
    return 'LOOP'
  }

  custom_function_def (block: any) {
    var text_name = block.getFieldValue('NAME')
    const fn_body: QasmNode[] = []
    const old_blocks = this.blocks
    this.blocks = fn_body
    this.qasmGenerator.statementToCode(block, 'Blocks')
    var gate = new custom_function_def(text_name, Math.random, {}, {}, fn_body)
    this.blocks = old_blocks
    this.blocks.push(gate)
    return 'FUNDEF'
  }

  custom_function_ref (block: any) {
    var text_name = block.getFieldValue('NAME')
    var gate = new custom_function_ref(text_name, Math.random, {}, {})
    this.blocks.push(gate)
    return 'FUNREF'
  }

  n_bit_toffoli_to_qasm (block: any) {
    var value_control_quibit = this.qasmGenerator.valueToCode(
      block,
      'CONTROL_QUIBIT',
      ORDER.ATOMIC
    )
    var value_anticontrol_qubit = this.qasmGenerator.valueToCode(
      block,
      'ANTICONTROL_QUBIT',
      ORDER.ATOMIC
    )
    var value_target_qubit = this.qasmGenerator.valueToCode(
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
    this.blocks.push(gate)
    return 'TOF'
  }
}
