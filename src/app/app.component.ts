import { OnInit,Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    outputStrings:Array<string> = ['ポ','プ','テ','ピピック'];
    targetString:string = 'ポプテピピック';       
    displayString:string='';
    popTeamEpicObservable:Observable<string> = new Observable();
    
    ngOnInit():void{
        // 一定期間ごとに文字列をstreamするObservableを設定
        this.popTeamEpicObservable = Observable
            .interval(100) // 一定時間(ms)ごとに流す
            .map(
                ()=>this.getPopTeamEpic(this.outputStrings)
            ) //outputStringのいずれか一つを流す
            .takeWhile(
                (str)=> !this.isPopTeamEpic(this.displayString,this.targetString)
            ); //表示文字列の末尾が'ポプテピピック'になるまで
    }
    
    start():void{
        // ポ,プ,テ,ピピックが流れ始める
        this.popTeamEpicObservable
            .subscribe(
                (str)=> this.displayString+= str, //表示文字列にポ,プ,テ,ピピックを追加
                (err)=> console.log(err),
                ()=> console.log('complete')
            );
    }

    // strArray(ポ,プ,テ,ピピック)のいずれかの文字列を返す関数
    private getPopTeamEpic(strArray:Array<string>):string{
        return strArray[
            Math.floor(Math.random()*(strArray.length))
        ];
    }

    // 表示文字列の末尾がポ,プ,テ,ピピックかどうか判定する関数
    private isPopTeamEpic(str:string,targetString:string):boolean{
        return str.endsWith(targetString);
    }

    // ボタンを一度しか押せないように制御
    private canStart(str:string):boolean{
        return str === '';
    }
    
}
