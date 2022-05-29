export enum Topic {
    everyMinute = '* * * * *',
    everyTwoMinute = '*/2 * * * *',
    everyThreeMinute = '*/3 * * * *',
    everyFiveMinute = '*/5 * * * *',
    everyTenMinute = '*/10 * * * *',

    everyTenSeconds = '*/10 * * * * *',
    everyThirtySeconds = '*/30 * * * * *',

    everyDay15PM = '0 15 * * *',
    everyDay0AM = '0 0 * * *',
    everyEndDay = '59 23 * * *',
    everyStartDay = '0 0 * * *',
    everyOneHour = '0 */1 * * *',
}

export enum DisconnectTime {
    OneTime = 1,
    TwoTime = 2,
    ThreeTime = 3,
}
