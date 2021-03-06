import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import XP from './XP';

export interface MonsterProps {
    id: string;
    count: number;
    xp: number;
    onChangeMonster: (id: string, xp: number, count: number) => void;
    onRemoveMonster: (id: string) => void;
}

export interface MonsterState {
    cr: string;
}

interface SelectElement {
    name?: string;
    value: unknown;
}

interface INameToNumberMap
{
    [key: string]: number;
}

class Monster extends React.Component<MonsterProps,MonsterState> {
    CR_VALUES = ["0", "1/8", "1/4", "1/2"].concat(
        Array(30).fill("").map((_,i) => i.toString()));

    XP_FOR_CR: INameToNumberMap = {
     "0":	10,
     "1/8":	25,
     "1/4": 50,
     "1/2": 100,
     "1": 200,
     "2": 450,
     "3": 700,
     "4": 1100,
     "5": 1800,
     "6": 2300,
     "7": 2900,
     "8": 3900,
     "9": 5000,
     "10": 5900,
     "11": 7200,
     "12": 8400,
     "13": 10000,
     "14": 11500,
     "15": 13000,
     "16": 15000,
     "17": 18000,
     "18": 20000,
     "19": 22000,
     "20": 25000,
     "21": 33000,
     "22": 41000,
     "23": 50000,
     "24": 62000,
     "25": 75000,
     "26": 90000,
     "27": 105000,
     "28": 120000,
     "29": 135000,
     "30": 155000
    }

    state = {
        cr: "0",
    }

    onChangeCR = (event: React.ChangeEvent<SelectElement>): void => {
        const cr = event.target.value as string;
        const xp = this.calculateXP(cr, this.props.count);
        this.props.onChangeMonster(this.props.id, xp, this.props.count);
        this.setState({cr});
    }

    onChangeCount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let count = parseInt(event.target.value);
        count = (isNaN(count) || count < 1) ? 0 : count;
        const xp = this.calculateXP(this.state.cr, count);
        this.props.onChangeMonster(this.props.id, xp, count);
    }

    calculateXP = (cr: string, count: number): number => {
        const xp: number = this.XP_FOR_CR[cr];
        return xp * count;
    };

    onDelete = (event: any): void => {
        this.props.onRemoveMonster(this.props.id);
    }

    render() {
        const { id, count, xp } = this.props;
        const crItems = this.CR_VALUES
                            .map((cr, i) =>
                                <MenuItem
                                    key={i}
                                    value={cr}>
                                    {cr}
                                </MenuItem>
                            );
        return <ListItem key={id} divider>
            <FormControl>
                <InputLabel html-for="cr">CR</InputLabel>
                <Select
                  className="cr-select"
                  onChange={this.onChangeCR}
                  value={this.state.cr}
                  inputProps={{
                      name: 'cr',
                      id: 'cr',
                   }}>
                  {crItems}
                </Select>
            </FormControl>
            <TextField
                className="count"
                label="Count"
                type="number"
                value={count}
                onChange={this.onChangeCount}
             />
        <ListItemText>
            <XP xp={xp} /> XP
        </ListItemText>
        <ListItemSecondaryAction>
          <DeleteIcon className="delete-monster"
                      onClick={this.onDelete} />
        </ListItemSecondaryAction>
      </ListItem>
    }
}

export default Monster;
