import { VystaClient, VystaWorkflowService } from '@datavysta/vysta-client';

export class WorkflowService extends VystaWorkflowService {
    constructor(client: VystaClient) {
        super(client);
    }
}