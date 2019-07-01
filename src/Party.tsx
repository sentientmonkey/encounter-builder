import React, { SFC, ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 100,
        },
        menu: {
            width: 100,
        },
        selectEmpty: {
            marginTop: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 100,
        },
    }),
);


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
    const classes = useStyles();

    return <form className={classes.container}>
        <FormControl className={classes.formControl}>
        <TextField
            variant="outlined"
            label="Party Size"
            type="number"
            value={size}
            onChange={changeSize}
            className={classes.textField}
        />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel html-for="level">Avg Level</InputLabel>
            <Select
                onChange={changeLevel}
                value={level}
                input={<OutlinedInput labelWidth={75} name="level" id="level" />}>
                {levelItems}
            </Select>
        </FormControl>
    </form>
}

export default Party;
