import React, {Component} from 'react';

interface DifficultyState {}

interface DifficultyProps {
    xp: number;
    level: number;
    size: number;
}

enum Rating {
    Easy,
    Medium,
    Hard,
    Deadly,
}

function ratingToString(rating: Rating | null) {
    if (rating == null) {
        return "";
    }
    return Rating[rating];
}

interface INumberToArrayOfNumbersMap {
    [key: number]: number[];
}

class Difficulty extends Component<DifficultyProps, DifficultyState> {
    static TABLE : INumberToArrayOfNumbersMap = {
      1: [25,	50,	75,	100],
      2: [50,	100,	150,	200],
      3: [75,	150,	225,	400],
      4: [125,	250,	375,	500],
      5: [250,	500,	750,	1100],
      6: [300,	600,	900,	1400],
      7: [350,	750,	1100,	1700],
      8: [450,	900,	1400,	2100],
      9: [550,	1100,	1600,	2400],
      10: [600,	1200,	1900,	2800],
      11: [800,	1600,	2400,	3600],
      12: [1000,	2000,	3000,	4500],
      13: [1100,	2200,	3400,	5100],
      14: [1250,	2500,	3800,	5700],
      15: [1400,	2800,	4300,	6400],
      16: [1600,	3200,	4800,	7200],
      17: [2000,	3900,	5900,	8800],
      18: [2100,	4200,	6300,	9500],
      19: [2400,	4900,	7300,	10900],
      20: [2800,	5700,	8500,	12700],
    }

    getAdjustedDifficulty = (level: number, size: number): number[] => {
        return Difficulty.TABLE[level]
                         .map((value) => value * size);
    }

    getDifficulty = (adjustedRow: number[]): Rating | null => {
        if (this.props.xp <= adjustedRow[Rating.Easy]) {
            return null;
        } else if (this.props.xp <= adjustedRow[Rating.Medium]) {
            return Rating.Easy;
        } else if (this.props.xp <= adjustedRow[Rating.Hard]) {
            return Rating.Medium;
        } else if (this.props.xp <= adjustedRow[Rating.Deadly]) {
            return Rating.Hard;
        }

        return Rating.Deadly;
    }

    render() {
      const adjustedRow = this.getAdjustedDifficulty(this.props.size, this.props.level);
      const ratings = adjustedRow.map((value, i) => ratingToString(i) + ": " + value + " ");
      const difficulty: string = ratingToString(this.getDifficulty(adjustedRow));
      return <div>
            <p>Difficulty: {difficulty}</p>
            <p>{ratings}</p>
        </div>;
    }
}

export default Difficulty;
