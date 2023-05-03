import Blockly from 'blockly';

export const titles : string[] = [];

const addBlock = (name: string, json: object) => {
  titles.push(name)
  Blockly.Blocks[name] = {
      init: function () {
          this.jsonInit(json)
      }
  };
}

addBlock('test_input' ,  {
  "type": "block_type",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DROP",
      "options": [
        [
          "0",
          "0"
        ],
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ],
        [
          "8",
          "8"
        ],
        [
          "9",
          "9"
        ]
      ]
    }
  ],
  "output": "Number",
  "colour": 60,
  "tooltip": "",
  "helpUrl": ""
});

// program entry block
addBlock('entry' , {
  "type": "entry",
  "message0": "Program entry",
  "args0": [
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#v8faew
addBlock('test_x_gate' , {
  "type": "x_gate",
  "message0": "X-Gate: Qubit %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jqk6wx
addBlock('test_y_gate' ,  {
  "type": "y_gate",
  "message0": "Y-Gate: Qubit %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#midzok
addBlock('test_z_gate' ,  {
  "type": "z_gate",
  "message0": "Z-Gate: Qubit %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gzgqty
addBlock('test_hadamard_gate' ,  {
  "type": "hadamard_gate",
  "message0": "Hadamard-Gate: Qubit %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#eynyor
addBlock('u3_gate' ,  {
  "type": "u3_gate",
  "message0": "U3-Gate: %1 Param 1 %2 Param 2 %3 Param 3 %4 Qubit %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Param 2"
    },
    {
      "type": "input_value",
      "name": "Param 3"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hhbmk6
addBlock('u2_gate' ,  {
  "type": "u2_gate",
  "message0": "U2-Gate: %1 Param 1 %2 Param 2 %3 Qubit %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Param 2"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dknmvh
addBlock('u1_gate' , {
  "type": "u1_gate",
  "message0": "U1-Gate: %1 Param 1 %2 Qubit %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yanx7b
addBlock('cx_gate' , {
  "type": "cx_gate",
  "message0": "CX-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3jptz8
addBlock('id_gate' ,  {
  "type": "id_gate",
  "message0": "ID-Gate: %1 Qubit %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3jptz8
addBlock('s_gate' ,  {
  "type": "s_gate",
  "message0": "S-Gate: %1 Qubit %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('sdg_gate' ,  {
  "type": "sdg_gate",
  "message0": "SDG-Gate: %1 Qubit %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('t_gate' , {
  "type": "t_gate",
  "message0": "T-Gate: %1 Qubit %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('tdg_gate' , {
  "type": "tdg_gate",
  "message0": "TDG-Gate: %1 Qubit %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gmv2qz
addBlock('rx_gate' , {
  "type": "rx_gate",
  "message0": "RX-Gate: %1 Param 1 %2 Qubit %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pabgmm
addBlock('ry_gate' , {
  "type": "ry_gate",
  "message0": "RY-Gate: %1 Param 1 %2 Qubit %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5dptcp
addBlock('rz_gate' , {
  "type": "rz_gate",
  "message0": "RZ-Gate: %1 Param 1 %2 Qubit %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('cz_gate' , {
  "type": "cz_gate",
  "message0": "CZ-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('cy_gate' , {
  "type": "cy_gate",
  "message0": "CY-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('ch_gate' ,  {
  "type": "ch_gate",
  "message0": "Controlled-H-Gate: %1 Qubit-1 %2 Qubit-2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#h328w5
addBlock('crz_gate' ,  {
  "type": "crz_gate",
  "message0": "RZ-Gate: %1 Param 1 %2 Qubit-1 %3 Qubit-2 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rxppai
addBlock('cu1_gate' ,  {
  "type": "cu1_gate",
  "message0": "CU1-Gate: %1 Param 1 %2 Qubit-1 %3 Qubit-2 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#sknoba
addBlock('cu3_gate' , {
  "type": "cu3_gate",
  "message0": "CU3-Gate: %1 Param 1 %2 Param 2 %3 Param 3 %4 Qubit-1 %5 Qubit-2 %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Param 1"
    },
    {
      "type": "input_value",
      "name": "Param 2"
    },
    {
      "type": "input_value",
      "name": "Param 3"
    },
    {
      "type": "input_value",
      "name": "Qubit-1"
    },
    {
      "type": "input_value",
      "name": "Qubit-2"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});

addBlock('ccx_gate' ,  {
  "type": "ccx_gate",
  "message0": "CCX-Gate: %1 Qubit_1 %2 Qubit_2 %3 Qubit-3 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Qubit_1"
    },
    {
      "type": "input_value",
      "name": "Qubit_2"
    },
    {
      "type": "input_value",
      "name": "Qubit_3"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
});