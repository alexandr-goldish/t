import {Component} from '@angular/core';
import {BlockModel} from './models/block.model';
import {Type} from './enums/type.enums';
import {SubmitDataService} from './services/submit-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public readonly maxBlueBlock: number = 4;
    public readonly minBlueBlock: number = 1;
    public readonly enumBlue: number = 1;
    public countBlocks: number = 6;
    public areaBlocks: BlockModel[] = [];
    public countBlueBlocks: number = Math.floor(Math.random() * (this.maxBlueBlock - this.minBlueBlock) + this.minBlueBlock);
    public selectedBlock: number[] = [];
    public error: boolean = false;

    constructor(private submitDataService: SubmitDataService) {
        this.createArea();
    }

    public addBlock(index: number): void {
        if (this.selectedBlock.includes(index)) {
            this.selectedBlock.splice(this.selectedBlock.indexOf(index), 1)
        }
        else {
            this.selectedBlock.push(index)
        }
    }

    public sendBlocks(): void {
        let blueBlock: BlockModel[] = this.areaBlocks.filter((block: BlockModel) => block.type === this.enumBlue);

        if (this.selectedBlock.length > blueBlock.length) {
            this.error = true;
            return;
        }

        blueBlock.forEach((block: BlockModel) => {
            if (!this.selectedBlock.includes(block.index)) {
                this.error = true;
                return;
            }
        })

        this.error = false;

        this.submitDataService.sendBlockToApi(this.selectedBlock).subscribe((res) => {
            console.log(res);
            this.selectedBlock = [];
            this.createArea();
        })
    }

    private createArea(): void {
        let blueIndexs: number[] = this.generateIndexBlueBlocks(this.countBlueBlocks);

        for (let i = 0; i < this.countBlocks; i++) {
            if (blueIndexs.includes(i)) {
                this.areaBlocks.push({
                    index: i,
                    type: Type.blue
                })
            }
            else {
                this.areaBlocks.push({
                    index: i,
                    type: Type.other
                })
            }
        }
    }

    private generateIndexBlueBlocks(count: number): number[] {
        let indexList: number[] = [];

        for (let i = 0; i < count; i++) {
            indexList.push(Math.floor(Math.random() * (this.countBlocks)));
        }

        return indexList;
    }
}

