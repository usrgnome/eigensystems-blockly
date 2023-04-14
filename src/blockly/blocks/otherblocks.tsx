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


addBlock('measurement_gate_true' , {
    "type": "measurement_gate_true",
    "message0": "Measurement Block -  True %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      },
      {
        "type": "field_input",
        "name": "QUBIT",
        "text": "Qubit"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });
  
  addBlock('measurement_gate' ,{ //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#fihfcc
    "type": "measurement_gate",
    "message0": "Measurement Block -  %1 %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "True",
            "True"
          ],
          [
            "False",
            "False"
          ]
        ]
      },
      {
        "type": "field_input",
        "name": "QUBIT",
        "text": "Qubit"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });

  addBlock('if_block' , { //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9xq2zw
    "type": "if_block",
    "message0": "If Block %1 %2 Values %3 Gate %4",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "GATE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });

  addBlock('custom_function_ref' , { //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#byprkm
    "type": "custom_function_ref",
    "message0": "Custom Function Ref %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });

  addBlock('loop_block' , { //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4fx65f
    "type": "loop_block",
    "message0": "Loops %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NUM"
      },
      {
        "type": "input_statement",
        "name": "Blocks"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });
  
  addBlock('custom_function_def' , { //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rwdh63x
    "type": "custom_function_def",
    "message0": "Function %1 %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Name"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "Blocks"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });

  addBlock('n_bit_toffoli_to_qasm' ,{ //https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#decbyb
    "type": "n_bit_toffoli_to_qasm",
    "message0": "N Bit Toffoli To Qasm - %1 Controls %2 AntiControls %3 Target %4",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "CONTROL_QUIBIT"
      },
      {
        "type": "input_value",
        "name": "ANTICONTROL_QUBIT"
      },
      {
        "type": "input_value",
        "name": "TARGET_QUBIT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  });