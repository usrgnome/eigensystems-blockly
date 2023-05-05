import Blockly from 'blockly';

const addBlock = (name: string, json: object) => {
    Blockly.Blocks[name] = {
        init: function () {
            this.jsonInit(json)
            this.setDeletable(false)
            this.setPreviousStatement(false);
        }
    };
  }

// program entry block
addBlock('entry' , {
    "type": "entry",
    "message0": "Program entry",
    "args0": [
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  });