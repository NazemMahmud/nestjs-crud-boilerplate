import { ConfigModule, ConfigService } from '@nestjs/config';

const mongooseConfig = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const protocol =   configService.get<string>('database.protocol');
        const host =  configService.get<string>('database.host');
        const port =  configService.get<string>('database.port');
        const user =  configService.get<string>('database.user');
        const password =  configService.get<string>('database.password');
        const authMechanism =  configService.get<string>('database.authMechanism');
        const dbConnection = `${protocol}://${user}:${password}@${host}:${port}?authMechanism=${authMechanism}`;

        return {
            uri: dbConnection,
            dbName: configService.get<string>('database.dbName'),
        };
    },
};

export default mongooseConfig;