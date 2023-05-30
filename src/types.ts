import { Record as PocketBaseRecord } from "pocketbase-react";

type ReferenceTo<T> = string;

export type GameState = PocketBaseRecord & {
    currentGameNo: number,
};

export type Game = PocketBaseRecord & {
    no: number,
    finished: boolean,
    goals1: number,
    goals2: number,
    team1: ReferenceTo<Team>,
    team2: ReferenceTo<Team>,
    timeStart: Date,
    timeEnd: Date,
    goals: ReferenceTo<Goal>[],
}

export type Team = PocketBaseRecord & {
    no: number,
    name: string,
    points: number,
    members: ReferenceTo<Player>[],
};

export type Goal = PocketBaseRecord & {
    game: ReferenceTo<Game>,
    player: ReferenceTo<Player>,
    team: ReferenceTo<Team>,
    minute: number,
    side: 1 | 2,
};

export type Player = PocketBaseRecord & {
    name: string,
    goals: ReferenceTo<Goal>[],
    team: ReferenceTo<Team>,
};
