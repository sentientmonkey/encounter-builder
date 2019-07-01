import React, { SFC, ChangeEvent } from 'react';

import { FormControl, InputLabel, Grid, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core';

import SelectElement from './SelectElement';
import {} from './ArrayExt';

interface Props {
    level: number;
    size: number;
    onChangeLevel: (level: number) => void;
    onChangeSize: (size: number) => void;
}

const LEVELS = Array(20)
    .fill("")
    .map((_,i) => i+1)
    .map((x) => x.toString());

const Party: SFC<Props> = (props) => {
    const {size, level, onChangeSize, onChangeLevel} = props;

    const changeSize = (event: ChangeEvent<HTMLInputElement>): void => [event.target.value as string]
            .map(parseInt)
            .map(onChangeSize)
            .first();

    const changeLevel = (event: ChangeEvent<SelectElement>): void => [event.target.value as string]
            .map(parseInt)
            .map(onChangeLevel)
            .first();

    const levelItems = LEVELS.map((level,i) =>
                                <MenuItem
                                    key={i}
                                value={level}>
                                {level}
                                </MenuItem>
                            );
    const labelWidth = 200;

    return <Grid container
                     direction="column">
            <Grid item>
            <TextField
                variant="outlined"
                className="party-size"
                label="Party Size"
                type="number"
                value={size}
                onChange={changeSize}
            />
            </Grid>
            <Grid item>
            <FormControl variant="outlined">
                <InputLabel html-for="level">Avg Level</InputLabel>
                <Select
                    className="level-select"
                    onChange={changeLevel}
                    value={level}
                    input={<OutlinedInput labelWidth={labelWidth} name="level" id="level" />}>
                       {levelItems}
                </Select>
            </FormControl>
            </Grid>
        </Grid>
}

export default Party;
