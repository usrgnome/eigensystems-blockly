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

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#thggpb
addBlock('var_def_gate', {
    "type": "var_gate",
    "message0": "Variable Definition %1 %2 %3",
    "args0": [
        {
            "type": "field_input",
            "name": "NAME",
            "text": "Name"
        },
        {
            "type": "field_input",
            "name": "INPUT",
            "text": "Value"
        },
        {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                [
                    "integer",
                    "INTEGER"
                ],
                [
                    "int_list",
                    "INT_LIST"
                ],
                [
                    "angle",
                    "ANGLE"
                ],
                [
                    "angle_list",
                    "ANGLE_LIST"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
});

addBlock('var_ref_gate', {
    "type": "var_ref_gate",
    "message0": "Ref %1",
    "args0": [
        {
            "type": "field_input",
            "name": "NAME",
            "text": "Name"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#f7i8nr
addBlock('assignment_block', {
    "type": "assignment_block",
    "message0": "%1 %2 %3 = %4 %5",
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
            "name": "lhs"
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "rhs"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
});

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53fu5j
addBlock('expression_block', {
    "type": "expression_block",
    "message0": "%1 %2 %3 %4 %5 %6",
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
            "name": "lhs"
        },
        {
            "type": "field_dropdown",
            "name": "OPERATOR",
            "options": [
                [
                    "+",
                    "ADDITION"
                ],
                [
                    "-",
                    "SUBTRACTION"
                ]
            ]
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "rhs"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
});