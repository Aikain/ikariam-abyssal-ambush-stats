import { describe, it } from 'vitest';

import { parseReward } from './utils';

describe.concurrent('parseReward', () => {
    it('Vastaanotat 2Höyryviinipuristin (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward('Vastaanotat 2Höyryviinipuristin (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'STEAM_WINE_PRESS',
            size: 10,
        });
    });

    it('Vastaanotat 2Höyrysiipiratas (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(
            parseReward('Vastaanotat 2Höyrysiipiratas (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'STEAM_SULPHUR_PADDLE_WHEEL',
            size: 10,
        });
    });

    it('Vastaanotat 2Höyrysaha (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(
            parseReward('Vastaanotat 2Höyrysaha (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'STEAM_SAW',
            size: 10,
        });
    });

    it('Vastaanotat 2Höyrykristallipora (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward('Vastaanotat 2Höyrykristallipora (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'STEAM_CRYSTAL_DRILL',
            size: 10,
        });
    });

    it('Vastaanotat 2Höyryvasara (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(
            parseReward('Vastaanotat 2Höyryvasara (10 Päivää) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'STEAM_HAMMER',
            size: 10,
        });
    });

    it('Vastaanotat 10Triton moottorit palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(parseReward('Vastaanotat 10Triton moottorit palkinnoksi osallistumisestasi tapahtumaan.')).toStrictEqual(
            {
                count: 10,
                resource: 'TRITON_ENGINES',
                size: 1,
            },
        );
    });

    it('Vastaanotat 3Resurssilähetys: Kulta (Minimaalinen) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward(
                'Vastaanotat 3Resurssilähetys: Kulta (Minimaalinen) palkinnoksi osallistumisestasi tapahtumaan.',
            ),
        ).toStrictEqual({
            count: 3,
            resource: 'GOLD',
            size: 1_000,
        });
    });

    it('Vastaanotat 1Resurssilähetys: Kulta (Massiivinen) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward(
                'Vastaanotat 1Resurssilähetys: Kulta (Massiivinen) palkinnoksi osallistumisestasi tapahtumaan.',
            ),
        ).toStrictEqual({
            count: 1,
            resource: 'GOLD',
            size: 250_000,
        });
    });

    it('Vastaanotat 1Kulta (500k) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(parseReward('Vastaanotat 1Kulta (500k) palkinnoksi osallistumisestasi tapahtumaan.')).toStrictEqual({
            count: 1,
            resource: 'GOLD',
            size: 500_000,
        });
    });

    it('Vastaanotat 6Rikki (1M) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(parseReward('Vastaanotat 6Rikki (1M) palkinnoksi osallistumisestasi tapahtumaan.')).toStrictEqual({
            count: 6,
            resource: 'SULPHUR',
            size: 1_000_000,
        });
    });

    it('Vastaanotat 1Kristallilasi (500k) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(
            parseReward('Vastaanotat 1Kristallilasi (500k) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 1,
            resource: 'CRYSTAL_GLASS',
            size: 500_000,
        });
    });

    it('Vastaanotat 1Resurssilähetys: Marmori (Pieni) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward('Vastaanotat 1Resurssilähetys: Marmori (Pieni) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 1,
            resource: 'MARBLE',
            size: 10_000,
        });
    });

    it('Vastaanotat 2Resurssilähetys: Marmori (Normaali) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward('Vastaanotat 2Resurssilähetys: Marmori (Normaali) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 2,
            resource: 'MARBLE',
            size: 25_000,
        });
    });

    it('Vastaanotat 1Resurssilähetys: Marmori (Suuri) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward('Vastaanotat 1Resurssilähetys: Marmori (Suuri) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 1,
            resource: 'MARBLE',
            size: 100_000,
        });
    });

    it('Vastaanotat 7Resurssilähetys: Viini (Minimaalinen) palkinnoksi osallistumisestasi tapahtumaan.', async ({
        expect,
    }) => {
        expect(
            parseReward(
                'Vastaanotat 7Resurssilähetys: Viini (Minimaalinen) palkinnoksi osallistumisestasi tapahtumaan.',
            ),
        ).toStrictEqual({
            count: 7,
            resource: 'WINE',
            size: 1_000,
        });
    });

    it('Vastaanotat 3Rakennusmateriaali (1M) palkinnoksi osallistumisestasi tapahtumaan.', async ({ expect }) => {
        expect(
            parseReward('Vastaanotat 3Rakennusmateriaali (1M) palkinnoksi osallistumisestasi tapahtumaan.'),
        ).toStrictEqual({
            count: 3,
            resource: 'BUILDING_MATERIAL',
            size: 1_000_000,
        });
    });
});
