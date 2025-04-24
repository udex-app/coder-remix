import { VystaClient, VystaService, VystaReadonlyService } from '@datavysta/vysta-client';
import type { User } from './types';

export class UserService extends VystaService<User> {
    constructor(client: VystaClient) {
        super(client, 'lexindev', 'Users', {
            primaryKey: 'id'  as keyof User
        });
    }
}