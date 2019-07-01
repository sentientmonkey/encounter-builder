import React, {SFC} from 'react';

interface Props {
   xp: number,
}

const XP: SFC<Props> = (props) => (
    <span>{props.xp.toLocaleString()}</span>
)

export default XP;
