import React from 'react';
import BlocklyComponent from './BlocklyComponent';
import { PropsWithChildren } from 'react'

type BlockProps = {
    type: string
}

export const Block = (p: PropsWithChildren<BlockProps>) => {
    const { children, ...rest } = p;
    const props = { is: 'blockly', ...rest };
    return React.createElement("block", props, children);
};


type CategoryProps = {
    name: string
}

export const Category = (p: PropsWithChildren<CategoryProps>) => {
    const { children, ...rest } = p;
    const props = { is: 'blockly', ...rest };
    return React.createElement("category", props, children);
};

export default BlocklyComponent;