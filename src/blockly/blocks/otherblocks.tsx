import Blockly from 'blockly'

export const titles: string[] = []

Blockly.Msg.OTHER_HUE = '#01579b'

const addBlock = (name: string, json: object) => {
  titles.push(name)
  Blockly.Blocks[name] = {
    init: function () {
      this.jsonInit(json)
    }
  }
}

addBlock('measurement_gate_true', {
  type: 'measurement_gate_true',
  message0: 'measure %1[%2] --> %3[%4]',
  args0: [
    {
      type: 'field_dropdown',
      name: 'R0',
      options: [
        ['q', 'q'],
        ['c', 'c']
      ]
    },
    {
      type: 'field_number',
      name: 'I0',
      value: 0
    },
    {
      type: 'field_dropdown',
      name: 'R1',
      options: [
        ['q', 'q'],
        ['c', 'c']
      ]
    },
    {
      type: 'field_number',
      name: 'I1',
      value: 0
    }
  ],
  args1: [],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_OTHER_HUE}',
  tooltip: '',
  helpUrl: ''
})

addBlock('logic_compare', {
  type: 'logic_compare',
  message0: '%1 %2 %3',
  args0: [
    {
      type: 'input_value',
      name: 'A'
    },
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['=', 'EQ'],
        ['\u2260', 'NEQ'],
        ['\u200F<', 'LT'],
        ['\u200F\u2264', 'LTE'],
        ['\u200F>', 'GT'],
        ['\u200F\u2265', 'GTE']
      ]
    },
    {
      type: 'field_number',
      name: 'B'
    }
  ],
  inputsInline: true,
  output: 'Boolean',
  style: 'logic_blocks',
  helpUrl: '%{BKY_LOGIC_COMPARE_HELPURL}',
  extensions: ['logic_compare', 'logic_op_tooltip']
})

addBlock('if_else', {
  type: 'controls_ifelse',
  message0: '%{BKY_CONTROLS_IF_MSG_IF} %1',
  args0: [
    {
      type: 'input_value',
      name: 'IF0',
      check: 'Boolean'
    }
  ],
  message1: '%{BKY_CONTROLS_IF_MSG_THEN} %1',
  args1: [
    {
      type: 'input_statement',
      name: 'DO0'
    }
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'logic_blocks',
  tooltip: '%{BKYCONTROLS_IF_TOOLTIP_2}',
  helpUrl: '%{BKY_CONTROLS_IF_HELPURL}',
  suppressPrefixSuffix: true,
  extensions: ['controls_if_tooltip']
})

addBlock('custom_function_ref', {
  //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#byprkm
  type: 'custom_function_ref',
  message0: 'Custom Function Ref %1',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'Name'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_OTHER_HUE}',
  tooltip: '',
  helpUrl: ''
})

addBlock('loop_block', {
  //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4fx65f
  type: 'loop_block',
  message0: 'FOR %1 = %2, %3 %4 %5, %7%6',
  args0: [
    {
      type: 'field_input',
      name: 'var1',
      text: 'var'
    },
    {
      type: 'field_number',
      name: 'I1',
      value: 0
    },
    {
      type: 'field_input',
      name: 'var2',
      text: 'var'
    },
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['=', 'EQ'],
        ['\u2260', 'NEQ'],
        ['\u200F<', 'LT'],
        ['\u200F\u2264', 'LTE'],
        ['\u200F>', 'GT'],
        ['\u200F\u2265', 'GTE']
      ]
    },
    {
      type: 'field_number',
      name: 'I2',
      value: 0
    },
    {
      type: 'field_dropdown',
      name: 'OP1',
      options: [
        ['--', 'EQ'],
        ['++', 'NEQ'],
      ]
    },
    {
      type: 'field_input',
      name: 'var3',
      text: 'var'
    },
  ],
  message1: 'DO %1',
  args1: [
    {
      type: 'input_statement',
      name: 'DO0'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_OTHER_HUE}',
  tooltip: '',
  helpUrl: ''
})

addBlock('custom_function_def', {
  //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rwdh63x
  type: 'custom_function_def',
  message0: 'Function %1 %2 %3',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'Name'
    },
    {
      type: 'input_dummy'
    },
    {
      type: 'input_statement',
      name: 'Blocks'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_OTHER_HUE}',
  tooltip: '',
  helpUrl: ''
})