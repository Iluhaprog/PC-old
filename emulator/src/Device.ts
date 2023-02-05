import { WorkMode } from "./constants";
import { WorkModeError, WorkStatusError } from "./errors";

export class Device<M = WorkMode> implements IDevice<M> {
    protected enabled: boolean = false;
    private mode?: M;

    public setWorkStatus(status: boolean): void {
        this.enabled = status;
    }

    public enable(): void {
        this.setWorkStatus(true);
    }

    public disable(): void {
        this.setWorkStatus(false);
    }

    public getWorkStatus(): boolean {
        return this.enabled;
    }

    public setMode(mode: M): void {
        this.mode = mode;
    }

    public getMode(): M | undefined {
        return this.mode;
    }

    protected actionGuard(workMode: M) {
        if (!this.enabled) throw new WorkStatusError()

        const currentMode = this.getMode();
        if (currentMode !== workMode) throw new WorkModeError(currentMode, workMode);
    }
}