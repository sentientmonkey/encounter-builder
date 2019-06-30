import React  from 'react';
import { Button, Grid, List, ListItem } from '@material-ui/core';
import Monster from './Monster';
import Party from './Party';
import Difficulty from './Difficulty';
import XP from './XP';
import uuid from 'uuid/v1';

interface MonsterState {
    id: string;
    xp: number;
    count: number;
}

export interface EncounterState {
    monsters: MonsterState[];
    totalXP: number;
    adjustedXP: number;
    partyLevel: number;
    partySize: number;
}

export interface EncounterProps {}

interface INumberToNumberMap {
    [key: number]: number;
}

class Encounter extends React.Component<EncounterProps,EncounterState> {
    state: EncounterState = {
        monsters: [],
        totalXP: 0,
        adjustedXP: 0,
        partyLevel: 1,
        partySize: 3,
    }

    MULTIPLIER: INumberToNumberMap = {
        0:  0,
        1:  1,
        2: 	1.5,
        3: 	2,
        4: 	2,
        5: 	2,
        6: 	2,
        7: 	2.5,
        8: 	2.5,
        9: 	2.5,
        10:	2.5,
        11:	3,
        12:	3,
        13:	3,
        14:	3,
        15:	4,
    }

    addMonster = () => {
        this.setState((state) => {
            let monsters = state.monsters;
            monsters.push({id: uuid(), xp: 0, count: 1});
            return {monsters: monsters};
        });
    };

    removeMonster = (id: string) => {
        this.setState((state) => {
            let monsters = state.monsters;
            monsters = monsters.filter((m) => m.id !== id);
            const totalXP = this.calculateXP(monsters);
            const adjustedXP = this.adjustXP(monsters, totalXP);
            return {monsters: monsters,
                    totalXP: totalXP,
                    adjustedXP: adjustedXP};

        });
    };

    updateMonster = (id: string, xp: number, count: number) => {
       this.setState((state) => {
            let monsters = state.monsters;
            const monster = monsters.find((m) => m.id === id)
            if (monster) {
               monster.xp = xp;
               monster.count = count;
            }
            const totalXP = this.calculateXP(monsters);
            const adjustedXP = this.adjustXP(monsters, totalXP);
            return {monsters: monsters,
                    totalXP: totalXP,
                    adjustedXP: adjustedXP};
        });
    }

    onChangeSize = (size: number) =>{
        this.setState({partySize: size});
    }

    onChangeLevel = (level: number) => {
        this.setState({partyLevel: level});
    }

    calculateXP = (monsters: MonsterState[]): number =>
        monsters.map((m) => m.xp)
                .reduce((acc, curr) => acc + curr, 0);

    fetchMultiplier = (index: number): number =>
        this.MULTIPLIER[index] || this.MULTIPLIER[15];

    totalMonsters = (monsters: MonsterState[]): number =>
        monsters.map((m) => m.count)
                .reduce((acc, curr) => acc + curr, 0);

    adjustXP = (monsters: MonsterState[], xp: number): number =>
        this.fetchMultiplier(this.totalMonsters(monsters)) * xp;

    render() {
        const monsterElements = this.state.monsters.map((m) =>
            <ListItem key={m.id} divider>
                <Monster key={m.id} id={m.id}
                         updateMonster={this.updateMonster}
                         removeMonster={this.removeMonster} />
             </ListItem>);

        return <div>
            <Grid container>
              <Grid item xs={4}>
                  <h1>Encounter Builder</h1>
                  <p>Total XP <XP xp={this.state.totalXP}/></p>
                  <p>Adjusted XP <XP xp={this.state.adjustedXP}/></p>

        <Party size={this.state.partySize}
               level={this.state.partyLevel}
               onChangeLevel={this.onChangeLevel}
               onChangeSize={this.onChangeSize} />

                  <Button variant="contained" color="primary"
                          className="add-monster"
                          onClick={this.addMonster.bind(this)}>Add Monster</Button>

              </Grid>
              <Grid item xs={8}>
                <List>
                    {monsterElements}
                </List>
              </Grid>
              <Grid item xs={4}>
                  <Difficulty xp={this.state.adjustedXP}
                              level={this.state.partyLevel}
                              size={this.state.partySize} />
              </Grid>
          </Grid>
        </div>
    }
}

export default Encounter;
