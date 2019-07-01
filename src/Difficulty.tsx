import React, {SFC} from 'react';

import Optional from './Optional';

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

function ratingToString(rating: Optional<Rating>): Optional<string> {
    return rating.map((r) => Rating[r]);
}

interface INumberToArrayOfNumbersMap {
    [key: number]: number[];
}

const Difficulty: SFC<DifficultyProps> = (props) => {
    const {xp, level, size} = props;

    const TABLE : INumberToArrayOfNumbersMap = {
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

    const getAdjustedDifficulty = (): number[] => {
        return TABLE[level].map((value) => value * size);
    }

    const getDifficulty = (adjustedRow: number[]): Optional<Rating> => {
        if (xp < adjustedRow[Rating.Easy]) {
            return Optional.empty();
        } else if (xp < adjustedRow[Rating.Medium]) {
            return Optional.of(Rating.Easy);
        } else if (xp < adjustedRow[Rating.Hard]) {
            return Optional.of(Rating.Medium);
        } else if (xp < adjustedRow[Rating.Deadly]) {
            return Optional.of(Rating.Hard);
        }

        return Optional.of(Rating.Deadly);
    }

    const adjustedRow = getAdjustedDifficulty();
    const ratings = adjustedRow
        .map((value, i) => ratingToString(Optional.of<Rating>(i))
            .map((str) => `${str}: ${value} `)
            .get());

    const difficulty: string = getDifficulty(adjustedRow)
        .flatMap((r) => ratingToString(r))
        .orElse("None");

    return <div>
          <p>Difficulty: {difficulty}</p>
          <p>{ratings}</p>
      </div>;
}

export default Difficulty;
