import React, { Component, ChangeEvent } from 'react';

import { FormControl, InputLabel, Grid, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core';

import SelectElement from './SelectElement';

interface PartyState {}

interface PartyProps {
    level: number;
    size: number;
    onChangeLevel: (level: number) => void;
    onChangeSize: (size: number) => void;
}

class Party extends Component<PartyProps, PartyState> {
    LEVELS = Array(20).fill("").map((_,i) => (i+1).toString());

    changeSize = (event: ChangeEvent<HTMLInputElement>): void => {
        const size = parseInt(event.target.value as string);
        this.props.onChangeSize(size);
    }

    changeLevel = (event: ChangeEvent<SelectElement>): void => {
        const level = parseInt(event.target.value as string);
        this.props.onChangeLevel(level);
    }

    render() {
        const { level, size } = this.props;

        const levelItems = this.LEVELS
                               .map((level,i) =>
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
                onChange={this.changeSize}
            />
            </Grid>
            <Grid item>
            <FormControl variant="outlined">
                <InputLabel html-for="level">Avg Level</InputLabel>
                <Select
                    className="level-select"
                    onChange={this.changeLevel}
                    value={level}
                    input={<OutlinedInput labelWidth={labelWidth} name="level" id="level" />}>
                       {levelItems}
                </Select>
            </FormControl>
            </Grid>
        </Grid>
    }
}

export default Party;
