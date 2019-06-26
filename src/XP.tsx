import React, {StatelessComponent} from 'react';

interface Props {
   xp: number,
}

const XP: StatelessComponent<Props> = (props: Props) => (
    <span>{props.xp.toLocaleString()}</span>
)

export default XP;
