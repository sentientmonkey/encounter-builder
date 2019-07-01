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
        partyLevel: 1,
        partySize: 3,
    }

    MULTIPLIER: INumberToNumberMap = {
        0:  1,
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

    SMALL_MULTIPLIER: INumberToNumberMap = {
        0:  1.5,
        1:  1.5,
        2: 	2,
        3: 	2.5,
        4: 	2.5,
        5: 	2.5,
        6: 	2.5,
        7: 	3,
        8: 	3,
        9: 	3,
        10:	3,
        11:	4,
        12:	4,
        13:	4,
        14:	4,
        15:	4,
    }

    LARGE_MULTIPLIER: INumberToNumberMap = {
        0:  0.5,
        1:  0.5,
        2: 	1,
        3: 	1.5,
        4: 	1.5,
        5: 	1.5,
        6: 	1.5,
        7: 	2,
        8: 	2,
        9: 	2,
        10:	2,
        11:	2.5,
        12:	2.5,
        13:	2.5,
        14:	2.5,
        15:	3,
    }

    addMonster = () =>
      this.setState((state) => {
          let monsters = state.monsters;
          monsters.push({id: uuid(), xp: 0, count: 1});
          return {monsters: monsters};
      });

    removeMonster = (id: string) =>
      this.setState((state) => {
          let {monsters} = state;
          monsters = monsters.filter((m) => m.id !== id);
          return {monsters: monsters};
      });

    updateMonster = (id: string, xp: number, count: number) =>
      this.setState((state) => {
          let {monsters} = state;
          const monster = monsters.find((m) => m.id === id)
          if (monster) {
              monster.xp = xp;
              monster.count = count;
          }
          return {monsters: monsters};
      });

    onChangeSize = (size: number) =>
        this.setState({partySize: size});

    onChangeLevel = (level: number) =>
        this.setState({partyLevel: level});

    calculateXP = (monsters: MonsterState[]): number =>
        monsters.map((m) => m.xp)
                .reduce((acc, curr) => acc + curr, 0);

    smallParty = (size: number) => (size < 3);
    largeParty = (size: number) => (size > 5);

    fetchMultiplier = (index: number, size: number): number => {
        let table = this.MULTIPLIER;
        if (this.smallParty(size)) {
            table = this.SMALL_MULTIPLIER;
        }
        if (this.largeParty(size)) {
            table = this.LARGE_MULTIPLIER;
        }
        return table[index] || table[15];
    }

    totalMonsters = (monsters: MonsterState[]): number =>
        monsters.map((m) => m.count)
                .reduce((acc, curr) => acc + curr, 0);

    adjustXP = (multiplier: number, xp: number): number =>
        multiplier * xp;

    render() {
        const { monsters, partySize, partyLevel } = this.state;
        const totalXP = this.calculateXP(monsters);
        const multiplier = this.fetchMultiplier(this.totalMonsters(monsters), partySize);
        const adjustedXP = this.adjustXP(multiplier, totalXP);

        const monsterElements = monsters.map((m) =>
            <ListItem key={m.id} divider>
                <Monster key={m.id} id={m.id}
                         xp={m.xp}
                         count={m.count}
                         onChangeMonster={this.updateMonster}
                         onRemoveMonster={this.removeMonster} />
             </ListItem>);

        return <div>
            <Grid container>
              <Grid item xs={4}>
                  <h1>Encounter Builder</h1>
                  <p>Total XP <XP key={"total"} xp={totalXP}/></p>
                  <p>Adjusted XP <XP key={"adjusted"} xp={adjustedXP}/>
                     (x {multiplier})
                  </p>

                  <Party size={partySize}
                         level={partyLevel}
                         onChangeLevel={this.onChangeLevel}
                         onChangeSize={this.onChangeSize} />

                  <Button variant="contained" color="primary"
                          className="add-monster"
                          onClick={this.addMonster.bind(this)}>Add Monster</Button>

                  <Difficulty xp={adjustedXP}
                              level={partyLevel}
                              size={partySize} />
              </Grid>
              <Grid item xs={8}>
                <List>
                    {monsterElements}
                </List>
              </Grid>
          </Grid>
        </div>
    }
}

export default Encounter;
