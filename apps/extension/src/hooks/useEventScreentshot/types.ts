import { AbyssalAmbushEvent, Report, Reward } from '@ikariam-abyssal-ambush-stats/types';

export interface Content {
    event: AbyssalAmbushEvent;
    playerName: string;
    reports: Report[];
    rewards: Reward[];
    server: string;
}
