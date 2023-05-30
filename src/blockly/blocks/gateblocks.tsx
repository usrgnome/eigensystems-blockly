import Blockly from 'blockly';
import { Difficulty } from '@/utils/utils';

export const easyTitles: string[] = [];
export const hardTitles: string[] = [];

Blockly.Msg.GATE_HUE = '#4a148c';

const addBlock = (difficulty: Difficulty | null, name: string, json: object) => {
  switch (difficulty) {
    case (Difficulty.EASY):
      easyTitles.push(name);
      hardTitles.push(name);
      break;
    case (Difficulty.HARD):
      hardTitles.push(name);
      break;
    default:
      easyTitles.push(name);
      hardTitles.push(name);
  }
  Blockly.Blocks[name] = {
    init: function () {
      this.jsonInit(json)
    }
  };
}

addBlock(null, 'test_input', {
  type: 'block_type',
  message0: '%1',
  args0: [
    {
      type: 'field_number',
      name: 'DROP',
      value: 0
    }
  ],
  output: 'Number',
  colour: 0,
  tooltip: '',
  helpUrl: ''
})

addBlock(Difficulty.EASY, 'register', {
    'type': 'register',
    'message0': '%1',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'register',
        'options': [
          ['q', 'q'],
          ['c', 'c'],
        ],
      },
    ],
    'output': 'String',
    'style': 'logic_blocks',
    'tooltip': 'access a registers',
    'helpUrl': '%{BKY_LOGIC_BOOLEAN_HELPURL}',
  },
)

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#v8faew
addBlock(Difficulty.EASY, 'test_x_gate', {
  type: 'x_gate',
  message0: 'X-Gate: Qubit %1 %2',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_value',
      name: 'Qubit'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
})

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jqk6wx
addBlock(Difficulty.EASY, 'test_y_gate', {
  type: 'y_gate',
  message0: 'Y-Gate: Qubit %1 %2',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_value',
      name: 'Qubit'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
})

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#midzok
addBlock(Difficulty.EASY, 'test_z_gate', {
  type: 'z_gate',
  message0: 'Z-Gate: Qubit %1 %2',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_value',
      name: 'Qubit'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
})

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gzgqty
addBlock(Difficulty.EASY, 'test_hadamard_gate', {
  type: 'hadamard_gate',
  message0: 'Hadamard-Gate: Qubit %1 %2',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_value',
      name: 'Qubit'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
})

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#eynyor
addBlock(Difficulty.HARD, 'u3_gate', {
  type: 'u3_gate',
  message0: 'U3-Gate: %1 Param 1 %2 Param 2 %3 Param 3 %4 Qubit %5',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_value',
      name: 'Param 1'
    },
    {
      type: 'input_value',
      name: 'Param 2'
    },
    {
      type: 'input_value',
      name: 'Param 3'
    },
    {
      type: 'input_value',
      name: 'Qubit'
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
})

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hhbmk6
addBlock(Difficulty.HARD, 'u2_gate', {
  type: "u2_gate",
  message0: "U2-Gate: %1 Param 1 %2 Param 2 %3 Qubit %4",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Param 2"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: '',
  helpUrl: ''
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dknmvh
addBlock(Difficulty.HARD, 'u1_gate', {
  type: "u1_gate",
  message0: "U1-Gate: %1 Param 1 %2 Qubit %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yanx7b
addBlock(Difficulty.EASY, 'cx_gate', {
  type: "cx_gate",
  message0: "CX-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3jptz8
addBlock(Difficulty.HARD, 'id_gate', {
  type: "id_gate",
  message0: "ID-Gate: %1 Qubit %2",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3jptz8
addBlock(Difficulty.EASY, 's_gate', {
  type: "s_gate",
  message0: "S-Gate: %1 Qubit %2",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'sdg_gate', {
  type: "sdg_gate",
  message0: "SDG-Gate: %1 Qubit %2",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.EASY, 't_gate', {
  type: "t_gate",
  message0: "T-Gate: %1 Qubit %2",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'tdg_gate', {
  type: "tdg_gate",
  message0: "TDG-Gate: %1 Qubit %2",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gmv2qz
addBlock(Difficulty.HARD, 'rx_gate', {
  type: "rx_gate",
  message0: "RX-Gate: %1 Param 1 %2 Qubit %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pabgmm
addBlock(Difficulty.HARD, 'ry_gate', {
  type: "ry_gate",
  message0: "RY-Gate: %1 Param 1 %2 Qubit %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5dptcp
addBlock(Difficulty.HARD, 'rz_gate', {
  type: "rz_gate",
  message0: "RZ-Gate: %1 Param 1 %2 Qubit %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'cz_gate', {
  type: "cz_gate",
  message0: "CZ-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'cy_gate', {
  type: "cy_gate",
  message0: "CY-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'ch_gate', {
  type: "ch_gate",
  message0: "Controlled-H-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#h328w5
addBlock(Difficulty.HARD, 'crz_gate', {
  type: "crz_gate",
  message0: "RZ-Gate: %1 Param 1 %2 Qubit-1 %3 Qubit-2 %4",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rxppai
addBlock(Difficulty.HARD, 'cu1_gate', {
  type: "cu1_gate",
  message0: "CU1-Gate: %1 Param 1 %2 Qubit-1 %3 Qubit-2 %4",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#sknoba
addBlock(Difficulty.HARD, 'cu3_gate', {
  type: "cu3_gate",
  message0: "CU3-Gate: %1 Param 1 %2 Param 2 %3 Param 3 %4 Qubit-1 %5 Qubit-2 %6",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Param 1"
    },
    {
      type: "input_value",
      name: "Param 2"
    },
    {
      type: "input_value",
      name: "Param 3"
    },
    {
      type: "input_value",
      name: "Qubit-1"
    },
    {
      type: "input_value",
      name: "Qubit-2"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});

addBlock(Difficulty.HARD, 'ccx_gate', {
  type: "ccx_gate",
  message0: "CCX-Gate: %1 Qubit_1 %2 Qubit_2 %3 Qubit-3 %4",
  args0: [
    {
      type: "input_dummy"
    },
    {
      type: "input_value",
      name: "Qubit_1"
    },
    {
      type: "input_value",
      name: "Qubit_2"
    },
    {
      type: "input_value",
      name: "Qubit_3"
    }
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_GATE_HUE}',
  tooltip: "",
  helpUrl: ""
});