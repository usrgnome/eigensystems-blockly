import * as Blockly from 'blockly';

export const qasmGenerator : any = new Blockly.Generator('QASM');

qasmGenerator.PRECEDENCE = 0;

  qasmGenerator['test_input'] = function(block : Blockly.Block) {
    const code = block.getFieldValue('DROP');
    console.log(code);
    return 'test';
  };
  
